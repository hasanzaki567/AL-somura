import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import { 
  dispatchAllOrderEmails, 
  sendOrderNotificationEmail, 
  sendCustomerConfirmationEmail 
} from '../utils/orderNotification.js';

const router = express.Router();

// @route POST /api/orders
// @desc Create new order
router.post('/', protect, async (req, res) => {
  try {
    const { items, customerInfo, shippingAddress, discount, paymentMethod, paymentStatus } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    let subtotal = 0;
    const orderItems = [];

    // Verify stock and calculate prices from DB
    for (const item of items) {
      let product;
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(item.productId);
      if (isValidObjectId) {
        product = await Product.findById(item.productId);
      }
      if (!product) {
        product = await Product.findOne({
          $or: [
            { slug: item.productId },
            { name: item.name || item.productId }
          ]
        });
      }

      // Auto-create product record if missing so customer checkout is never blocked
      if (!product && (item.name || item.productNameSnapshot) && (item.price || item.priceSnapshot)) {
        try {
          const autoName = item.name || item.productNameSnapshot;
          const autoPrice = Number(item.price || item.priceSnapshot) || 0;
          const autoSlug = (item.productId || autoName).toLowerCase().replace(/[^a-z0-9]+/g, '-');
          product = await Product.create({
            name: autoName,
            slug: autoSlug,
            description: item.description || 'Al-Sumora luxury leather handcrafted product.',
            price: autoPrice,
            category: item.category || 'Accessories',
            images: item.image ? [item.image] : [],
            stock: 100
          });
        } catch (prodCreateErr) {
          console.warn('[Orders Route] Auto product creation fallback:', prodCreateErr.message);
        }
      }

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      
      if (product.stock < item.quantity) {
        // If stock is low, still permit if stock is 0 but it's customizable/made-to-order
        if (product.stock > 0) {
          return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        }
      } else {
        // Decrement stock
        product.stock -= item.quantity;
        await product.save();
      }

      const itemPrice = product.price || Number(item.price) || 0;
      const itemTotal = itemPrice * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        productNameSnapshot: product.name,
        priceSnapshot: itemPrice,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        monogram: item.monogram,
        imageSnapshot: (item.selectedColor && item.selectedColor.image) || item.image || (product.images && product.images[0]) || '',
        size: item.size || 'Standard'
      });
    }

    const appliedDiscount = Number(discount) || 0;
    const shipping = subtotal > 500 ? 0 : 50; // Complimentary above 500
    const total = Math.max(0, subtotal - appliedDiscount) + shipping;

    const order = new Order({
      userId: req.user._id,
      customerInfo: {
        name: customerInfo?.name || req.user.name || 'Valued Customer',
        email: customerInfo?.email || req.user.email || '',
        phone: customerInfo?.phone || req.user.phone || ''
      },
      shippingAddress: {
        address: shippingAddress?.address || '',
        city: shippingAddress?.city || '',
        state: shippingAddress?.state || '',
        pincode: shippingAddress?.pincode || '',
        country: shippingAddress?.country || 'India'
      },
      items: orderItems,
      subtotal,
      discount: appliedDiscount,
      shipping,
      total,
      paymentStatus: paymentStatus || 'paid',
      paymentMethod: paymentMethod || 'Online / Card',
      orderStatus: 'Confirmed'
    });

    const createdOrder = await order.save();

    // Trigger automated Store Owner Alert and Customer Order Confirmation emails via Resend
    // Executed gracefully without failing the customer checkout response if Resend fails
    dispatchAllOrderEmails(createdOrder).catch(err => {
      console.error('[Orders Route] Asynchronous order emails dispatch error:', err.message);
    });

    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/orders/myorders
// @desc Get logged in user orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/orders/:id
// @desc Get order by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user is admin or the order belongs to the user
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- ADMIN ROUTES ---

// @route GET /api/orders
// @desc Get all orders
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route PUT /api/orders/:id/status
// @desc Update order status
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      if (orderStatus) order.orderStatus = orderStatus;
      if (paymentStatus) order.paymentStatus = paymentStatus;

      const updatedOrder = await order.save();

      // If marked paid/confirmed and notifications were not yet sent, trigger them
      if (updatedOrder.paymentStatus === 'paid' && (!updatedOrder.notificationSent || !updatedOrder.customerNotificationSent)) {
        dispatchAllOrderEmails(updatedOrder).catch(err => {
          console.error('[Order Status Update] Email dispatch failed:', err.message);
        });
      }

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route POST /api/orders/:id/notify
// @desc Manually trigger or resend order notification emails (Admin only)
router.post('/:id/notify', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Force send by temporarily resetting sent flags
    order.notificationSent = false;
    order.customerNotificationSent = false;
    const result = await dispatchAllOrderEmails(order);

    res.json({ message: 'Order notification emails dispatched', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

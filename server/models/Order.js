import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productNameSnapshot: { type: String, required: true },
  priceSnapshot: { type: Number, required: true },
  quantity: { type: Number, required: true },
  selectedColor: {
    name: String,
    hex: String,
    image: String
  },
  monogram: {
    initials: String,
    finish: String,
    placement: String
  },
  imageSnapshot: { type: String },
  size: { type: String, default: 'Standard' }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shipping: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'paid' },
  paymentMethod: { type: String, default: 'Online / Card' },
  orderStatus: { type: String, enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Confirmed' },
  notificationSent: { type: Boolean, default: false }, // Store owner notification
  notificationSentAt: { type: Date },
  notificationError: { type: String },
  customerNotificationSent: { type: Boolean, default: false }, // Customer confirmation
  customerNotificationSentAt: { type: Date },
  customerNotificationError: { type: String }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);

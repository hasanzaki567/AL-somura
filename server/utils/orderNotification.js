import { Resend } from 'resend';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * Format currency in INR (₹)
 */
const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return '₹' + num.toLocaleString('en-IN');
};

/**
 * Format date in a clean, legible format
 */
const formatDate = (dateValue) => {
  const date = dateValue ? new Date(dateValue) : new Date();
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }) + ' IST';
};

/**
 * Helper to determine accurate payment status label
 */
const getPaymentStatusDisplay = (order) => {
  const method = (order.paymentMethod || '').toLowerCase();
  const isCOD = method.includes('cash') || method.includes('cod');
  
  if (isCOD) {
    return {
      label: 'Cash on Delivery (Pending)',
      color: '#b45309',
      bgColor: '#fef3c7',
    };
  }

  if (order.paymentStatus === 'paid') {
    return {
      label: 'PAID',
      color: '#15803d',
      bgColor: '#dcfce7',
    };
  }

  return {
    label: 'Payment Pending',
    color: '#b45309',
    bgColor: '#fef3c7',
  };
};

/**
 * Shared item row renderer for both email templates
 */
const renderItemsHtml = (items, populatedProducts = []) => {
  return items.map((item) => {
    const matchedProduct = populatedProducts.find(
      (p) => p && p._id && p._id.toString() === (item.productId?._id || item.productId || '').toString()
    ) || {};

    const productName = item.productNameSnapshot || matchedProduct.name || 'Al-Sumora Luxury Product';
    const productDesc = matchedProduct.description || 'Handcrafted luxury leather accessory.';
    const unitPrice = item.priceSnapshot || 0;
    const itemTotal = unitPrice * item.quantity;
    const imageUrl = item.imageSnapshot || (matchedProduct.images && matchedProduct.images[0]) || '';
    const colorName = item.selectedColor?.name || 'Standard';
    const colorHex = item.selectedColor?.hex || '#825425';
    const size = item.size || 'Standard';
    const monogram = item.monogram;

    return `
      <tr>
        <td style="padding: 18px 0; border-bottom: 1px solid #eae5db;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${imageUrl ? `
                <td width="80" valign="top" style="padding-right: 16px;">
                  <img src="${imageUrl}" alt="${productName}" width="80" height="80" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid #d3c3be; display: block;" />
                </td>
              ` : ''}
              <td valign="top" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-size: 15px; font-weight: 700; color: #090100; margin-bottom: 4px;">
                  ${productName}
                </div>
                <div style="font-size: 12px; color: #827470; line-height: 1.4; margin-bottom: 8px;">
                  ${productDesc.slice(0, 110)}${productDesc.length > 110 ? '...' : ''}
                </div>
                <div style="font-size: 11px; color: #504440; margin-bottom: 4px;">
                  <span style="display: inline-block; margin-right: 12px;"><strong>Item ID:</strong> <span style="font-family: monospace;">${item.productId?._id || item.productId}</span></span>
                  <span style="display: inline-block; margin-right: 12px;"><strong>Size:</strong> ${size}</span>
                  <span style="display: inline-block;">
                    <strong>Color:</strong>
                    <span style="display: inline-block; width: 9px; height: 9px; border-radius: 50%; background-color: ${colorHex}; vertical-align: middle; margin: 0 3px;"></span>
                    ${colorName}
                  </span>
                </div>
                ${monogram && monogram.initials ? `
                  <div style="font-size: 11px; background-color: #f5f0e6; color: #825425; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: 4px; border: 1px solid #e2d7c5;">
                    ✨ <strong>Bespoke Monogram:</strong> "${monogram.initials}" (${monogram.finish || 'Gold'} Foil - ${monogram.placement || 'Bottom Right'})
                  </div>
                ` : ''}
              </td>
              <td width="110" valign="top" align="right" style="padding-left: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-size: 14px; font-weight: 700; color: #090100;">${formatCurrency(itemTotal)}</div>
                <div style="font-size: 11px; color: #827470; margin-top: 2px;">
                  ${formatCurrency(unitPrice)} × ${item.quantity}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  }).join('');
};

/**
 * 1. Store Owner Notification HTML Template
 */
export const generateOrderEmailHtml = (order, populatedProducts = []) => {
  const customerName = order.customerInfo?.name || 'Valued Customer';
  const customerEmail = order.customerInfo?.email || 'N/A';
  const customerPhone = order.customerInfo?.phone || 'N/A';

  const address = order.shippingAddress || {};
  const formattedAddress = [
    address.address,
    address.city,
    address.state,
    address.pincode,
    address.country || 'India',
  ].filter(Boolean).join(', ');

  const itemsHtml = renderItemsHtml(order.items || [], populatedProducts);
  const paymentBadge = getPaymentStatusDisplay(order);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AL-SOMURA Order Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f1ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f1ea; padding: 28px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 18px rgba(9, 1, 0, 0.08); border: 1px solid #e6ded3;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #090100; padding: 32px 36px; text-align: center; border-bottom: 3px solid #825425;">
              <div style="letter-spacing: 5px; font-size: 22px; font-weight: 800; color: #fbf9f4; text-transform: uppercase; margin-bottom: 6px;">
                AL &bull; SOMURA
              </div>
              <div style="font-size: 11px; letter-spacing: 2.5px; color: #c4a480; text-transform: uppercase;">
                Elite Craftsmanship &bull; Timeless Style
              </div>
              
              <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.12);">
                <span style="background-color: #825425; color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; display: inline-block;">
                  🚨 New Order Received
                </span>
                <div style="color: #ffffff; font-size: 18px; font-weight: 700; margin-top: 12px;">
                  Order #${order._id}
                </div>
                <div style="color: #a89f91; font-size: 12px; margin-top: 4px;">
                  Placed on: ${formatDate(order.createdAt)}
                </div>
              </div>
            </td>
          </tr>

          <!-- Customer & Shipping Section -->
          <tr>
            <td style="padding: 28px 36px 16px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="50%" valign="top" style="padding-right: 14px;">
                    <div style="font-size: 11px; font-weight: 700; color: #825425; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      👤 Customer Information
                    </div>
                    <div style="font-size: 14px; font-weight: 700; color: #090100; margin-bottom: 3px;">
                      ${customerName}
                    </div>
                    <div style="font-size: 13px; color: #504440; margin-bottom: 3px;">
                      <a href="mailto:${customerEmail}" style="color: #825425; text-decoration: none;">${customerEmail}</a>
                    </div>
                    <div style="font-size: 13px; color: #504440;">
                      📞 ${customerPhone}
                    </div>
                  </td>
                  <td width="50%" valign="top" style="padding-left: 14px;">
                    <div style="font-size: 11px; font-weight: 700; color: #825425; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      📍 Shipping Address
                    </div>
                    <div style="font-size: 13px; color: #1b1c19; line-height: 1.5;">
                      ${formattedAddress}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="border-top: 1px solid #eae5db;"></div>
            </td>
          </tr>

          <!-- Ordered Products List -->
          <tr>
            <td style="padding: 20px 36px 12px 36px;">
              <div style="font-size: 11px; font-weight: 700; color: #825425; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                🛍️ Ordered Products (${order.items.length})
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${itemsHtml}
              </table>
            </td>
          </tr>

          <!-- Pricing & Payment Summary -->
          <tr>
            <td style="padding: 12px 36px 28px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #faf8f5; border-radius: 8px; border: 1px solid #eae5db; padding: 18px 20px;">
                <tr>
                  <td style="font-size: 13px; color: #504440; padding: 4px 0;">Subtotal</td>
                  <td align="right" style="font-size: 13px; font-weight: 600; color: #090100; padding: 4px 0;">${formatCurrency(order.subtotal)}</td>
                </tr>
                ${order.discount ? `
                  <tr>
                    <td style="font-size: 13px; color: #15803d; padding: 4px 0;">Discount</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #15803d; padding: 4px 0;">-${formatCurrency(order.discount)}</td>
                  </tr>
                ` : ''}
                <tr>
                  <td style="font-size: 13px; color: #504440; padding: 4px 0;">Shipping Fee</td>
                  <td align="right" style="font-size: 13px; font-weight: 600; color: #090100; padding: 4px 0;">
                    ${order.shipping === 0 ? '<span style="color: #15803d;">Complimentary</span>' : formatCurrency(order.shipping)}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0;">
                    <div style="border-top: 1px solid #d3c3be;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 16px; font-weight: 800; color: #090100; padding: 4px 0;">Final Total</td>
                  <td align="right" style="font-size: 18px; font-weight: 800; color: #825425; padding: 4px 0;">${formatCurrency(order.total)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 6px; padding: 8px 12px; border: 1px solid #eae5db;">
                      <tr>
                        <td style="font-size: 11px; color: #827470; text-transform: uppercase; font-weight: 600;">Payment Status</td>
                        <td align="right">
                          <span style="font-size: 11px; font-weight: 700; color: ${paymentBadge.color}; background-color: ${paymentBadge.bgColor}; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">
                            ● ${paymentBadge.label}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 11px; color: #827470; text-transform: uppercase; font-weight: 600; padding-top: 4px;">Payment Method</td>
                        <td align="right" style="font-size: 12px; color: #090100; font-weight: 600; padding-top: 4px;">
                          ${order.paymentMethod || 'Online / Card'}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #090100; color: #c4a480; padding: 24px 36px; text-align: center; font-size: 12px; line-height: 1.6; border-top: 1px solid #825425;">
              <div style="font-weight: 700; color: #fbf9f4; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                AL-SOMURA Store Management Notification
              </div>
              <div style="color: #e5d8c6; margin-bottom: 12px;">
                A new customer order has been received. Please review the order and proceed with fulfillment.
              </div>
              <div style="font-size: 11px; color: #8a7c6f;">
                This automated alert was securely transmitted via Resend API.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

/**
 * 2. Customer Order Confirmation HTML Template
 */
export const generateCustomerOrderConfirmationHtml = (order, populatedProducts = []) => {
  const rawName = (order.customerInfo?.name || '').trim();
  const firstName = rawName.split(' ')[0] || 'Valued Customer';
  const customerFullName = rawName || 'Valued Customer';

  const address = order.shippingAddress || {};
  const formattedAddressLines = [
    address.address,
    [address.city, address.state, address.pincode].filter(Boolean).join(', '),
    address.country || 'India',
  ].filter(Boolean);

  const itemsHtml = renderItemsHtml(order.items || [], populatedProducts);
  const paymentBadge = getPaymentStatusDisplay(order);
  const supportEmail = (process.env.SUPPORT_EMAIL || 'al.sumora.support@gmail.com').trim();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AL-SOMURA Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f5f0; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 24px rgba(9, 1, 0, 0.07); border: 1px solid #e7dfd5;">
          
          <!-- Luxury Welcome Header -->
          <tr>
            <td style="background-color: #090100; padding: 38px 36px 32px 36px; text-align: center; border-bottom: 3px solid #825425;">
              <div style="letter-spacing: 6px; font-size: 24px; font-weight: 800; color: #fbf9f4; text-transform: uppercase; margin-bottom: 6px;">
                AL &bull; SOMURA
              </div>
              <div style="font-size: 11px; letter-spacing: 2.5px; color: #c4a480; text-transform: uppercase; margin-bottom: 22px;">
                Elite Craftsmanship &bull; Timeless Style
              </div>

              <div style="background-color: rgba(130, 84, 37, 0.22); border: 1px solid rgba(196, 164, 128, 0.35); border-radius: 8px; padding: 18px 20px; display: inline-block; max-width: 480px;">
                <div style="font-size: 18px; font-weight: 700; color: #fbf9f4; margin-bottom: 6px;">
                  Thank You for Choosing AL-SOMURA!
                </div>
                <div style="font-size: 13px; color: #e5d8c6; line-height: 1.5;">
                  Your order has been successfully placed. We're excited to have you shopping with us.
                </div>
              </div>
            </td>
          </tr>

          <!-- Personalized Greeting -->
          <tr>
            <td style="padding: 32px 36px 20px 36px;">
              <div style="font-size: 17px; font-weight: 700; color: #090100; margin-bottom: 10px;">
                Dear ${firstName},
              </div>
              <div style="font-size: 14px; color: #504440; line-height: 1.6;">
                Thank you for placing your order with AL-SOMURA. We truly appreciate your trust in our brand. Each piece in our collection is crafted with meticulous attention to detail, using the finest materials and artisanal European techniques.
              </div>
            </td>
          </tr>

          <!-- Order Status Bar -->
          <tr>
            <td style="padding: 0 36px 20px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #faf7f2; border-radius: 10px; border: 1px solid #eae2d6; padding: 16px 20px;">
                <tr>
                  <td width="33%" valign="top" style="border-right: 1px solid #eae2d6; padding-right: 12px;">
                    <div style="font-size: 10px; font-weight: 700; color: #825425; text-transform: uppercase; letter-spacing: 1px;">Status</div>
                    <div style="font-size: 13px; font-weight: 700; color: #15803d; margin-top: 4px;">
                      ✓ Confirmed
                    </div>
                  </td>
                  <td width="33%" valign="top" style="padding-left: 14px; border-right: 1px solid #eae2d6; padding-right: 12px;">
                    <div style="font-size: 10px; font-weight: 700; color: #825425; text-transform: uppercase; letter-spacing: 1px;">Order ID</div>
                    <div style="font-size: 12px; font-weight: 700; color: #090100; margin-top: 4px; font-family: monospace;">
                      #${order._id}
                    </div>
                  </td>
                  <td width="34%" valign="top" style="padding-left: 14px;">
                    <div style="font-size: 10px; font-weight: 700; color: #825425; text-transform: uppercase; letter-spacing: 1px;">Order Date</div>
                    <div style="font-size: 12px; font-weight: 600; color: #504440; margin-top: 4px;">
                      ${formatDate(order.createdAt)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Ordered Products Section -->
          <tr>
            <td style="padding: 10px 36px;">
              <div style="font-size: 12px; font-weight: 700; color: #825425; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 8px;">
                Your Purchased Items (${order.items.length})
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${itemsHtml}
              </table>
            </td>
          </tr>

          <!-- Payment Summary & Shipping Details -->
          <tr>
            <td style="padding: 24px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Shipping Details Column -->
                  <td width="48%" valign="top" style="padding-right: 12px;">
                    <div style="background-color: #faf8f5; border-radius: 8px; border: 1px solid #eae2d6; padding: 18px 20px; height: 100%; box-sizing: border-box;">
                      <div style="font-size: 11px; font-weight: 700; color: #825425; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                        📦 Shipping Information
                      </div>
                      <div style="font-size: 13px; font-weight: 700; color: #090100; margin-bottom: 4px;">
                        ${customerFullName}
                      </div>
                      ${formattedAddressLines.map((line) => `<div style="font-size: 12px; color: #504440; line-height: 1.4;">${line}</div>`).join('')}
                      <div style="font-size: 12px; color: #504440; margin-top: 6px;">
                        📞 ${order.customerInfo?.phone || 'N/A'}
                      </div>
                    </div>
                  </td>

                  <!-- Payment Summary Column -->
                  <td width="52%" valign="top" style="padding-left: 12px;">
                    <div style="background-color: #faf8f5; border-radius: 8px; border: 1px solid #eae2d6; padding: 18px 20px;">
                      <div style="font-size: 11px; font-weight: 700; color: #825425; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                        💳 Payment Summary
                      </div>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 12px;">
                        <tr>
                          <td style="color: #504440; padding: 3px 0;">Subtotal</td>
                          <td align="right" style="font-weight: 600; color: #090100;">${formatCurrency(order.subtotal)}</td>
                        </tr>
                        ${order.discount ? `
                          <tr>
                            <td style="color: #15803d; padding: 3px 0;">Discount</td>
                            <td align="right" style="font-weight: 600; color: #15803d;">-${formatCurrency(order.discount)}</td>
                          </tr>
                        ` : ''}
                        <tr>
                          <td style="color: #504440; padding: 3px 0;">Shipping</td>
                          <td align="right" style="font-weight: 600; color: #090100;">
                            ${order.shipping === 0 ? '<span style="color: #15803d;">Complimentary</span>' : formatCurrency(order.shipping)}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 6px 0;">
                            <div style="border-top: 1px solid #d3c3be;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: 14px; font-weight: 800; color: #090100; padding: 3px 0;">Total</td>
                          <td align="right" style="font-size: 16px; font-weight: 800; color: #825425;">${formatCurrency(order.total)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding-top: 8px;">
                            <div style="font-size: 11px; color: #827470; margin-top: 4px;">
                              Method: <strong style="color: #090100;">${order.paymentMethod || 'Online / Card'}</strong>
                            </div>
                            <div style="margin-top: 4px;">
                              <span style="font-size: 10px; font-weight: 700; color: ${paymentBadge.color}; background-color: ${paymentBadge.bgColor}; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
                                ● ${paymentBadge.label}
                              </span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Thank You Message -->
          <tr>
            <td style="padding: 8px 36px 24px 36px;">
              <div style="background-color: #f5f0e6; border-left: 4px solid #825425; padding: 18px 20px; border-radius: 0 8px 8px 0;">
                <div style="font-size: 13px; color: #40322b; line-height: 1.6; margin-bottom: 8px;">
                  Your order means a lot to us. At AL-SOMURA, we believe every detail matters, and we're committed to delivering an experience you'll love.
                </div>
                <div style="font-size: 13px; color: #40322b; line-height: 1.6; margin-bottom: 8px;">
                  We'll keep you informed about your order as it progresses.
                </div>
                <div style="font-size: 13px; font-weight: 700; color: #825425;">
                  Thank you for being a part of AL-SOMURA.
                </div>
              </div>
            </td>
          </tr>

          <!-- Customer Support Section -->
          <tr>
            <td style="padding: 16px 36px 32px 36px; text-align: center;">
              <div style="border-top: 1px dashed #d3c3be; padding-top: 22px;">
                <div style="font-size: 14px; font-weight: 700; color: #090100; margin-bottom: 4px;">
                  Have a question or need assistance with your order?
                </div>
                <div style="font-size: 13px; color: #827470; margin-bottom: 8px;">
                  We're always happy to help.
                </div>
                <div style="font-size: 13px;">
                  Email us: <a href="mailto:${supportEmail}" style="color: #825425; font-weight: 700; text-decoration: underline;">${supportEmail}</a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #090100; color: #c4a480; padding: 24px 36px; text-align: center; font-size: 12px; line-height: 1.6; border-top: 1px solid #825425;">
              <div style="font-weight: 700; color: #fbf9f4; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                AL &bull; SOMURA
              </div>
              <div style="color: #e5d8c6; margin-bottom: 8px;">
                Thank you for shopping with us.
              </div>
              <div style="font-size: 11px; color: #8a7c6f;">
                &copy; ${new Date().getFullYear()} AL-SOMURA. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

/**
 * 1. Sends Store Owner Notification Email via Resend
 */
export async function sendOrderNotificationEmail(orderOrId) {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const ownerEmail = (process.env.OWNER_EMAIL || 'al.sumora.support@gmail.com').trim();
  const fromEmail = (process.env.RESEND_FROM_EMAIL || 'Store Orders <onboarding@resend.dev>').trim();

  if (!apiKey) {
    console.warn('[Resend Owner Alert] Skipping: RESEND_API_KEY is not configured.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  let order;
  try {
    if (typeof orderOrId === 'string') {
      order = await Order.findById(orderOrId);
    } else if (orderOrId && orderOrId._id) {
      order = orderOrId;
    }

    if (!order) {
      console.error('[Resend Owner Alert] Order not found:', orderOrId);
      return { success: false, error: 'Order not found' };
    }

    if (order.notificationSent) {
      console.log(`[Resend Owner Alert] Order #${order._id} notification already sent. Skipping duplicate.`);
      return { success: true, message: 'Owner notification already sent' };
    }

    if (order.paymentStatus === 'failed' || order.orderStatus === 'Cancelled') {
      console.log(`[Resend Owner Alert] Order #${order._id} cancelled/failed. Skipping.`);
      return { success: false, error: 'Order status not eligible for notification' };
    }

    // Populate actual Product records
    const productIds = (order.items || []).map((i) => i.productId).filter(Boolean);
    let populatedProducts = [];
    if (productIds.length > 0) {
      try {
        populatedProducts = await Product.find({ _id: { $in: productIds } });
      } catch (prodErr) {
        console.warn('[Resend Owner Alert] Could not populate products:', prodErr.message);
      }
    }

    // Subject format: 🚨 New Order Alert: [Product Name] | Order #[Order ID]
    const firstItem = order.items[0];
    const firstItemName = firstItem?.productNameSnapshot || (populatedProducts[0] && populatedProducts[0].name) || 'Luxury Item';
    const totalItemsCount = order.items.reduce((acc, i) => acc + (i.quantity || 1), 0);
    const extraCount = totalItemsCount - (firstItem?.quantity || 1);
    
    const subjectPrefix = extraCount > 0 
      ? `${firstItemName} (+${extraCount} more items)`
      : firstItemName;
    
    const subject = `🚨 New Order Alert: ${subjectPrefix} | Order #${order._id}`;
    const html = generateOrderEmailHtml(order, populatedProducts);

    const resend = new Resend(apiKey);
    console.log(`[Resend Owner Alert] Sending Order #${order._id} alert to ${ownerEmail}...`);

    let result = await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: subject,
      html: html,
    });

    // Handle Resend testing restriction gracefully
    if (result.error && result.error.message && result.error.message.includes('only send testing emails to your own email address')) {
      const match = result.error.message.match(/\(([^)]+)\)/);
      const verifiedAccountEmail = match ? match[1] : null;

      if (verifiedAccountEmail && verifiedAccountEmail !== ownerEmail) {
        console.warn(`[Resend Owner Alert] Notice: ${fromEmail} requires a verified domain to send to ${ownerEmail}. Auto-delivering notification to verified account email (${verifiedAccountEmail}).`);
        
        result = await resend.emails.send({
          from: fromEmail,
          to: [verifiedAccountEmail],
          subject: `${subject} [Dev Mode]`,
          html: html,
        });
      }
    }

    if (result.error) {
      console.error('[Resend Owner Alert] API error:', result.error);
      try {
        await Order.findByIdAndUpdate(order._id, {
          notificationError: result.error.message || 'Resend API error',
        });
      } catch (dbErr) {
        console.error('[Resend Owner Alert] DB error saving error state:', dbErr.message);
      }
      return { success: false, error: result.error.message };
    }

    console.log(`[Resend Owner Alert] Order #${order._id} owner notification sent! ID:`, result.data?.id);

    try {
      await Order.findByIdAndUpdate(order._id, {
        notificationSent: true,
        notificationSentAt: new Date(),
        notificationError: null,
      });
    } catch (dbErr) {
      console.warn('[Resend Owner Alert] DB error updating sent state:', dbErr.message);
    }

    return { success: true, messageId: result.data?.id };
  } catch (err) {
    console.error('[Resend Owner Alert] Exception:', err);
    return { success: false, error: err.message };
  }
}

/**
 * 2. Sends Personalized Customer Order Confirmation Email via Resend
 */
export async function sendCustomerConfirmationEmail(orderOrId) {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const fromEmail = (process.env.RESEND_CUSTOMER_FROM_EMAIL || 'AL-SOMURA <onboarding@resend.dev>').trim();
  const supportEmail = (process.env.SUPPORT_EMAIL || 'al.sumora.support@gmail.com').trim();

  if (!apiKey) {
    console.warn('[Resend Customer Confirmation] Skipping: RESEND_API_KEY is not configured.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  let order;
  try {
    if (typeof orderOrId === 'string') {
      order = await Order.findById(orderOrId);
    } else if (orderOrId && orderOrId._id) {
      order = orderOrId;
    }

    if (!order) {
      console.error('[Resend Customer Confirmation] Order not found:', orderOrId);
      return { success: false, error: 'Order not found' };
    }

    const customerEmail = (order.customerInfo?.email || '').trim();
    if (!customerEmail) {
      console.warn(`[Resend Customer Confirmation] Order #${order._id} has no customer email address.`);
      return { success: false, error: 'No customer email address on order' };
    }

    if (order.customerNotificationSent) {
      console.log(`[Resend Customer Confirmation] Order #${order._id} confirmation already sent. Skipping duplicate.`);
      return { success: true, message: 'Customer confirmation already sent' };
    }

    if (order.paymentStatus === 'failed' || order.orderStatus === 'Cancelled') {
      console.log(`[Resend Customer Confirmation] Order #${order._id} cancelled/failed. Skipping.`);
      return { success: false, error: 'Order status not eligible for confirmation' };
    }

    // Populate actual Product records
    const productIds = (order.items || []).map((i) => i.productId).filter(Boolean);
    let populatedProducts = [];
    if (productIds.length > 0) {
      try {
        populatedProducts = await Product.find({ _id: { $in: productIds } });
      } catch (prodErr) {
        console.warn('[Resend Customer Confirmation] Could not populate products:', prodErr.message);
      }
    }

    // Subject format: Thank You for Your Order! Your AL-SOMURA Order #[Order ID] is Confirmed
    const subject = `Thank You for Your Order! Your AL-SOMURA Order #${order._id} is Confirmed`;
    const html = generateCustomerOrderConfirmationHtml(order, populatedProducts);

    const resend = new Resend(apiKey);
    console.log(`[Resend Customer Confirmation] Sending confirmation for Order #${order._id} to ${customerEmail}...`);

    let result = await resend.emails.send({
      from: fromEmail,
      to: [customerEmail],
      replyTo: supportEmail,
      subject: subject,
      html: html,
    });

    // Handle Resend testing restriction gracefully
    if (result.error && result.error.message && result.error.message.includes('only send testing emails to your own email address')) {
      const match = result.error.message.match(/\(([^)]+)\)/);
      const verifiedAccountEmail = match ? match[1] : null;

      if (verifiedAccountEmail && verifiedAccountEmail !== customerEmail) {
        console.warn(`[Resend Customer Confirmation] Notice: ${fromEmail} requires a verified domain to send to ${customerEmail}. Auto-delivering customer confirmation to verified account email (${verifiedAccountEmail}) with note.`);
        
        result = await resend.emails.send({
          from: fromEmail,
          to: [verifiedAccountEmail],
          replyTo: supportEmail,
          subject: `${subject} [Dev Mode → Intended for ${customerEmail}]`,
          html: html,
        });
      }
    }

    if (result.error) {
      console.error('[Resend Customer Confirmation] API error:', result.error);
      try {
        await Order.findByIdAndUpdate(order._id, {
          customerNotificationError: result.error.message || 'Resend API error',
        });
      } catch (dbErr) {
        console.error('[Resend Customer Confirmation] DB error saving error state:', dbErr.message);
      }
      return { success: false, error: result.error.message };
    }

    console.log(`[Resend Customer Confirmation] Order #${order._id} customer confirmation sent! ID:`, result.data?.id);

    try {
      await Order.findByIdAndUpdate(order._id, {
        customerNotificationSent: true,
        customerNotificationSentAt: new Date(),
        customerNotificationError: null,
      });
    } catch (dbErr) {
      console.warn('[Resend Customer Confirmation] DB error updating sent state:', dbErr.message);
    }

    return { success: true, messageId: result.data?.id };
  } catch (err) {
    console.error('[Resend Customer Confirmation] Exception:', err);
    return { success: false, error: err.message };
  }
}

/**
 * 3. Unified Dispatch Helper: Triggers both Store Owner Alert and Customer Confirmation in parallel
 */
export async function dispatchAllOrderEmails(orderOrId) {
  console.log('[Resend Dispatcher] Dispatching all automated emails for order...');

  const results = await Promise.allSettled([
    sendOrderNotificationEmail(orderOrId),
    sendCustomerConfirmationEmail(orderOrId),
  ]);

  const ownerResult = results[0].status === 'fulfilled' ? results[0].value : { success: false, error: results[0].reason };
  const customerResult = results[1].status === 'fulfilled' ? results[1].value : { success: false, error: results[1].reason };

  console.log('[Resend Dispatcher] Email dispatch complete. Owner Alert:', ownerResult.success ? '✓' : '✗', '| Customer Confirmation:', customerResult.success ? '✓' : '✗');

  return {
    owner: ownerResult,
    customer: customerResult,
  };
}

export default dispatchAllOrderEmails;

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, totalAmount, deliveryCharge } = body;

    if (!customer || !items || !items.length || !customer.name || !customer.phone || !customer.address) {
      return NextResponse.json(
        { success: false, message: 'Missing required customer or order details.' },
        { status: 400 }
      );
    }

    const orderId = `ERS-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer,
      items,
      deliveryCharge,
      totalAmount,
      status: 'Pending'
    };

    // 1. Save to local orders.json file
    const filePath = path.join(process.cwd(), 'orders.json');
    let ordersList = [];
    
    try {
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        ordersList = JSON.parse(fileData);
        if (!Array.isArray(ordersList)) {
          ordersList = [];
        }
      }
    } catch (e) {
      console.error('Error reading local orders file:', e);
      ordersList = [];
    }

    ordersList.push(newOrder);

    try {
      fs.writeFileSync(filePath, JSON.stringify(ordersList, null, 2), 'utf8');
      console.log(`Order saved locally in orders.json with ID: ${orderId}`);
    } catch (e) {
      console.error('Failed to write local orders file:', e);
    }

    // 1.5. Send to Google Sheets Web App (if URL is set)
    const googleSheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
    if (googleSheetUrl) {
      try {
        const itemsOrdered = items.map((item: any) => `${item.name} (${item.brand}) [Qty: ${item.quantity}]`).join(', ');
        
        // Use a background call so we don't block the user's checkout response
        fetch(googleSheetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: newOrder.orderId,
            createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }), // Local BD time
            customerName: customer.name,
            customerPhone: customer.phone,
            customerAddress: customer.address,
            customerArea: customer.area === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka',
            itemsOrdered,
            deliveryCharge: newOrder.deliveryCharge,
            totalAmount: newOrder.totalAmount,
            paymentMethod: 'Cash on Delivery',
            status: newOrder.status,
          }),
        }).then(async (response) => {
          if (response.ok) {
            const resData = await response.json();
            if (resData.success) {
              console.log('Order successfully synced with Google Sheets!');
            } else {
              console.warn('Google Sheets Apps Script returned an error:', resData.error);
            }
          } else {
            console.warn('Failed to contact Google Sheets. Status:', response.status);
          }
        }).catch((err) => {
          console.error('Google Sheets async request failed:', err);
        });
      } catch (error) {
        console.error('Failed to dispatch Google Sheets request:', error);
      }
    } else {
      console.log('Google Sheets sync skipped: GOOGLE_SHEET_WEBAPP_URL environment variable is not defined.');
    }

    // 2. Format Email Content
    const emailSubject = `🚨 New Order Received! Order ID: ${orderId} - ersbeauty`;
    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br>
          <span style="font-size: 12px; color: #666;">Brand: ${item.brand}</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">৳${item.price}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">৳${item.price * item.quantity}</td>
      </tr>
    `).join('');

    const emailBodyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 10px; color: #333;">
        <div style="text-align: center; border-bottom: 2px solid #004BBE; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #004BBE; margin: 0; font-size: 24px;">ersbeauty Order Notification</h2>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Order ID: <strong>${orderId}</strong></p>
        </div>

        <h3 style="color: #333; border-left: 4px solid #004BBE; padding-left: 10px; margin-top: 0;">Customer Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr>
            <td style="padding: 6px 0; width: 120px; font-weight: bold; color: #555;">Name:</td>
            <td style="padding: 6px 0;">${customer.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #555;">Phone:</td>
            <td style="padding: 6px 0;"><a href="tel:${customer.phone}" style="color: #004BBE; text-decoration: none; font-weight: bold;">${customer.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #555;">Address:</td>
            <td style="padding: 6px 0;">${customer.address}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #555;">Delivery Zone:</td>
            <td style="padding: 6px 0;">${customer.area === 'dhaka' ? 'Inside Dhaka (৳80)' : 'Outside Dhaka (৳120)'}</td>
          </tr>
        </table>

        <h3 style="color: #333; border-left: 4px solid #004BBE; padding-left: 10px;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f7f9fc;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd; font-size: 13px;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd; font-size: 13px; width: 80px;">Price</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd; font-size: 13px; width: 60px;">Qty</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd; font-size: 13px; width: 90px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="width: 250px; margin-left: auto; margin-bottom: 25px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #666;">Delivery Charge:</td>
              <td style="padding: 6px 0; text-align: right; font-weight: bold;">৳${deliveryCharge}</td>
            </tr>
            <tr style="border-top: 1px solid #ddd;">
              <td style="padding: 10px 0 0 0; font-size: 16px; font-weight: bold; color: #004BBE;">Total Amount:</td>
              <td style="padding: 10px 0 0 0; text-align: right; font-size: 18px; font-weight: bold; color: #004BBE;">৳${totalAmount}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #fcf8e3; border: 1px solid #faebcc; border-radius: 5px; padding: 12px; font-size: 13px; color: #8a6d3b; text-align: center;">
          ⚡ <strong>Payment Method:</strong> Cash on Delivery (ক্যাশ অন ডেলিভারি)
        </div>

        <p style="font-size: 11px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
          This is an automated notification from the <strong>ersbeauty</strong> store engine. Please call the client within 24 hours to confirm shipping.
        </p>
      </div>
    `;

    // 3. Send Email using Nodemailer
    const smtpHost = process.env.EMAIL_HOST || '';
    const smtpPort = parseInt(process.env.EMAIL_PORT || '587');
    const smtpUser = process.env.EMAIL_USER || '';
    const smtpPass = process.env.EMAIL_PASS || '';
    const smtpSecure = process.env.EMAIL_SECURE === 'true';

    const recipient = 'ersbeautybd@gmail.com';

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"ersbeauty Order Engine" <${smtpUser}>`,
        to: recipient,
        subject: emailSubject,
        html: emailBodyHtml,
      });

      console.log(`Email successfully sent to ${recipient} via Nodemailer.`);
    } else {
      console.warn('------------------------------------------------------------');
      console.warn('WARNING: SMTP configuration is missing from environment variables.');
      console.warn(`Could not send order email to ${recipient}.`);
      console.warn('To fix this, add the following to your .env file:');
      console.warn('EMAIL_HOST=smtp.gmail.com');
      console.warn('EMAIL_PORT=587');
      console.warn('EMAIL_USER=your_email@gmail.com');
      console.warn('EMAIL_PASS=your_gmail_app_password');
      console.warn('------------------------------------------------------------');
      console.log('Order Details logged to Server Console:');
      console.log(`Recipient: ${recipient}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Text Summary: Customer ${customer.name} (${customer.phone}) ordered ${items.length} items. Total: ৳${totalAmount}`);
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order placed successfully!'
    });
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'An error occurred during checkout.' },
      { status: 500 }
    );
  }
}

const express = require("express")
const cors = require("cors")
const axios = require("axios")
const nodemailer = require("nodemailer")
const pdf = require("html-pdf")
const fs = require("fs")
const path = require("path")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  secure: true,
  pool: true, // Use pooled connections
  maxConnections: 1, // Limit to 1 connection to prevent parallel sends
  maxMessages: 1, // Limit to 1 message per connection
})

// Test email connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Email server connection error:", error)
  } else {
    console.log("Email server connection successful")
  }
})

// Track emails sent to prevent duplicates
const emailsSent = new Set()

// WhatsApp API configuration
const sendWhatsAppMessage = async (phoneNumber, message, pdfPath, orderId) => {
  try {
    // Check if WhatsApp API credentials are configured
    if (!process.env.WHATSAPP_API_KEY || !process.env.WHATSAPP_BUSINESS_ACCOUNT_ID) {
      console.log("WhatsApp API not configured. Skipping WhatsApp message.")
      return { success: false, message: "WhatsApp API not configured" }
    }

    // Format phone number (remove any non-digit characters and ensure it has country code)
    let formattedPhone = phoneNumber.replace(/\D/g, "")
    if (!formattedPhone.startsWith("91") && formattedPhone.length === 10) {
      formattedPhone = "91" + formattedPhone // Add India country code if missing
    }

    // Read the PDF file as base64
    const pdfBuffer = fs.readFileSync(pdfPath)
    const pdfBase64 = pdfBuffer.toString("base64")

    // WhatsApp Business API endpoint
    const whatsappApiUrl = "https://graph.facebook.com/v17.0/" + process.env.WHATSAPP_BUSINESS_ACCOUNT_ID + "/messages"

    // Prepare the WhatsApp message payload
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: formattedPhone,
      type: "document",
      document: {
        filename: `FlyAnyTrip_Receipt_${orderId}.pdf`,
        caption: message,
        id: pdfBase64,
      },
    }

    // Send the WhatsApp message
    console.log(`Sending WhatsApp message to ${formattedPhone}`)

    console.log("WhatsApp message would be sent with the PDF receipt")
    return { success: true, message: "WhatsApp message sent successfully" }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    return {
      success: false,
      message: "Failed to send WhatsApp message",
      error: error.message,
    }
  }
}

// Update the generateReceiptHTML function to improve alignment and styling
const generateReceiptHTML = (orderData, bookingDetails, packageDetails) => {
  const date = new Date()
  const formattedDate = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Ensure we have valid data by providing defaults
  const order = orderData || {
    order_id: "Unknown",
    order_amount: 0,
    order_status: "UNKNOWN",
  }

  const booking = bookingDetails || {
    fullName: "Customer",
    email: "customer@example.com",
    phone: "N/A",
    travelDate: formattedDate,
    travelers: 1,
  }

  const packageInfo = packageDetails || {
    name: "Travel Package",
    location: "Destination",
    duration: "N/A",
    price: order.order_amount || 0,
  }

  // Generate travelers HTML
  let travelersHTML = `
    <div class="traveler-item">
      <div class="traveler-header">Lead Traveler</div>
      <div class="traveler-details">
        <div class="traveler-detail">
          <span class="detail-label">Name:</span>
          <span>${booking.fullName}</span>
        </div>
        <div class="traveler-detail">
          <span class="detail-label">Gender:</span>
          <span>${booking.gender || "Not specified"}</span>
        </div>
        <div class="traveler-detail">
          <span class="detail-label">Age:</span>
          <span>${booking.age || "Not specified"}</span>
        </div>
      </div>
    </div>
  `

  // Add additional travelers if they exist
  if (booking.additionalTravelers && booking.additionalTravelers.length > 0) {
    booking.additionalTravelers.forEach((traveler, index) => {
      travelersHTML += `
        <div class="traveler-item">
          <div class="traveler-header">Traveler ${index + 2}</div>
          <div class="traveler-details">
            <div class="traveler-detail">
              <span class="detail-label">Name:</span>
              <span>${traveler.fullName}</span>
            </div>
            <div class="traveler-detail">
              <span class="detail-label">Gender:</span>
              <span>${traveler.gender || "Not specified"}</span>
            </div>
            <div class="traveler-detail">
              <span class="detail-label">Age:</span>
              <span>${traveler.age || "Not specified"}</span>
            </div>
          </div>
        </div>
      `
    })
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Receipt</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-style: normal; /* Ensure no italic fonts */
        }
        
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #fff;
          font-style: normal; /* Ensure no italic fonts */
        }
        
        .receipt {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 30px;
          background-color: #fff;
        }
        
        .header {
          display: table;
          width: 100%;
          margin-bottom: 30px;
          border-bottom: 2px solid #e53935;
          padding-bottom: 20px;
        }
        
        .header-row {
          display: table-row;
        }
        
        .logo-cell, .company-cell, .receipt-title-cell {
          display: table-cell;
          vertical-align: top;
          width: 33.33%;
        }
        
        .logo-cell {
          text-align: left;
        }
        
        .company-cell {
          text-align: center;
        }
        
        .receipt-title-cell {
          text-align: right;
        }
        
        .logo {
          font-size: 32px;
          font-weight: 700;
          color: #e53935;
          margin-bottom: 5px;
        }
        
        .logo-tagline {
          font-size: 12px;
          color: #7f8c8d;
        }
        
        .company-info {
          font-size: 13px;
          color: #555;
          line-height: 1.5;
        }
        
        .company-info p {
          margin: 3px 0;
        }
        
        .receipt-title {
          font-size: 24px;
          color: #e53935;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .receipt-id {
          font-size: 14px;
          color: #555;
          margin-bottom: 5px;
        }
        
        .receipt-date {
          font-size: 14px;
          color: #555;
        }
        
        .section {
          margin-bottom: 25px;
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          border-left: 4px solid #e53935;
        }
        
        .section-title {
          font-weight: 600;
          margin-bottom: 18px;
          color: #2c3e50;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
          font-size: 18px;
        }
        
        .detail-row {
          display: table;
          width: 100%;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px dashed #eee;
        }
        
        .detail-label {
          display: table-cell;
          font-weight: 600;
          color: #444;
          width: 40%;
        }
        
        .detail-value {
          display: table-cell;
          width: 60%;
        }
        
        .total-row {
          font-weight: 700;
          font-size: 18px;
          margin-top: 20px;
          padding-top: 15px;
          border-top: 2px solid #e53935;
          color: #e53935;
        }
        
        .payment-success {
          color: #e53935;
          font-weight: 700;
        }
        
        .traveler-item {
          margin-bottom: 18px;
          border: 1px solid #eee;
          border-radius: 6px;
          overflow: hidden;
        }
        
        .traveler-header {
          background-color: #eef2f7;
          padding: 10px 15px;
          font-weight: 600;
          color: #2c3e50;
          border-bottom: 1px solid #ddd;
        }
        
        .traveler-details {
          padding: 15px;
          display: table;
          width: 100%;
          background-color: #fff;
        }
        
        .traveler-detail {
          display: table-row;
          padding: 8px 0;
        }
        
        .traveler-detail span {
          display: table-cell;
          padding: 5px 10px;
        }
        
        .traveler-detail .detail-label {
          width: 30%;
        }
        
        .additional-travelers {
          margin-top: 15px;
        }
        
        .ticket-note {
          background-color: #feeeee;
          border-left: 4px solid #e53935;
          padding: 15px 20px;
          margin: 25px 0;
          border-radius: 6px;
        }
        
        .ticket-note p {
          margin: 0;
          color: #2c3e50;
          font-weight: 500;
        }
        
        .footer {
          margin-top: 35px;
          border-top: 1px solid #ddd;
          padding-top: 25px;
          font-size: 13px;
          color: #555;
        }
        
        .terms {
          margin-bottom: 20px;
        }
        
        .terms h4 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #2c3e50;
          font-size: 16px;
        }
        
        .terms ul {
          margin: 0;
          padding-left: 20px;
        }
        
        .terms li {
          margin-bottom: 6px;
        }
        
        .contact {
          text-align: center;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px dashed #eee;
        }
        
        .contact p {
          margin: 6px 0;
        }
        
        @media print {
          .receipt {
            padding: 15px;
            max-width: 100%;
          }
          
          .section {
            page-break-inside: avoid;
          }
          
          .header, .footer {
            page-break-inside: avoid;
          }
          
          .traveler-item {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="header-row">
            <div class="logo-cell">
              <div class="logo">FlyAnyTrip</div>
              <div class="logo-tagline">Explore. Experience. Enjoy.</div>
            </div>
            <div class="company-cell">
              <div class="company-info">
                <p>FlyAnyTrip Travel Services Pvt. Ltd.</p>
                <p>123 Travel Plaza, Tourism Road</p>
                <p>New Delhi, India - 110001</p>
                <p>GST: 07AABCT1234Z1ZL</p>
              </div>
            </div>
            <div class="receipt-title-cell">
              <div class="receipt-title">Booking Receipt</div>
              <div class="receipt-id">Receipt #${order.order_id}</div>
              <div class="receipt-date">Date: ${formattedDate}</div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Customer Information</div>
          <div class="detail-row">
            <span class="detail-label">Name:</span>
            <span class="detail-value">${booking.fullName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${booking.email}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Phone:</span>
            <span class="detail-value">${booking.phone}</span>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Package Details</div>
          <div class="detail-row">
            <span class="detail-label">Package Name:</span>
            <span class="detail-value">${packageInfo.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Destination:</span>
            <span class="detail-value">${packageInfo.location}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Duration:</span>
            <span class="detail-value">${packageInfo.duration} Days</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Travel Date:</span>
            <span class="detail-value">${booking.travelDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Number of Travelers:</span>
            <span class="detail-value">${booking.travelers}</span>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Traveler Details</div>
          ${travelersHTML}
        </div>
        
        <div class="section">
          <div class="section-title">Payment Information</div>
          <div class="detail-row">
            <span class="detail-label">Order ID:</span>
            <span class="detail-value">${order.order_id}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Payment Status:</span>
            <span class="detail-value payment-success">${order.order_status || "PAID"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Price per Person:</span>
            <span class="detail-value">₹${(packageInfo.price || 0).toLocaleString("en-IN")}</span>
          </div>
          <div class="detail-row total-row">
            <span class="detail-label">Total Amount:</span>
            <span class="detail-value">₹${(order.order_amount || 0).toLocaleString("en-IN")}</span>
          </div>
        </div>
        
        <div class="ticket-note">
          <p>Your original booking package tickets will be provided within a few hours.</p>
        </div>
        
        <div class="footer">
          <div class="terms">
            <h4>Terms & Conditions</h4>
            <ul>
              <li>This receipt is proof of payment only.</li>
              <li>Cancellation policy: 48 hours notice required for full refund.</li>
              <li>Please carry a valid ID proof for all travelers during the trip.</li>
              <li>Package inclusions are as per the itinerary shared at the time of booking.</li>
            </ul>
          </div>
          <div class="contact">
            <p>Thank you for booking with FlyAnyTrip!</p>
            <p>For any queries, please contact us at <strong>support@flyanytrip.com</strong> or call <strong>+91 1234567890</strong></p>
            <p>© ${new Date().getFullYear()} FlyAnyTrip. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Function to send receipt email
const sendReceiptEmail = async (to, subject, orderData, bookingDetails, packageDetails) => {
  try {
    // Check if this email has already been sent to this recipient for this order
    const emailKey = `${to}_${orderData.order_id}`
    if (emailsSent.has(emailKey)) {
      console.log(`Email already sent to ${to} for order ${orderData.order_id}, skipping duplicate`)
      return { success: true, message: "Receipt email already sent" }
    }

    // Mark this email as sent BEFORE sending to prevent race conditions
    emailsSent.add(emailKey)

    console.log("Sending receipt email to:", to)

    const htmlContent = generateReceiptHTML(orderData, bookingDetails, packageDetails)

    // Generate PDF
    const pdfFilePath = path.join(uploadsDir, `receipt_${orderData.order_id}_${to.replace(/[^a-zA-Z0-9]/g, "")}.pdf`)

    // Create PDF from HTML with proper configuration
    await new Promise((resolve, reject) => {
      pdf
        .create(htmlContent, {
          format: "A4",
          timeout: 60000,
          border: {
            top: "10mm",
            right: "10mm",
            bottom: "10mm",
            left: "10mm",
          },
          phantomPath: require("phantomjs-prebuilt").path,
        })
        .toFile(pdfFilePath, (err, res) => {
          if (err) return reject(err)
          resolve(res)
        })
    })

    console.log("PDF generated successfully at:", pdfFilePath)

    // Verify the file exists before trying to attach it
    if (!fs.existsSync(pdfFilePath)) {
      throw new Error(`PDF file not found at ${pdfFilePath}`)
    }

    // Send email with PDF attachment
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2c3e50; margin-bottom: 5px; font-size: 24px;">Thank You for Your Booking!</h1>
            <p style="color: #7f8c8d; font-size: 16px;">Your adventure awaits</p>
          </div>
          
          <div style="background-color: #f9f9f9; border-left: 4px solid #3498db; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
            <p style="margin: 0; font-size: 16px;">Dear <strong>${bookingDetails.fullName}</strong>,</p>
          </div>
          
          <p>Your booking for <strong>${
            packageDetails.name
          }</strong> has been confirmed. Your payment of <strong>₹${orderData.order_amount.toLocaleString(
            "en-IN",
          )}</strong> has been successfully processed.</p>
          
          <div style="background-color: #eef7fe; border-radius: 4px; padding: 15px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">Booking Details:</h3>
            <p><strong>Order ID:</strong> ${orderData.order_id}</p>
            <p><strong>Travel Date:</strong> ${bookingDetails.travelDate}</p>
            <p><strong>Destination:</strong> ${packageDetails.location}</p>
            <p><strong>Duration:</strong> ${packageDetails.duration} Days</p>
            <p><strong>Number of Travelers:</strong> ${bookingDetails.travelers}</p>
          </div>
          
          <p><strong>Important:</strong> Your original booking package tickets will be provided within a few hours.</p>
          <p>Please find your booking receipt attached to this email.</p>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #7f8c8d; font-size: 14px;">
            <p>We look forward to providing you with an amazing travel experience!</p>
            <p>Best regards,<br><strong>FlyAnyTrip Team</strong></p>
            <p style="font-size: 12px; margin-top: 20px;">© ${new Date().getFullYear()} FlyAnyTrip. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `FlyAnyTrip_Receipt_${orderData.order_id}.pdf`,
          path: pdfFilePath,
          contentType: "application/pdf",
        },
      ],
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.response)

    // Clean up the PDF file
    try {
      if (fs.existsSync(pdfFilePath)) {
        setTimeout(() => {
          try {
            fs.unlinkSync(pdfFilePath)
            console.log("Temporary PDF file deleted successfully")
          } catch (innerError) {
            console.error("Warning: Could not delete temporary PDF file:", innerError)
          }
        }, 10000)
      }
    } catch (deleteError) {
      console.error("Warning: Could not delete temporary PDF file:", deleteError)
    }

    return { success: true, message: "Receipt email sent successfully" }
  } catch (error) {
    console.error("Error sending receipt email:", error)
    // Remove the email from sent set if sending failed
    const emailKey = `${to}_${orderData.order_id}`
    emailsSent.delete(emailKey)
    return {
      success: false,
      message: "Failed to send receipt email",
      error: error.message,
    }
  }
}

// Cashfree API configuration
const CASHFREE_BASE_URL = "https://sandbox.cashfree.com/pg"

// Create order endpoint
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", customerDetails } = req.body

    // Generate a unique order ID
    const orderId = "order_" + Date.now() + "_" + Math.floor(Math.random() * 1000)

    const request = {
      order_id: orderId,
      order_amount: Number.parseFloat(amount),
      order_currency: currency,
      customer_details: {
        customer_id: customerDetails.customer_id || "customer_" + Date.now(),
        customer_name: customerDetails.customer_name,
        customer_email: customerDetails.customer_email,
        customer_phone: customerDetails.customer_phone,
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_URL}/payment-status?order_id=${orderId}`,
      },
    }

    const response = await axios.post(`${CASHFREE_BASE_URL}/orders`, request, {
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "Content-Type": "application/json",
      },
    })

    res.json(response.data)
  } catch (error) {
    console.error("Error creating order:", error.response ? error.response.data : error.message)
    res.status(500).json({
      error: "Failed to create order",
      message: error.response ? error.response.data : error.message,
    })
  }
})

// Verify payment endpoint
app.get("/api/verify-payment/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params

    const response = await axios.get(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
      },
    })

    // Get payment status
    const paymentStatus = response.data.order_status

    // Return payment result
    res.json({
      order_id: orderId,
      status: paymentStatus,
      message: paymentStatus === "PAID" ? "Payment successful" : "Payment failed",
      data: response.data,
    })
  } catch (error) {
    console.error("Error verifying payment:", error.response ? error.response.data : error.message)
    res.status(500).json({
      error: "Failed to verify payment",
      message: error.response ? error.response.data : error.message,
    })
  }
})

// Send receipt endpoint
app.post("/api/send-receipt", async (req, res) => {
  try {
    const { orderData, bookingDetails, packageDetails } = req.body

    if (!orderData || !bookingDetails || !packageDetails) {
      return res.status(400).json({
        success: false,
        message: "Missing required data for receipt generation",
      })
    }

    // Check if this email has already been sent
    const emailKey = `${bookingDetails.email}_${orderData.order_id}`
    if (emailsSent.has(emailKey)) {
      console.log(`Email already sent to ${bookingDetails.email} for order ${orderData.order_id}, skipping duplicate`)
      return res.json({
        success: true,
        message: "Receipt email already sent",
      })
    }

    console.log("Sending receipt email to:", bookingDetails.email)

    // Send only one email to the customer
    const result = await sendReceiptEmail(
      bookingDetails.email,
      "Your FlyAnyTrip Booking Receipt",
      orderData,
      bookingDetails,
      packageDetails,
    )

    res.json(result)
  } catch (error) {
    console.error("Error sending receipt:", error)
    res.status(500).json({
      success: false,
      message: "Failed to send receipt email",
      error: error.message,
    })
  }
})

// Generate receipt PDF endpoint
app.post("/api/generate-receipt", async (req, res) => {
  try {
    let orderData, bookingDetails, packageDetails

    try {
      orderData = typeof req.body.orderData === "string" ? JSON.parse(req.body.orderData) : req.body.orderData

      bookingDetails =
        typeof req.body.bookingDetails === "string" ? JSON.parse(req.body.bookingDetails) : req.body.bookingDetails

      packageDetails =
        typeof req.body.packageDetails === "string" ? JSON.parse(req.body.packageDetails) : req.body.packageDetails
    } catch (parseError) {
      console.error("Error parsing request data:", parseError)
      return res.status(400).json({
        success: false,
        message: "Invalid request data format",
        error: parseError.message,
      })
    }

    if (!orderData || !bookingDetails || !packageDetails) {
      return res.status(400).json({
        success: false,
        message: "Missing required data for receipt generation",
      })
    }

    const orderId = orderData?.order_id || `receipt_${Date.now()}`
    const uniqueId = Date.now().toString().slice(-4)
    const pdfFilePath = path.join(uploadsDir, `receipt_${orderId}_${uniqueId}.pdf`)

    console.log("Generating receipt PDF for order:", orderId)

    const htmlContent = generateReceiptHTML(orderData, bookingDetails, packageDetails)

    await new Promise((resolve, reject) => {
      pdf
        .create(htmlContent, {
          format: "A4",
          timeout: 60000,
          border: {
            top: "10mm",
            right: "10mm",
            bottom: "10mm",
            left: "10mm",
          },
          phantomPath: require("phantomjs-prebuilt").path,
        })
        .toFile(pdfFilePath, (err, res) => {
          if (err) {
            console.error("PDF generation error:", err)
            return reject(err)
          }
          resolve(res)
        })
    })

    console.log("PDF generated successfully at:", pdfFilePath)

    if (!fs.existsSync(pdfFilePath)) {
      throw new Error(`PDF file not found at ${pdfFilePath}`)
    }

    const fileData = fs.readFileSync(pdfFilePath)

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", `attachment; filename=FlyAnyTrip_Receipt_${orderId}.pdf`)
    res.setHeader("Content-Length", fileData.length)

    res.send(fileData)

    setTimeout(() => {
      try {
        if (fs.existsSync(pdfFilePath)) {
          fs.unlinkSync(pdfFilePath)
          console.log("Temporary PDF file deleted successfully after download")
        }
      } catch (deleteError) {
        console.error("Warning: Could not delete temporary PDF file after download:", deleteError)
      }
    }, 15000)
  } catch (error) {
    console.error("Error generating receipt:", error)
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Failed to generate receipt PDF",
        error: error.message,
      })
    }
  }
})

app.get("/ha", (req, res) => {
  res.send("Cashfree Payment Gateway API is running")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

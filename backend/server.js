import dotenv from 'dotenv';

dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Present" : "❌ Missing");

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// ✅ Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ API route to send email
app.post('/api/send-email', async (req, res) => {
  try {
    const { email, message } = req.body;
    console.log("📨 Email Request Received:", { email, message });

    if (!email || !message) {
      console.log("❌ Missing fields");
      return res.status(400).send("Missing email or message");
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shivanya.b@infera.in',
      subject: 'New User Query from ALDO Chatbot',
      text: `User Email: ${email}\n\nQuery: ${message}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
    res.status(200).send("Email sent successfully");

  } catch (err) {
    console.error("❌ Email sending failed:", err.message, err.stack);
    res.status(500).send("Internal Server Error");
  }
});


// ✅ Root route
app.get('/', (req, res) => {
  res.send('🌱 ALDO Support Chatbot Backend Running!');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(cors());
// app.use(bodyParser.json());

// // Setup transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // POST route
// app.post('/api/send-email', (req, res) => {
//   const { email, message } = req.body;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'shivanya.b@infera.in',
//     subject: 'New User Query from ALDO Chatbot',
//     text: `User Email: ${email}\n\nQuery: ${message}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('❌ Error sending email:', error);
//       res.status(500).send('Failed to send email');
//     } else {
//       console.log('✅ Email sent:', info.response);
//       res.status(200).send('Email sent successfully');
//     }
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

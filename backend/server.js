// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.post("/send", (req, res) => {
//   const { query } = req.body;
//   console.log("📨 Simulated email sent to shivanya.b@infera.in with query:", query);
//   res.sendStatus(200);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log("✅ EPAR Bot backend running on port", PORT);
// });
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Setup transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST route
app.post('/api/send-email', (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'shivanya.b@infera.in',
    subject: 'New User Query from ALDO Chatbot',
    text: `User Email: ${email}\n\nQuery: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error sending email:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('✅ Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

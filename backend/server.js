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

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-email', async (req, res) => {
  const { userMessage } = req.body;

  try {
    await transporter.sendMail({
      from: `"EPAR Chatbot" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: 'New Chatbot Query',
      text: `User asked: ${userMessage}`,
    });

    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Email failed' });
  }
});

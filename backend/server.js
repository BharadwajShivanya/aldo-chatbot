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
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { query } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: "shivanya.b@infera.in",
      subject: "New Chatbot Query",
      text: `User asked: ${query}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to shivanya.b@infera.in");
    res.status(200).send("Email sent");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    res.status(500).send("Email failed");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

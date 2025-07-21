require('dotenv').config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

let clients = [];

app.use(cors());
app.use(express.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

// In-memory email tracker to avoid spamming
let emailSentFor = {};

app.post("/send", async (req, res) => {
  const { username, message } = req.body;
  const text = message.trim().toLowerCase();

  const userMsg = { username, message };
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(userMsg)}\n\n`);
  });

  let botMessage = "";

  // Bot logic
  if (text.includes("hi") || text.includes("hello")) {
    botMessage = `Hello ${username}! Welcome to Aldo 🌿\n\nHow can I assist you?\n1️⃣ Sustainability Planning\n2️⃣ Climate Risk Tools\n3️⃣ Compliance Support\n4️⃣ Learn More\n5️⃣ Contact Us`;
  } else if (text === "1") {
    botMessage = `🌱 Sustainability Planning Options:\n- a) Carbon Footprint\n- b) Water Management\n- c) Biodiversity Planning\n- d) Action Plan\n(Type a, b, c, or d)`;
  } else if (text === "2") {
    botMessage = `🌍 Climate Risk Tools:\n- a) Risk Assessments\n- b) Adaptation Plans\n- c) Scenario Planning\n(Type a, b, or c)`;
  } else if (text === "3") {
    botMessage = `📊 Compliance Support:\n- a) Environmental Regulations\n- b) Reporting Tools\n- c) Risk Registers\n(Type a, b, or c)`;
  } else if (text === "4") {
    botMessage = `📚 Learn More:\n- a) What is Aldo?\n- b) ESG & Sustainability\n- c) Workshops & Training\n(Type a, b, or c)`;
  } else if (text === "5") {
    botMessage = `📞 Contact Us:\n- a) Request Consultation\n- b) Speak to an Expert\n- c) Download Brochure\n(Type a, b, or c)`;
  } else if (["a", "b", "c", "d"].includes(text)) {
    botMessage = "ℹ️ Option selected. Please reply with the main category (1, 2, 3, 4, or 5) so we can assist better.";

    const emailKey = `${username}_${message}`;
    if (!emailSentFor[emailKey]) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: "shivanya.b@infera.in",
          subject: `Aldo Bot Query from ${username}`,
          text: `User "${username}" selected option "${message}"`
        });
        emailSentFor[emailKey] = true;
        console.log(`📩 Email sent for ${emailKey}`);
      } catch (err) {
        console.error("❌ Email sending failed:", err);
      }
    }
  } else {
    botMessage = `Thanks ${username}, please choose one of the options. Type "hi" to restart.`;
  }

  const botReply = { username: "EPAR Bot", message: botMessage };
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(botReply)}\n\n`);
  });

  res.status(200).end();
});

// Streaming setup
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients.push({ res });

  req.on("close", () => {
    clients = clients.filter(c => c.res !== res);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ EPAR Bot backend running on http://localhost:${PORT}`);
});

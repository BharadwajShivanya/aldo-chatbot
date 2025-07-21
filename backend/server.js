// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");

// const app = express();
// const PORT = process.env.PORT || 3000;
// let clients = [];

// app.use(cors({
//   origin: "https://aldo-chatbot-uw7d.vercel.app", // your frontend Vercel domain
//   methods: ["GET", "POST"],
//   credentials: false,
// }));
// app.use(express.json());

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// app.post("/send", async (req, res) => {
//   const { username, message } = req.body;
//   const text = message.trim().toLowerCase();
//   let botMessage = "";

//   // Send user message to all clients
//   const userMsg = { username, message };
//   clients.forEach(client => {
//     client.res.write(`data: ${JSON.stringify(userMsg)}\n\n`);
//   });

//   // Bot responses
//   if (text.includes("hi") || text.includes("hello")) {
//     botMessage = `Hello ${username}! Welcome to Aldo 🌿\n\nHow can I assist you?\n1️⃣ Sustainability Planning\n2️⃣ Climate Risk Tools\n3️⃣ Compliance Support\n4️⃣ Learn More\n5️⃣ Contact Us`;
//   } else if (text === "1") {
//     botMessage = `🌱 Sustainability Planning Options:\n- a) Carbon Footprint\n- b) Water Management\n- c) Biodiversity Planning\n- d) Action Plan\n(Type a, b, c, or d)`;
//   } else if (text === "2") {
//     botMessage = `🌍 Climate Risk Tools:\n- a) Risk Assessments\n- b) Adaptation Plans\n- c) Scenario Planning\n(Type a, b, or c)`;
//   } else if (text === "3") {
//     botMessage = `📊 Compliance Support:\n- a) Environmental Regulations\n- b) Reporting Tools\n- c) Risk Registers\n(Type a, b, or c)`;
//   } else if (text === "4") {
//     botMessage = `📚 Learn More:\n- a) What is Aldo?\n- b) ESG & Sustainability\n- c) Workshops & Training\n(Type a, b, or c)`;
//   } else if (text === "5") {
//     botMessage = `📞 Contact Us:\n- a) Request Consultation\n- b) Speak to an Expert\n- c) Download Brochure\n(Type a, b, or c)`;
//   } else if (["a", "b", "c", "d"].includes(text)) {
//     botMessage = "ℹ️ Option selected. Could you tell me which main category you're referring to (1, 2, 3, 4, or 5)?";

//     // Send email
//     try {
//       await transporter.sendMail({
//         from: process.env.EMAIL,
//         to: "shivanya.b@infera.in",
//         subject: "Aldo Bot Inquiry",
//         text: `User ${username} selected option: ${message}`
//       });
//       console.log("📩 Email sent");
//     } catch (error) {
//       console.error("❌ Failed to send email:", error);
//     }
//   } else {
//     botMessage = `Thanks for your message, ${username}. Please choose one of the options from the menu. Type "hi" to start over.`;
//   }

//   const botReply = { username: "EPAR Bot", message: botMessage };
//   clients.forEach(client => {
//     client.res.write(`data: ${JSON.stringify(botReply)}\n\n`);
//   });

//   res.status(200).end();
// });

// app.get("/stream", (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");
//   res.flushHeaders();

//   clients.push({ res });

//   req.on("close", () => {
//     clients = clients.filter(c => c.res !== res);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`✅ EPAR Bot backend running on port ${PORT}`);
// });
// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("❌ PORT environment variable not defined");
}

// 🔥 Debug log middleware - add early
app.use((req, res, next) => {
  console.log("🔥 Incoming request:", req.method, req.path, req.headers.origin);
  next();
});

// ✅ CORS config
const allowedOrigins = [
  "https://aldo-chatbot.vercel.app",
  "https://aldo-chatbot-git-main-shivanyas-projects-f3ba16ef.vercel.app",
  "https://aldo-chatbot-l1naf6or7-shivanyas-projects-f3ba16ef.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// ✅ Basic route
app.get("/", (req, res) => {
  res.send("✅ EPAR Bot backend is running.");
});

try {
  app.listen(PORT, () => {
    console.log(`✅ EPAR Bot backend running on port ${PORT}`);
  });
} catch (err) {
  console.error("❌ Failed to start server:", err);
}

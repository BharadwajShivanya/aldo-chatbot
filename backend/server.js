const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

let clients = [];

app.use(cors());
app.use(express.json());

app.post("/send", (req, res) => {
  const { username, message } = req.body;

  const userMsg = { username, message };
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(userMsg)}\n\n`);
  });

  const text = message.trim().toLowerCase();
  let botMessage = "";

  if (text.includes("hi") || text.includes("hello")) {
    botMessage = `Hello ${username}! Welcome to EPAR 🌿\n\nHow can I assist you?\n1️⃣ Sustainability Planning\n2️⃣ Climate Risk Tools\n3️⃣ Compliance Support\n4️⃣ Learn More\n5️⃣ Contact Us`;
  } else if (text === "1") {
    botMessage = `🌱 Sustainability Planning Options:\n- a) Carbon Footprint\n- b) Water Management\n- c) Biodiversity Planning\n- d) Action Plan\n(Type a, b, c, or d)`;
  } else if (text === "2") {
    botMessage = `🌍 Climate Risk Tools:\n- a) Risk Assessments\n- b) Adaptation Plans\n- c) Scenario Planning\n(Type a, b, or c)`;
  } else if (text === "3") {
    botMessage = `📊 Compliance Support:\n- a) Environmental Regulations\n- b) Reporting Tools\n- c) Risk Registers\n(Type a, b, or c)`;
  } else if (text === "4") {
    botMessage = `📚 Learn More:\n- a) What is EPAR?\n- b) ESG & Sustainability\n- c) Workshops & Training\n(Type a, b, or c)`;
  } else if (text === "5") {
    botMessage = `📞 Contact Us:\n- a) Request Consultation\n- b) Speak to an Expert\n- c) Download Brochure\n(Type a, b, or c)`;
  } else if (["a", "b", "c", "d"].includes(text)) {
    botMessage = "ℹ️ Option selected. Could you tell me which main category you're referring to (1, 2, 3, 4, or 5)?";
  } else {
    botMessage = `Thanks for your message, ${username}. Please choose one of the options from the menu. Type "hi" to start over.`;
  }

  const botReply = {
    username: "EPAR Bot",
    message: botMessage
  };

  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(botReply)}\n\n`);
  });

  res.status(200).end();
});

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

app.listen(PORT, () => {
  console.log(`✅ EPAR Bot backend running on http://localhost:${PORT}`);
});

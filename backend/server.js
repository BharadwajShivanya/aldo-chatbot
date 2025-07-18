// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

let clients = [];

app.use(cors());
app.use(express.json());

app.post("/send", (req, res) => {
  const { username, message } = req.body;

  // Broadcast user's message
  const userMsg = { username, message };
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(userMsg)}\n\n`);
  });

  // Bot logic
  let botMessage = "";
  const text = message.toLowerCase();

  if (text.includes("hi") || text.includes("hello")) {
    botMessage = `Hi ${username}, how can I help you today?\n\n1️⃣ Sustainability 🌱\n2️⃣ Product Materials 👟\n3️⃣ Recycling ♻️\n(Please type 1, 2 or 3)`;
  } else if (text === "1") {
    botMessage = "🌱 We are committed to sustainability through ethical sourcing and eco-friendly packaging.";
  } else if (text === "2") {
    botMessage = "👟 Our products use 50% recycled materials, without compromising style!";
  } else if (text === "3") {
    botMessage = "♻️ You can return used shoes to any ALDO store for recycling.";
  } else {
    botMessage = `Thanks for your message, ${username}. I’ll get back to you on that.`;
  }

  // Broadcast bot's reply
  const botReply = {
    username: "ALDO Bot",
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

backend/server.js



app.listen(PORT, () => {
  console.log(`✅ ALDO Bot backend running on http://localhost:${PORT}`);
});

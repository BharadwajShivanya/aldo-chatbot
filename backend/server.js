const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send", (req, res) => {
  const { query } = req.body;
  console.log("📨 Simulated email sent to shivanya.b@infera.in with query:", query);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ EPAR Bot backend running on port", PORT);
});

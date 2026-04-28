require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

const roomsRoute = require("./routes/rooms");

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, ".")));

app.use("/rooms", roomsRoute);

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
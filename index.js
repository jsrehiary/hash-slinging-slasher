const express = require("express");
const roomsRoutes = require("./routes/rooms");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

// route utama
app.use("/rooms", roomsRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
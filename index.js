require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5500",
}));

const roomsRoute = require("./routes/rooms");

app.use(express.json());

app.use("/rooms", roomsRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
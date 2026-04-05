const { scrapeRooms } = require("../services/scraper");

// GET /rooms
async function getAllRooms(req, res) {
  try {
    const rooms = await scrapeRooms();

    res.json({
      success: true,
      total: rooms.length,
      data: rooms
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error" });
  }
}

// GET /rooms/:id
async function getRoomById(req, res) {
  try {
    const rooms = await scrapeRooms();
    const room = rooms.find(r => r.id === req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    res.json({
      success: true,
      data: room
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Error" });
  }
}

// (placeholder buat next step)
async function getAvailability(req, res) {
  res.json({
    message: "Coming soon 😏 (kita reverse API nanti)"
  });
}

module.exports = {
  getAllRooms,
  getRoomById,
  getAvailability
};
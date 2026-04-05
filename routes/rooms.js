const express = require("express");
const router = express.Router();

const {
  getAllRooms,
  getRoomById,
  getAvailability
} = require("../controllers/roomsController");

router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.get("/:id/availability", getAvailability);

module.exports = router;
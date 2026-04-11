const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");

// ⚠️ TARUH INI PALING ATAS
router.get("/available", HomeController.getAllRooms);

// baru dynamic
router.get("/:id/events", HomeController.getRoomEvents);
router.get("/:id/availability", HomeController.getAvailability);
router.get("/range", HomeController.getRange);


module.exports = router;
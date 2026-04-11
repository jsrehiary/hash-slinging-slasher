const apiService = require("../services/apiService");

const getRoomEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "date query is required (YYYY-MM-DD)",
      });
    }

    const baseUrl = process.env.EVENTS_URL;

    const data = await apiService.getEvents(baseUrl, id, date);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, start, end } = req.query;

    if (!date || !start || !end) {
      return res.status(400).json({
        success: false,
        message: "date, start, end query required",
      });
    }

    const baseUrl = process.env.EVENTS_URL;

    const data = await apiService.checkAvailability(
      baseUrl,
      id,
      date,
      start,
      end
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "date query is required",
      });
    }

    const baseUrl = process.env.EVENTS_URL;

    const data = await apiService.getAllRoomsAvailability(baseUrl, date);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getRange = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        success: false,
        message: "start & end required",
      });
    }

    const baseUrl = process.env.EVENTS_URL;

    const data = await apiService.getAllRoomsRange(baseUrl, start, end);

    res.json({
      success: true,
      data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getRoomEvents,
  getAvailability,
  getAllRooms,
  getRange,
};
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getEvents,
  createEvent,
} = require("../controllers/calendarController");

router.get("/", protect, getEvents);
router.post("/", protect, createEvent);

module.exports = router;
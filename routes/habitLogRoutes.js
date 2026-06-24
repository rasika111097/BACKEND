const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getHabitLogs,
  createHabitLog,
} = require("../controllers/habitLogController");

router.get("/", protect, getHabitLogs);

router.post("/", protect, createHabitLog);

module.exports = router;
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createHabit,
  getHabits,
  toggleHabit,
} = require("../controllers/habitController");

const Habit = require("../models/Habit");

// GET ALL HABITS
router.get("/", protect, getHabits);

// CREATE HABIT
router.post("/", protect, createHabit);

// BULK CREATE HABITS
router.post("/bulk", protect, async (req, res) => {
  try {
    const habitsWithUser = req.body.habits.map((habit) => ({
      ...habit,
      user: req.user._id,
    }));

    const habits = await Habit.insertMany(habitsWithUser);

    res.status(201).json(habits);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// TOGGLE HABIT COMPLETE
router.put("/:id", protect, toggleHabit);

module.exports = router;
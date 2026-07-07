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
    const savedHabits = [];

    for (const habit of req.body.habits) {
      const exists = await Habit.findOne({
        user: req.user._id,
        title: habit.title,
        selectedDate: req.body.date,
      });

      if (!exists) {
        const newHabit = await Habit.create({
          ...habit,
          user: req.user._id,
          selectedDate: req.body.date,
        });

        savedHabits.push(newHabit);
      }
    }

    res.status(201).json(savedHabits);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// TOGGLE HABIT COMPLETE
router.put("/:id", protect, toggleHabit);

module.exports = router;
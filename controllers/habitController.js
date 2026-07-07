const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");

// GET ALL HABITS OF LOGGED IN USER
const getHabits = async (req, res) => {
  try {
    const filter = {
      user: req.user._id,
    };

    if (req.query.subGoalId) {
      filter.subGoal = req.query.subGoalId;
    }

    const habits = await Habit.find(filter).sort({
      createdAt: -1,
    });

    const today = new Date()
      .toISOString()
      .split("T")[0];

    habits.forEach((habit) => {
      habit.completed =
        habit.completedDates.includes(today);
    });

    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// CREATE HABIT
const createHabit = async (req, res) => {
  try {
    const {
      title,
      description,
      subGoalId,
      frequency,
      reminderTime,
      color,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const habit = await Habit.create({
      user: req.user._id,
      title,
      description,
      subGoal: subGoalId || null,
      frequency,
      reminderTime,
      color,
      completed: false,
      completedDates: [],
      streak: 0,
    });

    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const toggleHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    if (
      habit.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const alreadyCompleted =
      habit.completedDates.includes(today);

    if (alreadyCompleted) {
      habit.completedDates =
        habit.completedDates.filter(
          (date) => date !== today
        );

      habit.completed = false;

      if (habit.streak > 0) {
        habit.streak -= 1;
      }

      await HabitLog.findOneAndDelete({
        user: req.user._id,
        habit: habit._id,
        date: {
          $gte: new Date(today),
          $lt: new Date(
            new Date(today).getTime() +
            24 * 60 * 60 * 1000
          ),
        },
      });
    } else {
      habit.completedDates.push(today);

      habit.completed = true;

      habit.streak += 1;

      habit.totalCompletions =
        (habit.totalCompletions || 0) + 1;

      if (
        habit.streak >
        (habit.longestStreak || 0)
      ) {
        habit.longestStreak =
          habit.streak;
      }

      await HabitLog.create({
        user: req.user._id,
        habit: habit._id,
        completed: true,
        date: new Date(),
      });
    }
    habit.$__.version = undefined;
    await habit.save();

    res.status(200).json(habit);
  } catch (err) {
    console.error("Toggle Habit Error:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getHabits,
  createHabit,
  toggleHabit,
};
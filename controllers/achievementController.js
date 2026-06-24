const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");

const getAchievements = async (req, res) => {
  try {
    const userId = req.user._id;

    const habits = await Habit.find({ user: userId });
    const logs = await HabitLog.find({ user: userId });

    const completedLogs = logs.filter(l => l.completed);

    const achievements = [];

    // 1️⃣ First Habit
    if (habits.length >= 1) {
      achievements.push({
        title: "First Step",
        unlocked: true,
      });
    }

    // 2️⃣ 5 Completed Habits
    if (completedLogs.length >= 5) {
      achievements.push({
        title: "Getting Started",
        unlocked: true,
      });
    }

    // 3️⃣ Perfect Day
    const today = new Date().toISOString().split("T")[0];

    const todayLogs = logs.filter(
      (l) => l.date.toISOString().split("T")[0] === today
    );

    const allDone =
      todayLogs.length > 0 &&
      todayLogs.every((l) => l.completed);

    achievements.push({
      title: "Perfect Day",
      unlocked: allDone,
    });

    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAchievements };
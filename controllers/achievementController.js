const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");

const getAchievements = async (req, res) => {
  try {
    const userId = req.user._id;

    const habits = await Habit.find({ user: userId });
    const logs = await HabitLog.find({ user: userId });

    const completedLogs = logs.filter((log) => log.completed);

    const longestStreak =
      habits.length > 0
        ? Math.max(...habits.map((habit) => habit.longestStreak || 0))
        : 0;

    const achievements = [
      {
        title: "First Steps",
        description: "Create your first habit",
        progress: habits.length > 0 ? 1 : 0,
        target: 1,
        unlocked: habits.length >= 1,
      },
      {
        title: "Week Warrior",
        description: "Maintain a 7-day streak",
        progress: Math.min(longestStreak, 7),
        target: 7,
        unlocked: longestStreak >= 7,
      },
      {
        title: "Monthly Master",
        description: "Maintain a 30-day streak",
        progress: Math.min(longestStreak, 30),
        target: 30,
        unlocked: longestStreak >= 30,
      },
      {
        title: "Multi-Tasker",
        description: "Track 5 habits simultaneously",
        progress: habits.length,
        target: 5,
        unlocked: habits.length >= 5,
      },
      {
        title: "Perfect Week",
        description: "Complete all habits for 7 days",
        progress: Math.min(longestStreak, 7),
        target: 7,
        unlocked: longestStreak >= 7,
      },
      {
        title: "Century Club",
        description: "Reach 100 total completions",
        progress: completedLogs.length,
        target: 100,
        unlocked: completedLogs.length >= 100,
      },
    ];

    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAchievements };
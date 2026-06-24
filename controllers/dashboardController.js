const Goal = require("../models/Goal");
const Habit = require("../models/Habit");
const SubGoal = require("../models/SubGoal");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalGoals = await Goal.countDocuments({ user: userId });
    const totalHabits = await Habit.countDocuments({ user: userId });
    const totalSubGoals = await SubGoal.countDocuments({ user: userId });

    const completedSubGoals = await SubGoal.countDocuments({
      user: userId,
      completed: true,
    });

    const completedHabits = await Habit.countDocuments({
      user: userId,
      completed: true,
    });

    const progress =
      totalSubGoals === 0
        ? 0
        : Math.round((completedSubGoals / totalSubGoals) * 100);

    res.json({
      totalGoals,
      totalHabits,
      totalSubGoals,
      completedSubGoals,
      completedHabits,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getDashboard };

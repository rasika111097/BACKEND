const HabitLog = require("../models/HabitLog");

// GET USER LOGS
const getHabitLogs = async (req, res) => {
  try {
    const logs = await HabitLog.find({
      user: req.user._id,
    }).populate("habit");

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE LOG
const createHabitLog = async (req, res) => {
  try {
    const { habit, completed } = req.body;

    const log = await HabitLog.create({
      user: req.user._id,
      habit,
      completed,
      date: new Date(),
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getHabitLogs,
  createHabitLog,
};
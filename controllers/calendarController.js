const HabitLog = require("../models/HabitLog");
const Habit = require("../models/Habit");

const getEvents = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user._id,
    });

    const logs = await HabitLog.find({
      user: req.user._id,
      completed: true,
    }).populate("habit");

    const groupedData = {};

    logs.forEach((log) => {
      const date = log.date.toISOString().split("T")[0];

      if (!groupedData[date]) {
        groupedData[date] = {
          habits: new Set(),
        };
      }

      groupedData[date].habits.add(
        log.habit._id.toString()
      );
    });

    const calendarData = Object.keys(groupedData).map(
      (date) => ({
        date,
        completed: groupedData[date].habits.size,
        total: habits.length,
      })
    );

    res.status(200).json(calendarData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createEvent = async (req, res) => {
  try {
    res.status(201).json({
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
};
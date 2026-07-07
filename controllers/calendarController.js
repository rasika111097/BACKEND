const HabitLog = require("../models/HabitLog");
const Habit = require("../models/Habit");

const getEvents = async (req, res) => {
  try {
    const logs = await HabitLog.find({
      user: req.user._id,
    }).populate("habit");
    


    const grouped = {};

    logs.forEach((log) => {
      if(!log.habit) return; 
      const d = new Date(log.date);

      const date =
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

      if (!grouped[date]) {
        grouped[date] = {
          total: new Set(),
          completed: new Set(),
        };
      }
      // always count selected habit
      grouped[date].total.add(log.habit._id.toString());

      // only completed habits
      if (log.completed) {
        grouped[date].completed.add(log.habit._id.toString());
      }
    });
    const calendarData = await Promise.all(
      Object.keys(grouped).map(async (date) => {
        const total = await Habit.countDocuments({
          user: req.user._id,
          selectedDate: date,
        });

        return {
          date,
          completed: grouped[date].completed.size,
          total,
        };
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
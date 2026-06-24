const HabitLog = require("../models/HabitLog");

const getAnalytics = async (req, res) => {
  try {
    const logs = await HabitLog.find({
      user: req.user._id,
    }).populate("habit");

    const today = new Date().toISOString().split("T")[0];

    const todayLogs = logs.filter(
      (log) =>
        new Date(log.date).toISOString().split("T")[0] === today
    );

    const labels = [];
    const counts = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const dateString = date.toISOString().split("T")[0];

      const completed = logs.filter(
        (log) =>
          new Date(log.date).toISOString().split("T")[0] ===
            dateString && log.completed
      ).length;

      labels.push(
        date.toLocaleDateString("en-US", {
          weekday: "short",
        })
      );

      counts.push(completed);
    }

    res.status(200).json({
      todayLogs,
      last7Days: {
        labels,
        counts,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};
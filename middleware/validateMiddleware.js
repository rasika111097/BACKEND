const validateGoal = (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Goal title is required",
    });
  }

  next();
};

const validateHabit = (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Habit title is required",
    });
  }

  next();
};

module.exports = {
  validateGoal,
  validateHabit,
};
const Goal = require("../models/Goal");

// GET GOALS
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user._id,
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE GOAL
const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user._id,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE GOAL
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    goal.title =
      req.body.title || goal.title;

    goal.description =
      req.body.description || goal.description;

    const updatedGoal = await goal.save();

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE GOAL
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    await goal.deleteOne();

    res.json({
      message: "Goal deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
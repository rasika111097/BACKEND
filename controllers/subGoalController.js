const SubGoal = require("../models/SubGoal");

// GET SUB GOALS BY GOAL ID
const getSubGoals = async (req, res) => {
  try {
    const subGoals = await SubGoal.find({
      goal: req.params.goalId,
      user: req.user._id,
    });

    res.json(subGoals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE SUB GOAL
const createSubGoal = async (req, res) => {
  try {
    const subGoal = await SubGoal.create({
      title: req.body.title,
      goal: req.body.goal,
      user: req.user._id,
    });

    res.status(201).json(subGoal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TOGGLE SUB GOAL
const toggleSubGoal = async (req, res) => {
  try {
    const subGoal = await SubGoal.findById(req.params.id);

    if (!subGoal) {
      return res.status(404).json({
        message: "Sub Goal not found",
      });
    }

    subGoal.completed = !subGoal.completed;

    await subGoal.save();

    res.json(subGoal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE SUB GOAL
const deleteSubGoal = async (req, res) => {
  try {
    const subGoal = await SubGoal.findById(req.params.id);

    if (!subGoal) {
      return res.status(404).json({
        message: "Sub Goal not found",
      });
    }

    await subGoal.deleteOne();

    res.json({
      message: "Sub Goal deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSubGoals,
  createSubGoal,
  toggleSubGoal,
  deleteSubGoal,
};
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getSubGoals,
  createSubGoal,
  toggleSubGoal,
  deleteSubGoal,
} = require("../controllers/subGoalController");

// GET ALL SUB GOALS FOR A GOAL
router.get("/:goalId", protect, getSubGoals);

// CREATE SUB GOAL
router.post("/", protect, createSubGoal);

// TOGGLE SUB GOAL
router.put("/:id", protect, toggleSubGoal);

// DELETE SUB GOAL
router.delete("/:id", protect, deleteSubGoal);

module.exports = router;
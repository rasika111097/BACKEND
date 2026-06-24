const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const{validateGoal} = require("../middleware/validateMiddleware");

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");



// GET ALL GOALS
router.get("/", protect, getGoals);

// CREATE GOAL
router.post("/", protect,validateGoal, createGoal);

// UPDATE GOAL
router.put("/:id", protect, validateGoal, updateGoal);

// DELETE GOAL
router.delete("/:id", protect, deleteGoal);

module.exports = router;
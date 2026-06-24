const mongoose = require("mongoose");

const subGoalSchema = new mongoose.Schema(
  {
    title: String,

    completed: {
      type: Boolean,
      default: false,
    },

    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SubGoal",
  subGoalSchema
);
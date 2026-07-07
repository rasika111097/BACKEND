const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subGoal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubGoal",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    frequency: {
      type: String,
      default: "Daily",
    },

    selectedDate: {
      type: String,
      required: true,
    },
    reminderTime: {
      type: String,
      default: "09:00",
    },

    color: {
      type: String,
      default: "#6366F1",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedDates: {
      type: [String],
      default: [],
    },

    streak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    totalCompletions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habit", habitSchema);
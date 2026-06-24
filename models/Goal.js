const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
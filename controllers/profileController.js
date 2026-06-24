const Goal = require("../models/Goal");
const Habit = require("../models/Habit");
const User = require("../models/User");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    const totalGoals = await Goal.countDocuments({ user: user._id });
    const totalHabits = await Habit.countDocuments({ user: user._id });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      totalGoals,
      totalHabits,
      joinedAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROFILE (SAFE VERSION)
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ Email update removed (safe auth)
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.gender = req.body.gender || user.gender;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      gender: updatedUser.gender,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, requireRole } = require("../middleware/authMiddleware");

// @route   GET /api/users/agents
// @desc    Get all users who possess the 'agent' role designation (Admin Only)
router.get("/agents", protect, requireRole("admin"), async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" })
      .select("name email role createdAt")
      .sort("name");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/users
// @desc    Create a new user (Admin Only)
router.post("/", protect, requireRole("admin"), async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password, role: role || "agent" });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

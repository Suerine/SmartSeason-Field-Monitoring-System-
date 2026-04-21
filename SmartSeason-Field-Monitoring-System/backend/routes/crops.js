const express = require("express");
const router = express.Router();
const Crop = require("../models/Crop");
const { protect, requireRole } = require("../middleware/auth");

// GET /api/crops
router.get("/", protect, async (req, res) => {
  try {
    const crops = await Crop.find().sort("name");
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/crops — admin only
router.post("/", protect, requireRole("admin"), async (req, res) => {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).json(crop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

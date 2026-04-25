const express = require("express");
const router = express.Router();
const Crop = require("../models/Crop");
const { protect, requireRole } = require("../middleware/authMiddleware");

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

// GET /api/crops/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/crops/:id
router.put("/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json(crop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/crops/:id
router.delete("/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json({ message: "Crop deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

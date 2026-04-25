const express = require("express");
const router = express.Router();
const Field = require("../models/Field");
const Crop = require("../models/Crop");
const { protect, requireRole } = require("../middleware/authMiddleware");
const { getFieldStatus, getStageInfo } = require("../utils/fieldStatus");

const withStatus = (field) => {
  if (!field) return null;
  const fieldObj = field.toObject();

  // We pass the populated cropType to the utility to access growthStages
  fieldObj.status = getFieldStatus(field, field.cropType);
  
  // Attach full stage info for frontend progress bars and alerts
  fieldObj.stageInfo = getStageInfo(field);
  
  return fieldObj;
};

/**
 * HELPER: populateField
 * Reusable utility to join Field with Agent and Crop data.
 * This is CRITICAL for the status logic to see durations/categories.
 */
const populateField = (query) =>
  query.populate("assignedAgent", "name email").populate("cropType");

// @route   GET /api/fields
// @desc    Get all fields (Admin sees all, Agent sees assigned)
router.get("/", protect, async (req, res) => {
  try {
    const query =
      req.user.role === "admin" ? {} : { assignedAgent: req.user._id };
    const fields = await populateField(Field.find(query).sort("-createdAt"));

    res.json(fields.map(withStatus));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/fields/:id
// @desc    Get a single field by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const field = await populateField(Field.findById(req.params.id));
    if (!field) return res.status(404).json({ message: "Field not found" });

    res.json(withStatus(field));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/fields
// @desc    Admin only: Create a new field and assign an agent
router.post("/", protect, requireRole("admin"), async (req, res) => {
  try {
    const created = await Field.create(req.body);

    const field = await populateField(Field.findById(created._id));

    res.status(201).json(withStatus(field));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/fields/:id
// @desc    Update field (Agents: notes/stage only | Admins: full edit)
router.put("/:id", protect, async (req, res) => {
  try {
    let field = await populateField(Field.findById(req.params.id));
    if (!field) return res.status(404).json({ message: "Field not found" });

    // AGENT LOGIC: Restricted updates
    if (req.user.role === "agent") {
      const isAssigned =
        field.assignedAgent &&
        field.assignedAgent._id.toString() === req.user._id.toString();
      if (!isAssigned) {
        return res.status(403).json({
          message: "Access denied: This field is not assigned to you.",
        });
      }

      const { currentStage, note } = req.body;
      if (currentStage) field.currentStage = currentStage;

      // If a note is provided, we push a new entry into the updates history
      if (note) {
        field.updates.push({
          stage: currentStage || field.currentStage,
          note,
          updatedBy: req.user._id,
        });
      }
    }
    // ADMIN LOGIC: Full control
    else {
      const { name, cropType, plantingDate, currentStage, assignedAgent, note } =
        req.body;
      if (name) field.name = name;
      if (cropType) field.cropType = cropType;
      if (plantingDate) field.plantingDate = plantingDate;
      if (currentStage) field.currentStage = currentStage;
      if (assignedAgent !== undefined)
        field.assignedAgent = assignedAgent || null;
        
      if (note) {
        field.updates.push({
          stage: currentStage || field.currentStage,
          note,
          updatedBy: req.user._id,
        });
      }
    }

    await field.save();

    // Re-populate to reflect changes and calculate the new status
    const updatedField = await populateField(Field.findById(field._id));
    res.json(withStatus(updatedField));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/fields/:id
// @desc    Admin only: Remove a field
router.delete("/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    const field = await Field.findByIdAndDelete(req.params.id);
    if (!field) return res.status(404).json({ message: "Field not found" });

    res.json({ message: "Field deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * METADATA ROUTES
 * Used to populate dropdowns in the frontend forms
 */

// Get list of agents for the "Assign Agent" dropdown
router.get("/meta/agents", protect, requireRole("admin"), async (req, res) => {
  try {
    const User = require("../models/User");
    const agents = await User.find({ role: "agent" }).select("name email");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get list of crops for the "Crop Type" dropdown
router.get("/meta/crops", protect, async (req, res) => {
  try {
    const crops = await Crop.find().sort("name");
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

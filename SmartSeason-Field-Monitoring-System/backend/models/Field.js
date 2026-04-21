const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema(
  {
    stage: { type: String, required: true },
    note: { type: String },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const fieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cropType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
      required: true,
    },
    plantingDate: { type: Date, required: true },
    currentStage: {
      type: String,
      default: "Planted",
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updates: [updateSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Field", fieldSchema);

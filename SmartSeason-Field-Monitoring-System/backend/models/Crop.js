const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    optimalConditions: {
      temperature: { type: String },
      humidity: { type: String },
      soilType: { type: String },
    },
    growthStages: [
      {
        stageName: { type: String }, // e.g., "Flowering" or "Tasseling"
        category: {
          type: String,
          enum: ["Planted", "Growing", "Ready", "Harvested"], // The system's 4 core buckets
          required: true,
        },
        durationDays: { type: Number },
        careInstructions: { type: String },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Crop", cropSchema);

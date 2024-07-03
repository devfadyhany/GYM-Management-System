const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetedMuscles: {
    type: [String],
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports = mongoose.model("Equipment", equipmentSchema);

const mongoose = require("mongoose");

const checkoutsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  numOfMonths: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Checkouts", checkoutsSchema);

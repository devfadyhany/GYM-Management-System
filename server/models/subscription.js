const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  coachId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  planType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  endAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);

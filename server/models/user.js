const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isCoach: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  assignedCoachId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  activeSubscription: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Subscription",
  },
  numOfClients: {
    type: Number,
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model("User", userSchema);

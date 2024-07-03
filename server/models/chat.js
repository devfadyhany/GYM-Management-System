const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
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
  messages: {
    type: [String],
    required: true,
  },
  lastMessageID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Message",
    required: true,
  },
});

module.exports = mongoose.model("Chat", chatSchema);

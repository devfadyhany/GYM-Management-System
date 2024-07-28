const mongoose = require("mongoose");
const Message = require("./message");

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
    type: [Message.schema],
  },
});

module.exports = mongoose.model("Chat", chatSchema);

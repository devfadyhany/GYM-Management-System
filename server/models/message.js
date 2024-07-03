const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  chatId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Chat",
    required: true,
  },
  sent_at: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Message", messageSchema);

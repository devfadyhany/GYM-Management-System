const chat = require("../models/chat");
const Message = require("../models/message");
const User = require("../models/user");

const getUserChats = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    let result;

    if (user.isCoach) {
      result = await chat.find({ coachId: id });
    } else {
      result = await chat.findOne({ clientId: id });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getChatMessages = async (req, res) => {
  const chatId = req.params.id;

  try {
    const result = await chat.findById(chatId).select("messages -_id");

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendMessage = async (req, res) => {
  const text = req.body.text;
  const chatId = req.body.chatId;
  const senderId = req.body.senderId;

  try {
    const currentChat = await chat.findById(chatId);

    const item = new Message({ text, chatId, senderId });
    currentChat.messages.push(item);
    currentChat.save();

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserChats, getChatMessages, sendMessage };

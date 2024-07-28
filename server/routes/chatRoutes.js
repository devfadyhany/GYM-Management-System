const { getUserChats, getChatMessages, sendMessage } = require('../controllers/chatController');

const router = require('express').Router();

router.get("/:id", getUserChats);
router.get("/messages/:id", getChatMessages);
router.post("/", sendMessage);

module.exports = router;
const express = require("express");
const router = express.Router();
const {
    getConversation,
    postMessage,
    postInitialMessage,
    handleChatInteraction
} = require("../controllers/chat-controller");

// GET Conversations
// router.route("/conversation/:userId").get(getConversation);

// POST message to API
router.route("/send").post(handleChatInteraction);

// POST initial message to API
// router.route("/send/inital").post(postInitialMessage);

module.exports = router;
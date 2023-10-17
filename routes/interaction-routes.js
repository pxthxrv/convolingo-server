const express = require("express");
const router = express.Router();
const {
    logInteraction,
    getInteraction,
    handleChatInteraction
} = require("../controllers/interaction-controller");

// POST | Log interactions
router.route("/").post(handleChatInteraction);

// GET user usage
router.route("/history/:userId").get(getInteraction);

module.exports = router;
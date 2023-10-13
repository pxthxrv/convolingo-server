const express = require("express");
const router = express.Router();
const {
    logInteraction,
    getInteraction,
} = require("../controllers/interaction-controller");

// POST | Log interactions
router.route("/").post(logInteraction);

// GET user usage
router.route("/:interactionId").get(getInteraction);

module.exports = router;
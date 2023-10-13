const express = require("express");
const router = express.Router();
const {
    recordUsage,
    getUserUsage,
} = require("../controllers/usage-controller");

// POST | Record usage 
router.route("/record").post(recordUsage);

// GET user usage
router.route("/user/:userId").get(getUserUsage);

module.exports = router;
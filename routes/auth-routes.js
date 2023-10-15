const express = require("express");
const router = express.Router();
const {
    userRegistration,
    userLogin,
} = require("../controllers/auth-controller");

// POST user registration
router.route("/signup").post(userRegistration);
// POST user login
router.route("/login").post(userLogin);

module.exports = router;

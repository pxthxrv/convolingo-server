const express = require("express");
const router = express.Router();
const {
    userRegistration,
    userLogin,
} = require("../controllers/user-controller");

// POST user registration
router.route("/register").post(userRegistration);

// POST user login
router.route("/login").post(userLogin);

module.exports = router;

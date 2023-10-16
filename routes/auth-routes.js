const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/authMiddleware");
const {
    checkAuth,
    userRegistration,
    userLogin,
    userLogout
} = require("../controllers/auth-controller");

// GET | Validate Token
router.get("/check", validateToken, checkAuth);
// POST user registration
router.post("/signup", userRegistration);
// POST user login
router.post("/login", userLogin);
// POST user logout
router.post("/logout", userLogout);

module.exports = router;

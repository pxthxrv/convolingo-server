const express = require("express");
const router = express.Router();
const {
    getDefinition,
    addDefinition,
} = require("../controllers/translation-controller");

// POST | Record usage 
router.route("/").post(getDefinition);
// GET user usage
router.route("/:vocabId").get(addDefinition);

module.exports = router;
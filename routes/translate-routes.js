const express = require("express");
const router = express.Router();
const {
    getDefinition,
    addDefinition,
} = require("../controllers/translate-controller");

// POST | Record definition 
router.route("/").post(addDefinition);

// GET vocab definition
// router.route("/:vocabId").get(getDefinition);

module.exports = router;
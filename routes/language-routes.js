const express = require("express");
const router = express.Router();

const {
    getAllLanguages,
    getLanguageByISOCode
} = require("../controllers/language-controller");

// GET all languages
router.route("/").get(getAllLanguages);

// GET language by code
router.route("/:iso_code").get(getLanguageByISOCode); 

module.exports = router;
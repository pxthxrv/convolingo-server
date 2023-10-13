const express = require("express");
const router = express.Router();
const {
    createLibrary,
    addWordToLibrary,
    deleteWordFromLibrary,
    getDefaultLibraries,
    getUserLibraries
} = require("../controllers/library-controller");

// POST library 
router.route("/").post(createLibrary);

// POST / Add word to Library | DELETE word from library
router.route("/:libraryId/add/:vocabId")
    .post(addWordToLibrary)
    .delete(deleteWordFromLibrary);

// GET Default Libraries
router.route("/default").get(getDefaultLibraries);

// GET User Libraries
router.route("/user/:userId").get(getUserLibraries);

module.exports = router;
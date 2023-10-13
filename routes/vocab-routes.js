const express = require("express");
const router = express.Router();
const {
    addVocab,
    getVocab,
    updateVocab,
    deleteVocab,
} = require("../controllers/vocab-controller");

// POST vocab 
router.route("/add").post(addVocab);

// GET vocab
router.route("/user/:userId").get(getVocab);

// PUT/Update vocab | DELETE Vocab
router.route("/:vocabId/update")
    .put(updateVocab)
    .delete(deleteVocab);

module.exports = router;
const knex = require("knex")(require("../knexfile"));

const addVocab = (req, res) => {
    const {
      vocab,
      language,
      definition,
      definition_language,
      word_class,
      pronunciation,
      used_in_a_sentence,
      date_added,
      num_of_saves,
    } = req.body;
    // required fields
    if (!vocab || !language || !definition || !definition_language) {
      return res.status(400).json({ error: "Required fields are missing from addVocab" });
    }
    // Optional fields are undefined
    const vocabData = {
      vocab,
      language,
      definition,
      definition_language,
      word_class: word_class || undefined,
      pronunciation: pronunciation || undefined,
      used_in_a_sentence: used_in_a_sentence || undefined,
      date_added: date_added ? new Date(date_added) : undefined,
      num_of_saves: num_of_saves || undefined,
    };
  
    // inser validation and authentication.
  
    knex("Vocab")
      .insert(vocabData)
      .returning("*")
      .then((newVocab) => {
        res.status(201).json(newVocab[0]).message("New vocab created"); 
      })
      .catch((error) => {
        console.error("Error creating vocabulary:", error);
        res.status(500).json({ error: "Failed to create vocabulary" });
      });
  };

const getVocabByUserId = (req, res) => {
    const userId = req.params.userId;
  
    knex
      .select("v.*")
      .from("Vocab as v")
      .join("UserLibrary as ul", "v.id", "=", "ul.vocab_id")
      .where("ul.user_id", userId)
      .then((vocabularies) => {
        if (vocabularies.length === 0) {
          return res.json([]);
        }
        res.status(200).json(vocabularies);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  };

  module.exports = {
    addVocab,
    getVocabByUserId,
  };
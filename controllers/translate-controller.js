const knex = require("knex")(require("../knexfile"));
const deepl = require('deepl-node');
const { DEEPL_KEY } = require("../config/configManager");

const authKey = DEEPL_KEY;
const translator = new deepl.Translator(authKey);

const addDefinition = async (req, res) => {
  const {
    vocab, 
    language, 
    definition_language,
  } = req.body;

  if (!vocab || !language || !definition_language) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    // Get translation
    const translationResult = await translator.translateText(vocab, language, definition_language);
    // reurn error
    if (!translationResult.text) {
      return res.status(500).json({ error: "Failed to translate the vocab" });
    }
    // Prepare data
    const translationData = {
      vocab: vocab, 
      language: language,  
      definition: translationResult.text,
      definition_language: definition_language,  
      word_class: undefined,
      pronunciation: undefined,
      used_in_a_sentence: undefined,
      date_added: new Date(),
      num_of_saves: 0,
    };

    // Insert response to database in vocab table
    const [newTranslation] = await knex("Vocab")
      .insert(translationData)
      .returning("*");
      
    res.status(201).json({
      originalVocab: vocab,
      translation: translationResult.text,
      translationRecord: newTranslation
    });
  } catch (error) {
    console.error("Error translating the vocab:", error);
    res.status(500).json({ error: "Failed to translate the vocab" });
  }
};

module.exports = {
  addDefinition,
};
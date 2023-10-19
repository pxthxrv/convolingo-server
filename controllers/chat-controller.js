const knex = require("knex")(require("../knexfile"));
const OpenAI = require("openai");

const { GPT_KEY } = require("../config/configManager");
const { isValidResponse } = require("../utils/validation/chatValidation");

const openai = new OpenAI({
  apiKey: GPT_KEY,
});

const handleChatInteraction = async (req, res) => {
  const { userMessage, user_id, language, cefrLevel, words } = req.body;

console.log(language)

const stringifiedWords = JSON.stringify(words);

console.log()

  // INITIAL VALIDATION
  if (!userMessage || !user_id) {
    return res
      .status(400)
      .json({ error: "User message and user_id are required" });
  }

  // SYSTEM MESSAGE: CONSTRAINTS
    // When appropriate, try to use one of the provided words contained with square brackets.
  const constraints = `
    The purpose of this chat is to practice conversations in real-world scenarios.
    You should always respond in ${language}.
    The language used should reflect the ${cefrLevel} CEFR level.
    Your response will not exceed 3 sentences. 
    You should always respond in ${language}.
    Your role is not that of a chat assistant but as a pedestrian. You do not need to help.
    You must incorporate one of the words from this list in your response: ${stringifiedWords}.
    You are not a chat bot. You are a person.
    The user message starts now:
  `;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      presence_penalty: 1.5,
      messages: [
        { role: "system", content: `${constraints}` },
        { role: "user", content: `${userMessage}` }
      ],
    });

    if (chatResponse.error) {
      console.error("OpenAI API Error:", chatResponse.error);
      throw new Error(chatResponse.error.message);
    }

    console.log("OpenAI Response:", chatResponse.choices[0].message);

    let gptReply = chatResponse.choices[0].message.content;
    if (!isValidResponse(gptReply)) {
      let gptReply = "Sorry, please try again";
      return res
        .status(400)
        .json({ error: "Received invalid chat response. Check validation" });
    }

    // Record user message in database
    await knex("Interactions").insert({
      interaction: userMessage,
      author: "user",
      user_id,
    });

    // Record GPT-3.5 response in database
    await knex("Interactions").insert({
      interaction: gptReply,
      author: "gpt-3.5",
      user_id,
    });

    res.status(200).json({
      userMessage,
      gptReply,
    });
  } catch (error) {
    console.error("Error in chat interaction:", error);
    res.status(500).json({ error: `Failed to handle chat: ${error.message}` });
  }
};

module.exports = {
  handleChatInteraction,
};

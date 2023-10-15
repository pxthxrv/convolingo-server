const knex = require("knex")(require("../knexfile"));
const OpenAI = require('openai');

const { GPT_KEY } = require("../config/configManager");
const { isValidResponse } = require("../utils/validation/chatValidation")

// const language = "German"; // move to front end

// const constraints = `Your response should be a maximum of 3 sentences. \
//                       Your response can only be in ${language}. \
//                       Your response can additionally include a correction to my grammar. \
//                      This correction should be with exact punctuation in the following format: \
//                       Did you mean: 'The correction' \
//                       If you included a correction,  also include a response to the correction. \
//                       the correction should be the first portion of the message. Then there should be an empty line, followed by your response to the correction. \
//                       Your response can only be in ${language}. \
//                       Below is my message for the chat: `;

const openai = new OpenAI({
  apiKey: GPT_KEY
});

const handleChatInteraction = async (req, res) => {
    const { userMessage, user_id } = req.body;
  
    if (!userMessage || !user_id) {
      return res.status(400).json({ error: "User message and user_id are required" });
    }
  
    try {
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        // messages: [{ role: "user", content: `${constraints}${userMessage}` }],
        messages: [{ role: "user", content: `${userMessage}` }],
      });
  
      const gptReply = chatResponse.choices[0].message.content;
      if (!isValidResponse(gptReply)) {
        return res.status(400).json({ error: "Received invalid chat response. Check validation" });
      }

      // Record user message in database
      await knex('Interactions').insert({
        interaction: userMessage,
        author: 'user',
        user_id
      });
  
      // Record GPT-3.5 response in database
      await knex('Interactions').insert({
        interaction: gptReply,
        author: 'gpt-3.5',
        user_id
      });
  
      res.status(200).json({
        userMessage,
        gptReply
      });
  
    } catch (error) {
      console.error("Error in chat interaction:", error);
      res.status(500).json({ error: "Failed to process chat" });
    }
  };

module.exports = {
  handleChatInteraction
}
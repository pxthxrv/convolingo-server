const knex = require("knex")(require("../knexfile"));
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.API_GPT_KEY
});

const getInteraction = async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
  }

  try {
      const chatHistory = await knex('Interactions')
          .where('user_id', userId)
          .orderBy('id', 'desc')
          .limit(30);

      res.status(200).json(chatHistory);
  } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ error: "Failed to fetch chat history." });
  }
};

const handleChatInteraction = async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "User message is required" });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const gptReply = chatResponse.choices[0].message.content;

    // Record user message in database
    await knex('Interactions').insert({
      interaction: userMessage,
      author: 'user'
    });

    // Record GPT-3 response in database
    await knex('Interactions').insert({
      interaction: gptReply,
      author: 'gpt-3'
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

export {
  getInteraction,
  handleChatInteraction
};
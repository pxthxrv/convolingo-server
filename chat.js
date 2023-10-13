import { config } from "dotenv";
config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.API_GPT_KEY
});

import { gettingStarted } from "./prompts/gettingstarted.js";

const chatCompletion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: `${gettingStarted}` }],
});

const newMessage = "What does geht mean?";

const newChat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${newMessage}` }],
  });

console.log(chatCompletion.choices[0].message.content);

console.log(newChat.choices[0].message.content);
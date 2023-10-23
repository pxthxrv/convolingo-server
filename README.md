# ConvoLingo: An Interactive Language Learning App
Front-End: https://github.com/pxthxrv/convolingo-client

## Table of Contents
- [Description](#description)
- [Problem Statement](#problem-statement)
- [User Profile](#user-profile)
- [Features and Use Cases](#features-and-use-cases)
- [Tech Stack and APIs](#tech-stack-and-apis)

## Description
ConvoLingo is an interactive language learning application designed to aid users in practicing conversational language skills through uniquely generated conversations and contexts.

Key Features include:
- Flash card exercises
- Interactive chat
- Personal dictionary

## Problem Statement
While many language learning resources advocate learning "like a child", this approach can be discouraging to many adults. ConvoLingo offers a pragmatic and engaging way to develop conversational skills tailored to real-world situations and individual needs. Additionally, it aids in vocabulary retention and offers cultural context.

Whether you're preparing for a trip to Mexico's Oaxaca region or just want to chat about hobbies, ConvoLingo can provide vocabulary specific to your needs.

## User Profile
Targeted mainly at adults and young adults, ConvoLingo is for those who:
- Seek an engaging method to learn a new language
- Aim to refine and develop existing language skills
- Find traditional methods of language learning less stimulating

## Features and Use Cases

### User Registration and Profile:
- Create an account 
- Set language preferences
- Specify current language level

### Flash Card System:
- Introduce vocabulary from the Common European Framework of Reference for Languages (CEFR)
- Vocabulary items from CEFR are auto-added to personal dictionaries

### Interactive Chat:
- Engage in chats based on user's language proficiency
- Dynamic chat responds to newly added vocabulary in user's dictionary

### Translate Word / Phrase:
- Translate a selected word/phrase
- Check if word/phrase is in the database
- Retrieve supplementary information like word class, pronunciation, usage in a sentence
- Option to save word to user's personal library

### Metric Tracking / Scoring: 
- Track successful uses of words
- Note the date of the last review
- Determine a relationship between metrics and scoring
- Track word usage frequency

### Personal Dictionary:
- Add text highlights to the dictionary
- Categorize words based on properties such as setting, theme, etc.
- Users can flag words for further review

### Voice Recognition:
- Implement speech recognition technology for pronunciation practice
- Convert speech to text and vice versa

## Tech Stack and APIs

**Front-end**: React, JSX, Sass  
**Back-end**: Node.js, Express.js, axios  
**Database**: MYSQL  

**APIs**:
- Chat GPT API: For generating interactive chats (Text-to-Text) [Required]
- DeepL API: For translation needs (Text-to-Translation) [Required]

---

Feel free to contribute and raise issues. Happy learning!
const dotenv = require('dotenv');
dotenv.config();

const configurations = {
    GPT_KEY: process.env.API_GPT_KEY,
    DEEPL_KEY: process.env.API_DEEPL_KEY,
    PORT: process.env.PORT || 5050,
};

module.exports = configurations;
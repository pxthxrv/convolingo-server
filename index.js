const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");

const { PORT } = require("./config/configManager");
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// USER TABLE
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

// LANGUAGES TABLE
const languageRoutes = require('./routes/language-routes');
app.use('/languages', languageRoutes);

// VOCAB TABLE
const vocabRoutes = require('./routes/vocab-routes');
app.use('/vocab', vocabRoutes);

// LIBRARY Table
// const libraryRoutes = require('./routes/library-routes.js');
// app.use('/library', libraryRoutes);

// USAGE TABLE
// const usageRoutes = require('./routes/usage-routes')
// app.use('/usage', usageRoutes);

// INTERACTIONS TABLE
// const interactionRoutes = require('./routes/interactions-routes');
// app.use('/interactions', interactionRoutes);

// CHAT TABLE
const chatRoutes = require('./routes/chat-routes');
app.use('/chat', chatRoutes);

// TRANSLATION TABLE
const translateRoutes = require('./routes/translate-routes');
app.use('/translate', translateRoutes);

// LISTEN TO PORT
app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
})
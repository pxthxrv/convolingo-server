const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5050;

// USER TABLE
const userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);
// VOCAB TABLE
const vocabRoutes = require('./routes/vocab-routes');
app.use('/vocab', vocabRoutes);
// LIBRARY Table
const libraryRoutes = require('./routes/library-routes.js');
app.use('/library', libraryRoutes);
// USAGE TABLE
const usageRoutes = require('./routes/usage-routes')
app.use('/usage', usageRoutes);
// INTERACTIONS TABLE
const interactionRoutes = require('./routes/interactions-routes');
app.use('/interactions', interactionRoutes);
// CHAT TABLE
const chatRoutes = require('routes/chat-routes');
app.use('/chat', chatRoutes);
// TRANSLATION TABLE
const translateRoutes = require('routes/translate-routes');
app.use('/translate', translateRoutes);

// LISTEN TO PORT
app.listen(PORT, () => {
    console.log(`running at http://localhost${PORT}`);
})
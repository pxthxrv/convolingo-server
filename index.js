const express = require("express");
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const { PORT } = require("./config/configManager");
const app = express();

app.use(cors({
    origin: "http://localhost:5173", // front end port
    credentials: true
}));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// AUTHORIZE
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

// USER TABLE
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

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
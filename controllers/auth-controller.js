const knex = require("knex")(require("../knexfile"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT;

const checkAuth = async (req, res) => {
    try {
        const userData = await knex('Users')
            // .join('Languages', 'Users.target_language', '=', 'Languages.id')
            // .select('Users.*', 'Languages.display_name as target_language_display')
            .where('Users.id', req.user.id)
            .first();

        if (userData) {
            const { difficulty, level, password_hash, ...filteredUser } = userData;
            res.json({ isAuthenticated: true, user: filteredUser });
        } else {
            res.status(404).json({ error: "User not found" });
            console.log(error);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
        console.log(error);
    }
};

const userRegistration = async (req, res) => {
    const { username, password } = req.body;
    // check if username already exists
    const existingUser = await knex('Users').where('username', username).first();
    if (existingUser) {
        return res.status(400).json({ error: 'This username already exists. Please choose a different one.' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const result = await knex('Users').insert({
            username,
            password_hash: passwordHash
        }).returning('id'); 

        const userId = result[0];

            // Generate token for sign in
    const token = jwt.sign({ id: userId, username: username }, JWT_SECRET, { expiresIn: '1h' });


        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour logged in
        });

        res.status(201).json({ message: 'User registration successful!', user_id: userId });
    } catch (error) {
        res.status(500).json({ error: 'User registration has failed.' });
    }
};

const userLogin = async (req, res) => {
    const { username, password } = req.body;

    const user = await knex('Users').where('username', username).first();

    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate token for sign in
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
    });

    res.json({ token, user: { username: user.username, user_id: user.id } });
};

const userLogout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    checkAuth,
    userRegistration,
    userLogin,
    userLogout
};
const knex = require("knex")(require("../knexfile"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT; // Consider using environment variables for security

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
        await knex('Users').insert({
            username,
            password_hash: passwordHash
        });
        res.status(201).json({ message: 'User registration successful!' });
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
    res.json({ token, user });
};


module.exports = {
    userRegistration,
    userLogin,
};
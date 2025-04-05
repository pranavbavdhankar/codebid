const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(400).send('Invalid username or password');

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).send('Incorrect password');

        res.send(`Welcome, ${user.first_name || user.username}`);
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');

router.post('/create-account', async (req, res) => {
    const { first_name, last_name, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (first_name, last_name, username, password, is_account_created) VALUES (?, ?, ?, ?, ?)`;

        db.query(sql, [first_name, last_name, username, hashedPassword, true], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error or username already exists');
            }
            res.send('Account created successfully');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;

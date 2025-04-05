const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const path = require('path');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(400).send('Invalid username or password');

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).send('Incorrect password');
        req.session.user = user;
        res.redirect('/home');
    });
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

router.get("/home", (req, res) => {
    res.render('home', { user: req.session.user });
});

router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login_page.html');
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

router.get('/create-blog', (req, res) => {
    res.sendFile(__dirname + '/public/creator-edit.html');
});


router.get('/subscriptions', (req, res) => {
    res.sendFile(__dirname + '/public/subscriptionmodel.html');
});


router.get('/explore', (req, res) => {
    res.sendFile(__dirname + '/public/explore.html');
});

router.get('/payment', (req, res) => {
    res.sendFile(__dirname + '/public/payment.html');
});

module.exports = router;

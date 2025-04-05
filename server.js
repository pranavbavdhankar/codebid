const express = require('express');
const bodyParser = require('body-parser');
const createAccountRoute = require('./createAccount');
const loginRoute = require('./login');
const freeRoutes = require('./freeRoutes');
const path = require('path');

const session = require('express-session');
const app = express();
const PORT = 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add this middleware before your routes
app.use(session({
    secret: '123', // change to a secure key in production
    resave: false,
    saveUninitialized: true
}));





app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); 

app.use(createAccountRoute);
app.use(loginRoute);
app.use(freeRoutes);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

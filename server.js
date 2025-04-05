const express = require('express');
const bodyParser = require('body-parser');
const createAccountRoute = require('./createAccount');
const loginRoute = require('./login');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); 

app.use(createAccountRoute);
app.use(loginRoute);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

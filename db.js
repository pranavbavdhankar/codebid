const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_mysql_password',
    database: 'user_auth'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
});

module.exports = db;

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Peyton3232!',
    database: 'business_db',
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ' + error.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = { connection };






//Grabs the npm packager for MySQL and the .env file
const mysql = require('mysql2');

//Creates a connection the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Peyton3232!',
    database: 'business_db',
});

//Connect to the database
connection.connect((error) => {
    if (error) {
        //Shows the error if not able to connect
        console.error('Error connecting to the database: ' + error.stack);
        return;
    }
    //Shows the database is connected and the id number
    console.log('Connected to the database as id ' + connection.threadId);
});

//exports the connection object for other files to use
module.exports = { connection };






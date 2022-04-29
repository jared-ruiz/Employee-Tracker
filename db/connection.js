const mysql = require ('mysql2');

//connect to database
const db = mysql.createConnection({
    host: 'localhost',
    //mysql username
    user: 'root',
    //your mysql password
    password: '',
    //database name
    database: 'employee_database'
});

//export module
module.exports = db;
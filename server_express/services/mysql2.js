// Export mysql2 promise pool connection ------------------------------------------------------------
const mysql2 = require('mysql2');
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = process.env

// Create the connection pool
const pool = mysql2.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
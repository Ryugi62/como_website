const mysql = require("mysql");
const util = require("util");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(async (err) => {
  if (err) {
    throw err;
  }

  console.log("MySQL is Connected!");

  // Check if users table exists, and create it if not
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        isSubscribed TINYINT(1) NOT NULL DEFAULT 0,
        subscriptionProduct VARCHAR(255),
        subscriptionStartDate DATE,
        subscriptionEndDate DATE,
        subscriptionAmount DECIMAL(10, 2),
        totalPaidAmount DECIMAL(10, 2),
        referralLink VARCHAR(255),
        isAdmin TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("users table is ready.");
  } catch (error) {
    throw error;
  }
});

// Promisify the query function
db.query = util.promisify(db.query);

module.exports = db;

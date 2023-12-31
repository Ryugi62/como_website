const mysql = require("mysql");
const util = require("util");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL is Connected!");
});

// Promisify the query function
db.query = util.promisify(db.query);

module.exports = db;

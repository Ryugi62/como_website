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
    console.error("Error connecting to MySQL:", err);
    throw err;
  }

  console.log("MySQL is Connected!");

  const tables = {
    Bots: `CREATE TABLE IF NOT EXISTS Bots (
            BotID INT AUTO_INCREMENT PRIMARY KEY,
            BotName VARCHAR(255) NOT NULL
          )`,
    TradeTypes: `CREATE TABLE IF NOT EXISTS TradeTypes (
            TradeTypeID INT AUTO_INCREMENT PRIMARY KEY,
            TypeName VARCHAR(255) NOT NULL
          )`,
    Durations: `CREATE TABLE IF NOT EXISTS Durations (
            DurationID INT AUTO_INCREMENT PRIMARY KEY,
            Duration VARCHAR(255) NOT NULL
          )`,
    Grades: `CREATE TABLE IF NOT EXISTS Grades (
            GradeID INT AUTO_INCREMENT PRIMARY KEY,
            GradeName VARCHAR(255) NOT NULL
          )`,
    PlanDetails: `CREATE TABLE IF NOT EXISTS PlanDetails (
            PlanDetailID INT AUTO_INCREMENT PRIMARY KEY,
            BotID INT,
            TradeTypeID INT,
            DurationID INT,
            GradeID INT,
            FOREIGN KEY (BotID) REFERENCES Bots(BotID),
            FOREIGN KEY (TradeTypeID) REFERENCES TradeTypes(TradeTypeID),
            FOREIGN KEY (DurationID) REFERENCES Durations(DurationID),
            FOREIGN KEY (GradeID) REFERENCES Grades(GradeID)
          )`,
    Prices: `CREATE TABLE IF NOT EXISTS Prices (
            PriceID INT AUTO_INCREMENT PRIMARY KEY,
            PlanDetailID INT,
            Price DECIMAL(10, 2),
            FOREIGN KEY (PlanDetailID) REFERENCES PlanDetails(PlanDetailID) ON DELETE CASCADE
          )`,
    Features: `CREATE TABLE IF NOT EXISTS Features (
            FeatureID INT AUTO_INCREMENT PRIMARY KEY,
            PlanDetailID INT,
            FeatureName VARCHAR(255),
            FOREIGN KEY (PlanDetailID) REFERENCES PlanDetails(PlanDetailID) ON DELETE CASCADE
          )`,
    Users: `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            isSubscribed TINYINT(1) NOT NULL DEFAULT 0,
            totalPaidAmount DECIMAL(10, 2),
            referralLink VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`,
    UserSubscriptions: `CREATE TABLE IF NOT EXISTS user_subscriptions (
            subscriptionID INT AUTO_INCREMENT PRIMARY KEY,
            userID INT,
            planDetailID INT,
            subscriptionStartDate DATE,
            subscriptionEndDate DATE,
            subscriptionAmount DECIMAL(10, 2),
            FOREIGN KEY (userID) REFERENCES users(id),
            FOREIGN KEY (planDetailID) REFERENCES PlanDetails(PlanDetailID)
          )`,

    Admins: `CREATE TABLE IF NOT EXISTS admins (
            adminID INT AUTO_INCREMENT PRIMARY KEY,
            userID INT,
            FOREIGN KEY (userID) REFERENCES users(id)
          )`,
  };

  for (const [tableName, createQuery] of Object.entries(tables)) {
    try {
      await db.query(createQuery);
      console.log(`${tableName} table is ready.`);
    } catch (error) {
      console.error(`Error creating ${tableName} table:`, error);
      // 오류가 발생했을 때 필요한 추가 처리를 여기에 추가합니다.
    }
  }
});

// Promisify the query function
db.query = util.promisify(db.query);

module.exports = db;

const fs = require("fs");
const path = require("path");

function log(type, message, details) {
  const timestamp = new Date().toISOString();
  const detailString = JSON.stringify(details, null, 4); // 세부 정보를 보기 좋게 포맷팅
  const logMessage = `${timestamp}\n${type.toUpperCase()}\n${message}\nDetails: ${detailString}\n\n`;
  fs.appendFileSync(path.join(__dirname, "logs/logs.txt"), logMessage);
}

module.exports = { log };

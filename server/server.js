require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/dist"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// log 출력
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API 미들웨어 설정
app.use("/api/users", require("./routes/users"));
app.use("/api/admins", require("./routes/admins"));
app.use("/api/bots", require("./routes/bots"));
app.use("/api/trade-types", require("./routes/tradeTypes"));
app.use("/api/durations", require("./routes/durations"));
app.use("/api/grades", require("./routes/grades"));
app.use("/api/plan-details", require("./routes/planDetails"));
app.use("/api/prices", require("./routes/prices"));
app.use("/api/features", require("./routes/features"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

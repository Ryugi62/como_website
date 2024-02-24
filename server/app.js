require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// app.use(express.static(__dirname + "../dist")); 계속 안되는데?
app.use(express.static(path.join(__dirname, "../dist")));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// 세션 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

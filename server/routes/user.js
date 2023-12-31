const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/database");
const session = require("express-session");
const router = express.Router();

// 세션 미들웨어 설정
router.use(
  session({
    secret: "비밀 키", // 세션 암호화 키
    resave: false, // 세션을 항상 저장할지 결정하는 옵션
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장
    cookie: {
      secure: false, // HTTPS를 사용할 때 true
      maxAge: 1000 * 60 * 60 * 24, // 쿠키 유효 시간 (예: 24시간)
    },
  })
);

// 로그인 상태 확인 미들웨어
function checkLoggedIn(req, res, next) {
  if (req.session.userId) {
    next(); // 로그인된 상태
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
}

// Middleware for checking required fields
const validateRequiredFields = (req, res, next) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).send("필수 필드를 모두 채워주세요.");
  }

  next();
};

// 회원 가입 라우트
router.post("/register", async (req, res) => {
  try {
    const { userId, email, password, phone } = req.body;

    if (!userId || !email || !password || !phone) {
      return res.status(400).send("필수 필드를 모두 채워주세요.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (userId, email, password, phone) VALUES (?, ?, ?, ?)",
      [userId, email, hashedPassword, phone]
    );

    res.status(200).send("회원가입 성공");
  } catch (error) {
    console.error("Error in registration route:", error);
    res.status(500).send(`회원가입 오류: ${error.message}`);
  }
});

// 로그인 라우트
router.post("/login", validateRequiredFields, async (req, res) => {
  try {
    const { userId, password } = req.body;

    const [user] = await db.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        req.session.userId = user.userId; // 세션에 사용자 ID 저장
        res.status(200).send("로그인 성공");
      } else {
        res.status(400).send("비밀번호가 일치하지 않습니다.");
      }
    } else {
      res.status(400).send("아이디가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).send(`로그인 오류: ${error.message}`);
  }
});

// 로그아웃 라우트
app.get("/logout", (req, res) => {
  req.session.destroy(); // 세션 삭제
  res.send("로그아웃 성공");
});

// Export the router
module.exports = router;

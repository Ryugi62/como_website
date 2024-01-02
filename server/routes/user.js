require("dotenv").config(); // 환경 변수 사용을 위한 dotenv 모듈
const express = require("express"); // Express 웹 프레임워크
const bcrypt = require("bcrypt"); // 비밀번호 해시 모듈
const db = require("../config/database"); // 가정: 별도의 DB 모듈
const session = require("express-session"); // 세션 미들웨어
const helmet = require("helmet"); // 보안 관련 HTTP 헤더 설정
const logger = require("./logger"); // 가정: 별도의 로깅 모듈
const router = express.Router(); // 라우터

router.use(helmet()); // 보안 관련 HTTP 헤더 설정

// 세션 미들웨어 설정
router.use(
  session({
    secret: process.env.SESSION_SECRET, // 환경 변수에서 secret 가져오기
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // HTTPS 사용 시 true로 설정
      httpOnly: true, // 클라이언트 측 JavaScript 접근 방지
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// 로그인 상태 확인 미들웨어
function checkLoggedIn(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
}

// 필수 필드 유효성 검사 미들웨어
const validateRequiredFields = (fields) => (req, res, next) => {
  for (let field of fields) {
    if (!req.body[field]) {
      return res.status(400).send(`'${field}' 필드가 필요합니다.`);
    }
  }
  next();
};

// 회원 가입 라우트
router.post("/register", async (req, res) => {
  try {
    const { userId, email, password, phone } = req.body;

    // 입력 정규화 및 유효성 검사
    if (!userId || !email || !password || !phone) {
      return res.status(400).send("필수 필드를 모두 채워주세요.");
    }

    // 중복 사용자 확인
    const existingUser = await db.query(
      "SELECT * FROM users WHERE userId = ?",
      [userId]
    );
    if (existingUser.length > 0) {
      return res.status(400).send("중복된 아이디가 존재합니다.");
    }

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (userId, email, password, phone) VALUES (?, ?, ?, ?)",
      [userId, email, hashedPassword, phone]
    );

    logger.log("success", "회원가입 성공", { userId, email, phone });
    res.status(200).send("회원가입 성공");
  } catch (error) {
    logger.log("error", `회원가입 오류`, {
      error: error.message,
      userId,
      email,
      phone,
    });
    res.status(500).send(`회원가입 오류: ${error.message}`);
  }
});

// 로그인 라우트
router.post(
  "/login",
  validateRequiredFields(["userId", "password"]),
  async (req, res) => {
    try {
      const { userId, password } = req.body;

      const [user] = await db.query("SELECT * FROM users WHERE userId = ?", [
        userId,
      ]);
      if (!user) {
        return res.status(400).send("아이디가 존재하지 않습니다.");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("비밀번호가 일치하지 않습니다.");
      }

      // 관리자 여부도 세션에 저장
      req.session.userId = user.userId;
      req.session.isAdmin = user.isAdmin;

      res.status(200).send("로그인 성공");
    } catch (error) {
      logger.log("error", `로그인 오류`, { error: error.message, userId });
      res.status(500).send(`로그인 오류: ${error.message}`);
    }
  }
);

// 로그아웃 라우트
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).redirect("/");

  logger.log("success", "로그아웃 성공");
});

// 라우터 내보내기
module.exports = router;

require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/database");
const session = require("express-session");
const helmet = require("helmet");
const logger = require("./logger");

const router = express.Router();
setupMiddlewares(router);

// 필드 유효성 검사 미들웨어
function validateFields(requiredFields) {
  return function (req, res, next) {
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send(`'${field}' 필드가 필요합니다.`);
      }
    }
    next();
  };
}

// 사용자 정보에서 비밀번호 제거
function removePassword(user) {
  const newUser = { ...user };
  delete newUser.id;
  delete newUser.password;
  return newUser;
}

// 아이디 중복 확인 함수
async function checkDuplicateUserId(req, res, next) {
  try {
    const { userId } = req.body;
    const [user] = await db.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);
    if (user) {
      return res.status(400).send("중복된 아이디가 존재합니다.");
    }
    next();
  } catch (error) {
    logger.log("error", `아이디 중복 확인 오류: ${error.message}`, { userId });
    res.status(500).send(`아이디 중복 확인 오류: ${error.message}`);
  }
}

// 미들웨어 설정
function setupMiddlewares(router) {
  router.use(helmet());
  router.use(sessionMiddleware());
}

// 세션 미들웨어
function sessionMiddleware() {
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  });
}

// 아이디 중복 확인 라우트
router.post(
  "/checkUserIdAvailability",
  validateFields(["userId"]),
  checkUserIdAvailability
);

// 회원 가입 라우트
router.post(
  "/register",
  validateFields(["userId", "email", "password"]),
  checkDuplicateUserId,
  registerUser
);

// 계정 삭제 라우트
router.post("/deleteUser", validateFields(["userId", "password"]), deleteUser);

// 로그인 라우트
router.post("/login", validateFields(["userId", "password"]), loginUser);

// 로그아웃 라우트
router.get("/logout", logoutUser);

// 사용자 정보 변경 라우트
router.post(
  "/changeUser",
  validateFields(["userId", "newPassword", "email"]),
  changeUser
);

module.exports = router;

// 아이디 중복 확인 로직
async function checkUserIdAvailability(req, res) {
  try {
    const { userId } = req.body;
    const [user] = await db.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);
    if (user) {
      return res.status(400).send("중복된 아이디가 존재합니다.");
    }
    res.status(200).send("사용 가능한 아이디입니다.");
  } catch (error) {
    logger.log("error", `아이디 중복 확인 오류: ${error.message}`, { userId });
    res.status(500).send(`아이디 중복 확인 오류: ${error.message}`);
  }
}

// 회원 가입 로직
async function registerUser(req, res) {
  try {
    const { userId, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (userId, email, password, phone) VALUES (?, ?, ?, ?)",
      [userId, email, hashedPassword, phone]
    );
    logger.log("success", "회원가입 성공", { userId, email, phone });
    res.status(200).send("회원가입 성공");
  } catch (error) {
    logger.log("error", `회원가입 오류: ${error.message}`, {
      userId,
      email,
      phone,
    });
    res.status(500).send(`회원가입 오류: ${error.message}`);
  }
}

// 로그인 로직
async function loginUser(req, res) {
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

    res.status(200).send(removePassword(user));
  } catch (error) {
    logger.log("error", `로그인 오류: ${error.message}`, { userId });
    res.status(500).send(`로그인 오류: ${error.message}`);
  }
}

async function logoutUser(req, res) {
  try {
    req.session.destroy();
    res.status(200).redirect("/");
    logger.log("success", "로그아웃 성공");
  } catch (error) {
    logger.log("error", `로그아웃 오류: ${error.message}`, { userId });
    res.status(500).send(`로그아웃 오류: ${error.message}`);
  }
}

// 계정 삭제 로직
async function deleteUser(req, res) {
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

    await db.query("DELETE FROM users WHERE userId = ?", [userId]);
    logger.log("success", "계정 삭제 성공", { userId });
    res.status(200).send("계정 삭제 성공");
  } catch (error) {
    logger.log("error", `계정 삭제 오류: ${error.message}`, { userId });
    res.status(500).send(`계정 삭제 오류: ${error.message}`);
  }
}

// 사용자 정보 변경 로직
async function changeUser(req, res) {
  try {
    const { userId, newPassword, email } = req.body;

    const [user] = await db.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);

    if (!user) {
      return res.status(400).send("아이디가 존재하지 않습니다.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE users SET password = ?, email = ? WHERE userId = ?",
      [hashedPassword, email, userId]
    );

    const [updatedUser] = await db.query(
      "SELECT * FROM users WHERE userId = ?",
      [userId]
    );

    res.status(200).send(removePassword(updatedUser));
  } catch (error) {
    logger.log("error", `정보 변경 오류: ${error.message}`, { userId });
    res.status(500).send(`정보 변경 오류: ${error.message}`);
  }
}

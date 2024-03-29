const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/database");
const logger = require("./logger");

require("dotenv").config();

const router = express.Router();

// 필드 유효성 검사 미들웨어
function validateFields(requiredFields) {
  return function (req, res, next) {
    for (let field of requiredFields) {
      if (!req.body[field]) {
        const message = `'${field}' 필드가 필요합니다.`;
        console.log(message);
        return res.status(400).send(message);
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

// 아이디 중복 확인 미들웨어
async function checkDuplicateUserIdMiddleware(req, res, next) {
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
    handleServerError(res, "아이디 중복 확인 오류", error);
  }
}

// 회원 가입 미들웨어
async function registerUserMiddleware(req, res) {
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
    handleServerError(res, "회원가입 오류", error);
  }
}

// 로그인 미들웨어
async function loginUserMiddleware(req, res) {
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

    // 세션에 저장
    req.session.isLoggedIn = true;

    res.status(200).send(removePassword(user));
  } catch (error) {
    handleServerError(res, "로그인 오류", error);
  }
}

// 로그아웃 미들웨어
async function logoutUserMiddleware(req, res) {
  try {
    req.session.destroy();
    res.status(200).redirect("/");
    logger.log("success", "로그아웃 성공");
  } catch (error) {
    handleServerError(res, "로그아웃 오류", error);
  }
}

// 계정 삭제 미들웨어
async function deleteUserMiddleware(req, res) {
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
    handleServerError(res, "계정 삭제 오류", error);
  }
}

// 사용자 정보 변경 미들웨어
async function changeUserMiddleware(req, res) {
  try {
    const { userId, newPassword, email, phone } = req.body;
    const [user] = await db.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);
    if (!user) {
      return res.status(400).send("아이디가 존재하지 않습니다.");
    }
    if (newPassword !== "") {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.query(
        "UPDATE users SET password = ?, email = ?, phone = ? WHERE userId = ?",
        [hashedPassword, email, phone, userId]
      );
    } else {
      await db.query("UPDATE users SET email = ?, phone = ? WHERE userId = ?", [
        email,
        phone,
        userId,
      ]);
    }
    logger.log("success", "정보 변경 성공", { userId });
    const [updatedUser] = await db.query(
      "SELECT * FROM users WHERE userId = ?",
      [userId]
    );
    res.status(200).send(removePassword(updatedUser));
  } catch (error) {
    handleServerError(res, "정보 변경 오류", error);
  }
}

async function generateReferralLinkMiddleware(req, res) {
  try {
    const { userId } = req.body;
    const [user] = await db.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);
    if (!user) {
      logger.log("error", "아이디가 존재하지 않습니다.", { userId });
      return res.status(400).send("아이디가 존재하지 않습니다.");
    } else if (user.referralLink) {
      logger.log("error", "이미 추천 링크가 존재합니다.", { userId });
      return res.status(400).send("이미 추천 링크가 존재합니다.");
    }

    const referralLink = `${
      process.env.VUE_APP_SERVER_DNS_URL ||
      process.env.VUE_APP_SERVER_URL ||
      process.env.VUE_APP_SERVER_LOCAL_URL
    }/register?referralId=${userId}`;
    logger.log("success", "추천 링크 생성 성공", { userId, referralLink });

    await db.query("UPDATE users SET referralLink = ? WHERE userId = ?", [
      referralLink,
      userId,
    ]);

    const [updatedUser] = await db.query(
      "SELECT * FROM users WHERE userId = ?",
      [userId]
    );

    res.status(200).send(removePassword(updatedUser));
  } catch (error) {
    handleServerError(res, "추천 링크 생성 오류", error);
  }
}

// 서버 오류 처리
function handleServerError(res, message, error) {
  const errorMessage = `${message}: ${error.message}`;
  logger.log("error", errorMessage, { userId: res.locals.userId });
  res.status(500).send(errorMessage);
}

// 아이디 중복 확인 라우트
router.post(
  "/checkUserIdAvailability",
  validateFields(["userId"]),
  checkDuplicateUserIdMiddleware,
  (req, res) => res.status(200).send("사용 가능한 아이디입니다.")
);

// 회원 가입 라우트
router.post(
  "/register",
  validateFields(["userId", "email", "password"]),
  checkDuplicateUserIdMiddleware,
  registerUserMiddleware
);

// 계정 삭제 라우트
router.post(
  "/deleteUser",
  validateFields(["userId", "password"]),
  deleteUserMiddleware
);

// 로그인 라우트
router.post(
  "/login",
  validateFields(["userId", "password"]),
  loginUserMiddleware
);

router.post("/generateReferralLink", (req, res) => {
  console.log("req.body:", req.body);
  generateReferralLinkMiddleware(req, res);
});

// 로그아웃 라우트
router.get("/logout", logoutUserMiddleware);

// 사용자 정보 변경 라우트
router.post("/changeUser", changeUserMiddleware);

module.exports = router;


// state.js
export const state = {
  // 로그인 상태를 세션 스토리지에서 가져옴 (없으면 false)
  loggedIn: localStorage.getItem("loggedIn") === "true",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

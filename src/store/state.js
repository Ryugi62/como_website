// state.js
export const state = {
  // 로그인 상태를 세션 스토리지에서 가져옴 (없으면 false)
  loggedIn: localStorage.getItem("loggedIn") === "true",

  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

  planDetails: localStorage.getItem("planDetails")
    ? JSON.parse(localStorage.getItem("planDetails"))
    : null,

  Bots: localStorage.getItem("Bots")
    ? JSON.parse(localStorage.getItem("Bots"))
    : null,

  TradeTypes: localStorage.getItem("TradeTypes")
    ? JSON.parse(localStorage.getItem("TradeTypes"))
    : null,

  Durations: localStorage.getItem("Durations")
    ? JSON.parse(localStorage.getItem("Durations"))
    : null,

  Grades: localStorage.getItem("Grades")
    ? JSON.parse(localStorage.getItem("Grades"))
    : null,
};

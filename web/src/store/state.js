// state.js
export const state = {
  // 세션 스토리지에 저장된 로그인 상태를 가져옴
  loggedIn: localStorage.getItem("loggedIn") || false,
};

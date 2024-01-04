export const mutations = {
  // setLoggedIn
  setLoggedIn(state, value) {
    // 로그인 상태를 세션 스토리지에 저장
    state.loggedIn = value;
    localStorage.setItem("loggedIn", value);
  },

  setUser(state, value) {
    state.user = value;
    localStorage.setItem("user", JSON.stringify(value));
  },
};

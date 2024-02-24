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

  setPlanDetails(state, value) {
    state.planDetails = value;
    localStorage.setItem("planDetail", JSON.stringify(value));
  },

  setBots(state, value) {
    state.Bots = value;
    localStorage.setItem("Bots", JSON.stringify(value));
  },

  setTradeTypes(state, value) {
    state.TradeTypes = value;
    localStorage.setItem("TradeTypes", JSON.stringify(value));
  },

  setDurations(state, value) {
    state.DurationTypes = value;
    localStorage.setItem("Durations", JSON.stringify(value));
  },

  setGrades(state, value) {
    state.Grades = value;
    localStorage.setItem("Grades", JSON.stringify(value));
  },
};

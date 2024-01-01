import axios from "axios";

export const actions = {
  async register({ commit }, credentials) {
    try {
      const response = await axios.post("/api/register", credentials);

      // if status code is 200, then commit
      if (response.status === 200) {
        commit("setLoggedIn", true);
      }
    } catch (error) {
      console.error("Register failed:", error);
    }
  },

  async login({ commit }, credentials) {
    try {
      const response = await axios.post("/api/login", credentials);

      if (response.status === 200) {
        commit("setLoggedIn", true);
      }

      return response;
    } catch (error) {
      console.error("Login failed:", error);

      return error.response.data;
    }
  },

  async logout({ commit }) {
    try {
      await axios.get("/api/logout");
      commit("setLoggedIn", false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  async checkLoginStatus({ commit }) {
    try {
      const response = await axios.get("/api/check-login-status");

      commit("setLoggedIn", response.data.loggedIn);
    } catch (error) {
      console.error("Check login status failed:", error);
    }
  },
};

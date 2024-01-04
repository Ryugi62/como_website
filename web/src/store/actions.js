import axios from "axios";

export const actions = {
  async checkUserIdAvailability(context, userId) {
    try {
      const response = await axios.post("/api/checkUserIdAvailability", {
        userId,
      });

      return response.status === 200;
    } catch (error) {
      console.error("checkUserIdAvailability failed:", error);
    }
  },

  async register({ commit }, credentials) {
    try {
      const response = await axios.post("/api/register", credentials);

      // if status code is 200, then commit
      if (response.status === 200) {
        commit("setLoggedIn", true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Register failed:", error);
    }
  },

  async deleteUser({ commit }, credentials) {
    try {
      console.log("credentials:", credentials);

      const response = await axios.post("/api/deleteUser", credentials);

      if (response.status === 200) {
        commit("setLoggedIn", false);
        commit("setUser", null);

        return true;
      }
    } catch (error) {
      console.error("Delete user failed:", error);

      return false;
    }
  },

  async login({ commit }, credentials) {
    try {
      const response = await axios.post("/api/login", credentials);

      if (response.status === 200) {
        commit("setLoggedIn", true);
        commit("setUser", response.data);
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

  async changeUser({ commit }, credentials) {
    try {
      const response = await axios.post("/api/changeUser", credentials);

      console.log("response:", response);

      if (response.status === 200) {
        commit("setLoggedIn", true);
        commit("setUser", response.data);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Change user failed:", error);

      return error.response.data;
    }
  },
};

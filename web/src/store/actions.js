import axios from "axios";

export const actions = {
  async checkUserIdAvailability(context, userId) {
    try {
      const response = await axios.post("/api/users/checkUserIdAvailability", {
        userId,
      });

      return response.status === 200;
    } catch (error) {
      console.error("checkUserIdAvailability failed:", error);
    }
  },

  async register({ commit }, credentials) {
    try {
      const response = await axios.post("/api/users/register", credentials);

      // if status code is 200, then commit
      if (response.status === 200) {
        commit("setLoggedIn", false);
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

      const response = await axios.post("/api/users/deleteUser", credentials);

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
      const response = await axios.post("/api/users/login", credentials);

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
      await axios.get("/api/users/logout");
      commit("setLoggedIn", false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  async changeUser({ commit }, credentials) {
    try {
      const response = await axios.post("/api/users/changeUser", credentials);

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

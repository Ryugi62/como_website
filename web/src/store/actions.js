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

  // planDetail 관련
  async getAllPlanDetails({ commit }) {
    console.log("getAllPlanDetails");

    try {
      const response = await axios.get("/api/plan-details");

      if (response.status === 200) {
        commit("setPlanDetails", response.data);

        return response.data;
      }
    } catch (error) {
      console.error("Get all plan details failed:", error);
    }
  },

  async addPlanDetail({ commit }, planDetail) {
    try {
      const response = await axios.post("/api/plan-details", planDetail);

      if (response.status === 200) {
        commit("addPlanDetail", response.data);
      }
    } catch (error) {
      console.error("Add plan detail failed:", error);
    }
  },

  async deletePlanDetail({ commit }, planDetailId) {
    try {
      const response = await axios.delete(`/api/plan-details/${planDetailId}`);

      if (response.status === 200) {
        commit("deletePlanDetail", planDetailId);
      }
    } catch (error) {
      console.error("Delete plan detail failed:", error);
    }
  },

  async updatePlanDetail({ commit }, planDetail) {
    try {
      const response = await axios.put(
        `/api/plan-details/${planDetail._id}`,
        planDetail
      );

      if (response.status === 200) {
        commit("updatePlanDetail", planDetail);
      }
    } catch (error) {
      console.error("Update plan detail failed:", error);
    }
  },
};

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

  async generateReferralLink({ commit }, credentials) {
    try {
      const response = await axios.post(
        "/api/users/generateReferralLink",
        credentials
      );

      if (response.status === 200) {
        commit("setUser", response.data);

        return response.data;
      }
    } catch (error) {
      console.error("Generate referral link failed:", error);
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
        commit;

        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting plan detail:", error);
      throw error; // 오류를 호출자에게 전달
    }
  },

  async updatePlanDetail({ commit }, planDetail) {
    try {
      const response = await axios.put(
        `/api/plan-details/${planDetail.PlanDetailID}`,
        planDetail
      );

      if (response.status === 200) {
        console.log(`commit : ${commit}`);

        return true;
      }
    } catch (error) {
      console.error("Update plan detail failed:", error);
    }
  },

  async getAllBots({ commit }) {
    try {
      const response = await axios.get("/api/bots");

      if (response.status === 200) {
        commit("setBots", response.data);

        return response.data;
      }
    } catch (error) {
      console.error("Get all bots failed:", error);
    }
  },

  async getAllTradeTypes({ commit }) {
    try {
      const response = await axios.get("/api/trade-types");

      if (response.status === 200) {
        commit("setTradeTypes", response.data);

        return response.data;
      }
    } catch (error) {
      console.error("Get all trade types failed:", error);
    }
  },

  async getAllDurations({ commit }) {
    try {
      const response = await axios.get("/api/durations");

      if (response.status === 200) {
        commit("setDurations", response.data);

        return response.data;
      }
    } catch (error) {
      console.error("Get all durations failed:", error);
    }
  },

  async getAllGrades({ commit }) {
    try {
      const response = await axios.get("/api/grades");

      if (response.status === 200) {
        commit("setGrades", response.data);

        return response.data;
      }
    } catch (error) {
      console.error("Get all grades failed:", error);
    }
  },
};

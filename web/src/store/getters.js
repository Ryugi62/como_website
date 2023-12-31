export const getters = {
  isLoggedIn: (state) => state.loggedIn,

  isAdmin: (state) => state.user?.role === "admin",
};

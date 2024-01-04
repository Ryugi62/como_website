export const getters = {
  isLoggedIn: (state) => state.loggedIn,

  isAdmin: (state) => state.user?.role === "admin",

  userEmail: (state) => state.user?.email,
  isUserAdmin: (state) => state.user?.isAdmin,
  isUserSubscribed: (state) => state.user?.isSubscribed,
  userPhone: (state) => state.user?.phone,
  userReferralLink: (state) => state.user?.referralLink,
  userSubscriptionAmount: (state) => state.user?.subscriptionAmount,
  userSubscriptionEndDate: (state) => state.user?.subscriptionEndDate,
  userSubscriptionProduct: (state) => state.user?.subscriptionProduct,
  userSubscriptionStartDate: (state) => state.user?.subscriptionStartDate,
  userTotalPaidAmount: (state) => state.user?.totalPaidAmount,
  userId: (state) => state.user?.userId,
  userSupscription: (state) => state.user?.subscription,
};

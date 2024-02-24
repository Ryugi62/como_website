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

  getBotIDByName: (state) => (name) => {
    const bot = state.Bots.find((bot) => bot.BotName === name);
    return bot ? bot.BotID : null;
  },
  getTradeTypeIDByName: (state) => (name) => {
    const tradeType = state.TradeTypes.find(
      (tradeType) => tradeType.TypeName === name
    );
    return tradeType ? tradeType.TradeTypeID : null;
  },
  getDurationIDByName: (state) => (name) => {
    const duration = state.Durations.find(
      (duration) => duration.Duration === name
    );
    return duration ? duration.DurationID : null;
  },
  getGradeIDByName: (state) => (name) => {
    const grade = state.Grades.find((grade) => grade.GradeName === name);
    return grade ? grade.GradeID : null;
  },
};

import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IntroView from "../views/IntroView.vue";
import ProgramView from "../views/ProgramView.vue";
import PricingView from "../views/PricingView.vue";
import DownloadView from "../views/DownloadView.vue";
import ReferralView from "../views/ReferralView.vue";
import CounselView from "../views/CounselView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import RegisterView from "../views/RegisterView.vue";
import AdminView from "../views/AdminView.vue";
import MyPageView from "../views/MyPageView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/intro",
    name: "intro",
    component: IntroView,
  },
  {
    path: "/program",
    name: "program",
    component: ProgramView,
  },
  {
    path: "/pricing",
    name: "pricing",
    component: PricingView,
  },
  {
    path: "/download",
    name: "download",
    component: DownloadView,
  },
  {
    path: "/referral",
    name: "referral",
    component: ReferralView,
  },
  {
    path: "/counsel",
    name: "counsel",
    component: CounselView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: MyPageView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
];

const router = createRouter({
  scrollBehavior() {
    return { top: 0 };
  },
  history: createWebHashHistory(), // 여기를 수정
  routes,
});

export default router;

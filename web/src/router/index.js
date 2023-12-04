import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IntroView from "../views/IntroView.vue";
import ProgramView from "../views/ProgramView.vue";
import PricingView from "../views/PricingView.vue";
import DownloadView from "../views/DownloadView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AdminView from "../views/AdminView.vue";

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
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

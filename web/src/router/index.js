import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IntroView from "../views/IntroView.vue";
import LoginView from "../views/LoginView.vue";
import PricingView from "../views/PricingView.vue";

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
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/pricing",
    name: "pricing",
    component: PricingView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

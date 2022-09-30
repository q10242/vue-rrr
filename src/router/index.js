import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Redirect from "../views/RedirectView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:id",
      name: "redirect",
      component: Redirect,
    },
  ],
});

export default router;

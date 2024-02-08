import { createRouter, createWebHistory } from "vue-router";
import users from "../pages/users.vue";
import explore from "../pages/explore.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "users",
      component: users,
    },
    {
      path: "/explore",
      name: "explore",
      component: explore,
    },
  ],
});
export { router };

import { createRouter, createWebHistory } from "vue-router";
import users from "../pages/users.vue";
import library from "../pages/library.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "users",
      component: users,
    },
    {
      path: "/library",
      name: "library",
      component: library,
    },
  ],
});
export { router };

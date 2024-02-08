import { createRouter, createWebHistory } from "vue-router";
import users from "../pages/users.vue";
import explore from "../pages/explore.vue";
import library from "../pages/library.vue";
import book from "../pages/book.vue";

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
    {
      path: "/library/:userId",
      name: "library",
      component: library,
    },
    {
      path: "/book/:bookId",
      name: "book",
      component: book,
    },
  ],
});
export { router };

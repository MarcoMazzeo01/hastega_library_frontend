import { createApp } from "vue";
import "./assets/scss/style.scss";
import * as bootstrap from "bootstrap";
import VueCookies from "vue-cookies";
import _App from "./App.vue";
import { router } from "./router/router.js";

const App = createApp(_App);
App.use(VueCookies, { expires: "1W" });
App.use(router);
//App.provide("$cookies", VueCookies);
App.mount("#app");

import Vue from "vue";
import Router from "vue-router";

import sendData from "./views/SendFoodDataPage.vue";
import change from "./views/EditFoodDatePage.vue";
import home from "./views/FridgeHomePage.vue";
import search from "./views/SearchFoodDataPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/send",
      name: "send",
      component: sendData
    },
    {
      path: "/change",
      name: "change",
      component: change
    },
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/search",
      name: "search",
      component: search
    }
  ]
});

import Vue from "vue";
import App from "./App.vue";

import router from "./router";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // if (to.path === "/users/2") {
  //   next("/");
  // }

  next();
  // 終わりを示す。ないと困る。
  // next(false); → ページを遷移させない
  // next("/"); → このパスの場所にいく
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

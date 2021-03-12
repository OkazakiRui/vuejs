import Vue from "vue";
import App from "./App.vue";
import likeNum from "./components/likeNum.vue";

Vue.config.productionTip = false;

Vue.component("likeNum", likeNum);

new Vue({
  render: (h) => h(App),
}).$mount("#app");

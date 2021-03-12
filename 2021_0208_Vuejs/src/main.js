import Vue from "vue";
import App from "./App.vue";
import About from "./components/About.vue";

Vue.config.productionTip = false;
Vue.component("About", About);
Vue.directive("border", (el, binding) => {
  el.style.borderWidth = binding.value.width;
  el.style.borderColor = binding.value.color;
  if (binding.arg) {
    el.style.borderStyle = binding.arg;
  } else {
    el.style.borderStyle = "solid";
  }

  if (binding.modifiers.round) {
    el.style.borderRadius = "10px";
  }
});

Vue.filter("upperCase", (string) => string.toUpperCase());

Vue.mixin({
  created() {
    console.log("global mixin");
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");

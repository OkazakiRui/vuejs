const vm1 = new Vue({
  el: "#app1",
  data: {
    message: "インスタンス1",
    name: "",
  },
});

vm1.name = "岡崎流依";

console.log(vm1);

const vm2 = new Vue({
  el: "#app2",
  data: {
    message: "インスタンス2",
  },
  methods: {
    changeMessage: function () {
      vm1.message = "インスタンス2から変えました";
    },
  },
});

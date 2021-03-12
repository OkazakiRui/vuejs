<template>
  <div>
    <p v-border:solid.round="{ color: 'red', width: '7px' }">Home</p>
    <h2>{{ title | upperCase }}</h2>
    <h3>{{ subTitle | upperCase }}</h3>
    <p>{{ number }}</p>
    <button @click="number++">number +1</button>
    <hr />
    <CountNumber></CountNumber>
  </div>
</template>

<script>
import CountNumber from "./CountNumber.vue";
import { tokyoNumber } from "@/tokyoNumber.js";
export default {
  mixins: [tokyoNumber],
  components: {
    CountNumber,
  },

  // computed: {
  //   upperCaseTitle() {
  //     return this.title.toUpperCase();
  //   },
  //   upperCaseSubTitle() {
  //     return this.subTitle.toUpperCase();
  //   },
  // },
};
</script>

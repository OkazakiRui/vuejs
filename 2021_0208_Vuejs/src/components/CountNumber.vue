<template>
  <div>
    <h2>{{ title | upperCase }}</h2>
    <h3>{{ subTitle | upperCase }}</h3>
    <p>{{ number }}</p>
    <button @click="number++">number +1</button>
  </div>
</template>

<script>
import { tokyoNumber } from "@/tokyoNumber";
export default {
  mixins: [tokyoNumber],
  created() {
    console.log("created in Component");
  },
};
</script>

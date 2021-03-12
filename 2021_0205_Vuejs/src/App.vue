<template>
  <div>
    <!-- <likeHeader headerText="トータルのいいね数"></likeHeader> -->
    <!-- <likeHeader> -->
    <!-- <likeHeader>
      <template v-slot:title>
        <h1>トータルのいいね数</h1>
      </template>
      <h3>はじめまして</h3>
      <template v-slot:number>
        <p>{{ number }}</p>
      </template>
    </likeHeader> -->
    <!-- <h2>{{ number }}</h2> -->
    <!-- <likeNum></likeNum> -->

    <likeHeader>
      <h3>はじめまして</h3>
    </likeHeader>

    <likeNum :total-number="number" v-on:my-click="number = $event"></likeNum>
    <likeNum
      :total-number="number"
      test-props="いけてる"
      @my-click="plus"
    ></likeNum>

    <button @click="currentComponent = 'Home'">Home</button>
    <button @click="currentComponent = 'About'">About</button>

    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import likeHeader from "./components/likeHeader.vue";
import About from "./components/About.vue";
import Home from "./components/Home.vue";

export default {
  data() {
    return {
      number: 10,
      currentComponent: "Home",
    };
  },
  components: {
    likeHeader,
    About,
    Home,
  },
  methods: {
    plus(value) {
      this.number = value;
    },
  },
};
</script>

<style scoped>
div {
  border: red 1px solid;
}
</style>

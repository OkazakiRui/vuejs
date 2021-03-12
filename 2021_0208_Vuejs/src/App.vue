<template>
  <div>
    <BlogHeader>
      <h2>概要</h2>
    </BlogHeader>
    <button @click="components = 'Home'">Home</button>
    <button @click="components = 'About'">About</button>
    <component :is="components"></component>
  </div>
</template>

<script>
import BlogHeader from "./components/BlogHeader.vue";
import Home from "./components/Home.vue";

export default {
  name: "App",
  data() {
    return {
      components: "Home",
    };
  },
  components: {
    BlogHeader,
    Home,
  },
};
</script>

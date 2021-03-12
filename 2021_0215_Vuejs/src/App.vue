<template>
  <div id="app">
    <h1>はじめまして！</h1>
    <button @click="show = !show">表示・非表示ボタン</button>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <JavaScriptAnimation v-if="show"></JavaScriptAnimation>
    </transition>

    <button @click="add">追加する。</button>
    <ul>
      <transition-group name="fade" tag="div">
        <li
          style="cursor:pointer;"
          :key="number"
          v-for="(number, index) in numbers"
          @click="remove(index)"
        >
          {{ number }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import JavaScriptAnimation from "./components/JavaScriptAnimation.vue";

export default {
  name: "App",
  data() {
    return {
      numbers: [0, 1, 2],
      nextNumber: 3,
      show: true,
    };
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.numbers.length);
    },
    add() {
      this.numbers.splice(this.randomIndex(), 0, this.nextNumber);
      // どこに 削除するか 何を入れるか
      this.nextNumber++;
    },
    remove(index) {
      this.numbers.splice(index, 1);
    },
    beforeEnter(el) {
      el.style.transform = "scale(0)";
    },
    enter(el, done) {
      let scale = 0;
      const interval = setInterval(() => {
        el.style.transform = `scale(${scale})`;
        scale += 0.01;
        if (scale > 1) {
          clearInterval(interval);
          done();
        }
      }, 1);
    },
    leave(el, done) {
      let scale = 1;
      const interval = setInterval(() => {
        el.style.transform = `scale(${scale})`;
        scale -= 0.01;
        if (scale < 0) {
          clearInterval(interval);
          done();
        }
      }, 1);
    },
  },
  components: {
    JavaScriptAnimation,
  },
};
</script>

<style scoped>
#app {
  padding: 1rem 2rem;
}

.fade-move {
  transition: transform 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.5s;
  position: absolute;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>

<template>
  <div class="main">
    <button @click="myAnimation = 'slide'">Slide</button>
    <button @click="myAnimation = 'fade'">Fade</button>
    <p>{{ myAnimation }}</p>
    <button @click="show = !show">切り替え</button>
    <br /><br />

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
    >
      <div class="circle" v-if="show"></div>
    </transition>

    <br />

    <button @click="myComponent = 'ComponentA'">ComponentA</button>
    <button @click="myComponent = 'ComponentB'">ComponentB</button>

    <transition name="fade" mode="out-in">
      <component :is="myComponent"></component>
    </transition>

    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>

    <transition name="fade" mode="out-in">
      <p key="bey" v-if="show">さよなら</p>
      <p key="hi" v-else>こんにちは</p>
    </transition>

    <transition :name="myAnimation" appear>
      <div v-if="show">
        <p>bye</p>
        <p>Hello</p>
        <p>World</p>
      </div>
    </transition>
  </div>
</template>

<script>
import ComponentA from "./components/ComponentA.vue";
import ComponentB from "./components/ComponentB.vue";

export default {
  data() {
    return {
      show: true,
      myAnimation: "slide",
      myComponent: "ComponentA",
    };
  },
  components: {
    ComponentA,
    ComponentB,
  },
  methods: {
    beforeEnter() {},
    enter() {},
    afterEnter() {},
    enterCancelled() {},
    beforeLeave() {},
    leave() {},
    afterLeave() {},
    leaveCancelled() {},
  },
};
</script>

<style scoped>
.circle {
  width: 200px;
  height: 200px;
  margin: auto;
  border-radius: 50%;
  background-color: deeppink;
}

.main {
  width: 70%;
  margin: 5rem auto;
  text-align: center;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to {
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0);
  }
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-active {
  animation: slide-in 0.5s;
  transition: opacity 1s;
}
.slide-leave-active {
  animation: slide-in 0.5s reverse;
  transition: opacity 1s;
}
</style>

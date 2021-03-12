<template>
  <div>
    <p v-background.size="'gray'">About</p>
    <h2>{{ title | lowerCase }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Thank you for reading",
    };
  },
  directives: {
    background(el, binding) {
      el.style.backgroundColor = binding.value;
    },
  },
  filters: {
    lowerCase(value) {
      return value.toLowerCase();
    },
  },
};
</script>

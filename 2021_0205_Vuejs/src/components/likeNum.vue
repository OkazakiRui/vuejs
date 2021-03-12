<template>
  <div>
    <p>いいね{{ halfNumber }}</p>
    <p>{{ testProps }}</p>
    <button @click="plusNum">like</button>
  </div>
</template>

<script>
export default {
  props: {
    totalNumber: {
      type: Number,
      default: 10,
    },
    testProps: {
      type: String,
      default: "何もない",
    },
  },
  computed: {
    halfNumber() {
      return this.totalNumber / 2;
    },
  },
  methods: {
    plusNum() {
      this.$emit("my-click", this.totalNumber + 1);
      // this.$emit(データ名, データを入れる);
    },
  },
};
</script>

<style scoped>
div {
  border: blue 1px solid;
}
</style>

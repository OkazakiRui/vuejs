<template>
  <div>
    <label for="title">イベントのタイトル</label>
    <!-- <input type="text" id="title" v-model.lazy="eventDate.title" /> -->
    <input
      type="text"
      id="title"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

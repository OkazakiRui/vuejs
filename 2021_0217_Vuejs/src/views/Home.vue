<template>
  <div>
    <h3>Home</h3>
    <button @click="toUsers">Usersのページにいく。</button>
  </div>
</template>

<script>
export default {
  methods: {
    toUsers() {
      // this.$router.push("users/1/profile");
      this.$router.push({
        name: "user-id-profile",
        params: {
          id: 1,
        },
        query: {
          lang: "ja",
          page: 2,
        },
        hash: "#nextUser",
      });
    },
  },
};
</script>

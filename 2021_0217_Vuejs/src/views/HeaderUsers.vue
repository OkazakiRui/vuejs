<template>
  <div>
    <h2>ユーザーだぞ</h2>
    <nav>
      aタグ
      <a href="/" class="link">Home</a>
      <a href="/users" class="link">Users</a>
      <br />
      router-linkタグ
      <router-link to="/" class="link" active-class="link-active" exact
        >Home</router-link
      >
      <router-link to="/users/0" class="link" active-class="link-active" exact
        >Users</router-link
      >
    </nav>
  </div>
</template>

<style scoped>
.link {
  margin-right: 10px;
  font-size: 16px;
}

.link-active {
  font-size: 20px;
}
</style>

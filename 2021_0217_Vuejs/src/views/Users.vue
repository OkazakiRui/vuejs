<template>
  <div>
    <h3>Users</h3>
    <router-link to="/users/1">ユーザー1</router-link>
    <router-link to="/users/2">ユーザー2</router-link>
    <hr />
    <router-link :to="'/users/' + (Number(id) + 1) + '/profile'"
      >次のユーザー</router-link
    >
    <router-link
      :to="{ name: 'user-id-profile', params: { id: Number(id) + 1 } }"
      >次のユーザー</router-link
    >

    <h4>User Number {{ $route.params.id }}</h4>
    <h4>User Number {{ id }}</h4>

    <router-view></router-view>

    <div style="height:700px;"></div>

    <router-link
      id="nextUser"
      :to="{
        name: 'user-id-profile',
        params: { id: Number(id) + 1 },
        query: { lang: 'ja', page: Number(id) + 1 },
        hash: '#nextUser',
      }"
    >
      次のユーザー
    </router-link>

    <div style="height:1400px;"></div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
    },
  },
  beforeRouteEnter(to, from, next) {
    // インスタンスが作成される前に実行される。
    // this.が使えない
    // console.log("beforeRouteEnter");
    next(() => {
      // next((vm) => {
      // console.log(vm.id);
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 中身が変更されたときに実行される
    // console.log("beforeRouteUpdate");
    next();
  },
  beforeRouteLeave(to, from, next) {
    // ページを移動しようとしたときに実行される
    // console.log("beforeRouteLeave");
    const isLeave = window.confirm("本当にこのページを離れますか？");
    if (isLeave) {
      next();
    } else {
      next(false);
    }
  },
};
</script>

import Vue from "vue";
import Router from "vue-router";

// import Home from "./views/Home.vue";
// import Users from "./views/Users.vue";

// import UsersPosts from "./views/UsersPost.vue";
// import UsersProfile from "./views/UsersProfile.vue";

// import HeaderHome from "./views/HeaderHome.vue";
// import HeaderUsers from "./views/HeaderUsers.vue";

const Home = () => import("./views/Home.vue");
const Users = () => import(/* webpackChunkName: "Users" */ "./views/Users.vue");
const UsersPosts = () =>
  import(/* webpackChunkName: "UsersPost" */ "./views/UsersPost.vue");
const UsersProfile = () =>
  import(/* webpackChunkName: "UsersProfile" */ "./views/UsersProfile.vue");
const HeaderHome = () =>
  import(/* webpackChunkName: "HeaderHome" */ "./views/HeaderHome.vue");
const HeaderUsers = () =>
  import(/* webpackChunkName: "HeaderUsers" */ "./views/HeaderUsers.vue");

Vue.use(Router);
// Vue.useはプラグインを適応するという意味
// プラグインとはグローバルな機能を提供するためのもの、mixin や カスタムディレクティブ のようなもの

export default new Router({
  mode: "history",
  // "hash" : http:URL/#/  通信がない
  // "history" : http:URL/ 通信がある
  //   デフォルトだとhashになっている
  routes: [
    {
      path: "/",
      //   component: Home,
      components: {
        default: Home,
        header: HeaderHome,
      },
      beforeEnter(to, from, next) {
        next();
      },
    },
    {
      path: "/users/:id",
      //   component: Users,
      components: {
        default: Users,
        header: HeaderUsers,
      },
      //   props: true,
      props: { default: true, header: false },
      children: [
        {
          path: "posts",
          component: UsersPosts,
        },
        {
          path: "profile",
          component: UsersProfile,
          name: "user-id-profile",
        },
      ],
    },
    {
      //   path: "/hello",
      path: "*",
      //   path: "/user*",
      redirect: "/",
    },
  ],
  // routes: [] URLをマッピングしていく
  scrollBehavior(to, from, sevedPosition) {
    return new Promise((resolve) => {
      this.app.$once("triggerScroll", () => {
        //  this. = new Routerを示している。

        //   app に emit されたときの関数を作ることができる。
        console.log(to, from, sevedPosition);
        let position = { x: 0, y: 0 };
        if (sevedPosition) {
          position = sevedPosition;
        }
        if (to.hash) {
          position = { selector: to.hash };
        }
        resolve(position);
      });
    });

    // if (sevedPosition) {
    //   return sevedPosition;
    // }
    // if (to.hash) {
    //   return { selector: to.hash };
    // }

    //   scrollBehavior(to, from, sevedPosition) {
    //   scrollBehavior(移動先の情報($routeでアクセスできるもの), 移動前の情報($routeでアクセスできるもの), 移動する前position) {
    // return {
    //   selector: "#nextUser",
    //   offset: { x: 0, y: 100 },
    // };
    // return { x: 0, y: 0 };
  },
});

// 適応はできてないのでinportする必要がある。
// import Router from "./router";

// もともとApp.vueが表示されている。
// App.vue に <router-view></router-view> を入れると良い
// <router-view></router-view> は動的コンポーネントのようなものにする。

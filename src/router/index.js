import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("../../views/index.vue"),
    // 上下文自动查找加载路由
    children: ((r) => {
      let routers = r.keys().map((key) => r(key).default);
      return routers;
    })(require.context("../components/", true, /router\.js$/)), // true  开启查找子目录
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;

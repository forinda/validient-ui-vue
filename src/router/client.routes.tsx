import { RouteRecordRaw } from "vue-router";

const clientRoutes: RouteRecordRaw = {
  path: "/client",
  name: "Client",
  component: () =>
    /**webpackChunkName:ClientLayout */ import("@/layouts/ClientLayout.vue"),
  children: [],
};

export default clientRoutes;

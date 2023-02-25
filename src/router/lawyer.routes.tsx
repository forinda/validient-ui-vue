import { RouteRecordRaw } from "vue-router";

const lawyerRoutes: RouteRecordRaw = {
  path: "/lawyer",
  name: "Lawyer",
  component: () =>
    /**webpackChunkName:LawyerLayout*/ import("@/layouts/LawyerLayout.vue"),
  children: [],
};

export default lawyerRoutes;

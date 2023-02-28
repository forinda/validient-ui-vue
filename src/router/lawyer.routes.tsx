import { RouteMetaType } from "@/typings";
import { RouteRecordRaw } from "vue-router";

const lawyerRoutes: RouteRecordRaw = {
  path: "/lawyer",
  name: "LawyerWrapper",
  meta: {
    authorities: ["LAWYER"],
    title: "lawyer",
    requiresAuth: true,
    roles: ["lawyer"],
  } satisfies RouteMetaType,
  component: () =>
    /**webpackChunkName:LawyerLayout*/ import("@/layouts/LawyerLayout.vue"),
  children: [
    {
      path: "",
      name: "LawyerDashboardLayout",
      component: () =>
        /**webpackChunkName:LawyerDashboardLayout*/ import(
          "@/layouts/LawyerDashboardLayout.vue"
        ),
      children: [
        {
          path: "",
          name: "lawyer",
          component: () =>
            /**webpackChunkName:LawyerOverview*/ import(
              "@/components/lawyer/LawyerOverview.vue"
            ),
        },
        {
          path: "cases",
          name: "LawyerCases",
          component: () =>
            /**webpackChunkName:LawyerCases*/
            "@/components/lawyer/LawyerCases.vue",
        },
        {
          path: "schedules",
          name: "LawyerSchedules",
          component: () =>
            /**webpackChunkName:LawyerCases*/
            "@/components/lawyer/LawyerSchedules.vue",
        },
      ],
    },
  ],
};

export default lawyerRoutes;

import { RouteMetaType } from "@/typings";
import { RouteRecordRaw } from "vue-router";

const lawyerRoutes: RouteRecordRaw = {
  path: "/lawyer",
  name: "lawyerDashboard",
  meta: {
    authorities: ["LAWYER"],
    title: "lawyer",
    requiresAuth: true,
    roles: ["lawyer"],
  } satisfies RouteMetaType,
  component: () =>
    /**webpackChunkName:Dashboard */ import(
      "@/layouts/LawyerDashboardLayout.vue"
    ),

  children: [
    {
      path: "",
      name: "lawyerOverview",
      component: () =>
        /**webpackChunkName:Overview */ import(
          "@/components/lawyer/LawyerOverview.vue"
        ),
    },
    /**
     * Lawyer Cases
     */
    {
      path: "cases",
      name: "lawyerCases",
      component: () =>
        /**webpackChunkName:Cases */ import(
          "@/components/lawyer/LawyerCases.vue"
        ),
    },
    /**
     * Lawyer schedules
     */
    {
      path: "schedules",
      name: "lawyerSchedules",
      component: () =>
        /**webpackChunkName:Schedules */ import(
          "@/components/lawyer/LawyerSchedules.vue"
        ),
    },

  
  ],
};

export default lawyerRoutes;

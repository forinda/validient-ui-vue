import { RouteRecordRaw } from "vue-router";

const lawyerRoutes: RouteRecordRaw = {
  path: "/lawyer",
  name: "LawyerLayout",
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
          path:"cases",
          name:"LawyerCases",
          component:()=>
           /**webpackChunkName:LawyerCases*/
           "@/components/lawyer/LawyerCases.vue"


        },
        {
          path:"schedules",
          name:"LawyerSchedules",
          component:()=>
           /**webpackChunkName:LawyerCases*/
           "@/components/lawyer/LawyerSchedules.vue"


        }
      ],
    },
  ],
};

export default lawyerRoutes;

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
      name: "lawyer",
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
          "@/components/lawyer/cases/LawyerCases.vue"
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
          "@/components/lawyer/schedules/LawyerSchedules.vue"
        ),
    },
    {
      path: "schedules/new",
      name: "lawyerSchedulesNew",
      component: () =>
        /**webpackChunkName:SchedulesNew */ import("@/components/lawyer/schedules/LawyerSchedulesNew.vue"),
    },
    /**
     * lawyer appointments
     */
    {
      path: "appointments",
      name: "lawyerAppointments",
      component: () =>
        /**webpackChunkName:SchedulesNew */ import("@/components/lawyer/appointments/LawyerAppointments.vue"),
    },{
      path:'appointments/new',
      name:'lawyerAppointmentsNew',
      component: () =>
        /**webpackChunkName:SchedulesNew */ import("@/components/lawyer/appointments/LawyerAppointmentsNew.vue"),
    },
    /**
     * Lawyer profile
     */
    {
      path: "profile",
      name: "lawyerProfile",
      component: () =>
        /**webpackChunkName:Profile */ import(
          "@/components/lawyer/profile/LawyerProfile.vue"
        ),
    },

  
  ],
};

export default lawyerRoutes;
import { RouteMetaType } from "@/typings";
import { RouteRecordRaw } from "vue-router";

const clientRoutes: RouteRecordRaw = {
  path: "/client",
  name: "clientWrapper",
  meta: {
    authorities: ["USER"],
    title: "Client",
    requiresAuth: true,
    roles: ["user"],
  } satisfies RouteMetaType,
  component: () =>
    /**webpackChunkName:ClientLayout */ import("@/layouts/ClientLayout.vue"),
  children: [
    {
      path: "",
      name: "clientWrap",
      component: () =>
        /**webpackChunkName:ClientLayout */ import(
          "@/layouts/ClientDashboardLayout.vue"
        ),
      children: [
        {
          path: "",
          name: "client",
          component: () =>
            /**webpackChunkName:ClientCases */ import(
              "@/components/client/ClientOverview.vue"
            ),
        },
        /**
         * Client Cases
         */
        {
          path: "cases",
          name: "ClientCases",
          component: () =>
            /**webpackChunkName:ClientCases */ import(
              "@/components/client/ClientCases.vue"
            ),
        },
        /**
         * Client Case Details
         */
        {
          path: "schedule",
          name: "clientSchedule",
          component: () =>
            /**webpackChunkName:ClientSchedule */ import(
              "@/components/client/ClientSchedule.vue"
            ),
        },
        /**
         * Client Appointments
         */
        {
          path: "clientAppointments",
          name: "clientAppointments",
          component: () =>
            /**webpackChunkName:ClientAppointments */ import(
              "@/components/client/ClientAppointments.vue"
            ),
        },
        {
          path: "clientAppointments/:id",
          name: "clientAppointmentDetails",
          component: () =>
            /**webpackChunkName:ClientAppointmentDetails */ import(
              "@/components/client/ClientAppointmentDetails.vue"
            ),
        },
      ],
    },
  ],
};

export default clientRoutes;

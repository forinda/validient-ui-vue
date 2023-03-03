import { RouteMetaType } from "@/typings";
import { RouteRecordRaw } from "vue-router";

const clientRoutes: RouteRecordRaw = {
  path: "/client",
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
     * Client schedules
     */
    {
      path: "schedule",
      name: "clientSchedule",
      component: () =>
        /**webpackChunkName:ClientSchedule */ import(
          "@/components/client/schedules/ClientSchedules.vue"
        ),
    },
    {
      path: "schedule/:id",
      name: "clientScheduleDetails",
      component: () =>
        /**webpackChunkName:ClientScheduleDetails */ import(
          "@/components/client/schedules/ClientScheduleView.vue"
        ),
    },
    {
      path: "schedule/:id/edit",
      name: "clientScheduleEdit",
      component: () =>
        /**webpackChunkName:ClientScheduleEdit */ import(
          "@/components/client/schedules/ClientScheduleEdit.vue"
        ),
    },
    {
      path: "schedule/create",
      name: "clientScheduleCreate",
      component: () =>
        /**webpackChunkName:ClientScheduleCreate */ import(
          "@/components/client/schedules/ClientScheduleCreate.vue"
        ),
    },
    {
      path: "schedule/:id/view",
      name: "clientScheduleView",
      component: () =>
        /**webpackChunkName:ClientScheduleView */ import(
          "@/components/client/schedules/ClientScheduleView.vue"
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
          "@/components/client/appointments/ClientAppointmments.vue"
        ),
    },
    {
      path: "clientAppointments/:id",
      name: "clientAppointmentDetails",
      component: () =>
        /**webpackChunkName:ClientAppointmentDetails */ import(
          "@/components/client/appointments/ClientAppointmentDetails.vue"
        ),
    },
  ],
};

export default clientRoutes;

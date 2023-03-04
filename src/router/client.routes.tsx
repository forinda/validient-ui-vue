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
      name: "clientSchedules",
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
    /**
     * Client Profile
     */
    {
      path: "profile",
      name: "clientProfile",
      component: () =>
        /**webpackChunkName:ClientProfile */ import(
          "@/components/client/profile/ClientViewProfile.vue"
        ),
    },
    {
      path: "profile/edit",
      name: "clientProfileEdit",
      component: () =>
        /**webpackChunkName:ClientProfileEdit */ import(
          "@/components/client/profile/ClientEditProfile.vue"
        ),
    },
    /**
     * Client Settings
     * */
    {
      path: "calendar",
      name: "clientCalendar",
      component: () =>
        /**webpackChunkName:ClientCalendar */ import(
          "@/components/client/calendar/ClientCalendar.vue"
        ),
    },
  ],
};

export default clientRoutes;

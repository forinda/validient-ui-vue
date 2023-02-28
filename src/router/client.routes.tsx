import { RouteMetaType } from "@/typings";
import { RouteRecordRaw } from "vue-router";

const clientRoutes: RouteRecordRaw = {
  path: "/client",
  name: "clientWrapper",
  meta: {
    authorities: ["USER"],
    title: "Client",
    requiresAuth: true,
    roles: ['user'],
  } satisfies RouteMetaType,
  component: () =>
    /**webpackChunkName:ClientLayout */ import("@/layouts/ClientLayout.vue"),
  children: [
    {
      path: "",
      name: "client",
      component: () =>
        /**webpackChunkName:ClientLayout */ import(
          "@/layouts/ClientDashboardLayout.vue"
        ),
      children: [
        {
          path: "cases",
          name: "ClientCases",
          component: () =>
            /**webpackChunkName:ClientCases */ import(
              "@/components/client/ClientCases.vue"
            ),
        },
        {
          path: "schedule",
          name: "ClientSchedule",
          component: () =>
            /**webpackChunkName:ClientSchedule */ import(
              "@/components/client/ClientSchedule.vue"
            ),
        },
      ],
    },
  ],
};

export default clientRoutes;

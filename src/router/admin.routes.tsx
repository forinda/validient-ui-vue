import { RouteMetaType } from "@/typings";
import { RouteRecordRaw } from "vue-router";

const adminRoutes: RouteRecordRaw = {
  
    path: "/admin",
    name: "adminDashboard",
    meta: {
      authorities: ["admin"],
      title: "Admin",
      requiresAuth: true,
      roles: ['admin'],
    } satisfies RouteMetaType,
    component: () =>
      /**webpackChunkName:Dashboard */ import(
        "@/layouts/AdminDashboardLayout.vue"
      ),
  
      children: [
        {
          path: "",
          name: "admin",
          component: () =>
            /**webpackChunkName:Overview */ import(
              "@/components/admin/AdminOverview.vue"
            ),
        },
        {
          path: "users",
          name: "adminUsers",
          component: () =>
            /**webpackChunkName:Users */ import(
              "@/components/admin/AdminUsers.vue"
            ),
        },
        {
          path: "roles",
          name: "adminRoles",
          component: () =>
            /**webpackChunkName:Roles */ import(
              "@/components/admin/AdminRoles.vue"
            ),
        },
        {
          path: "permissions",
          name: "adminPermissions",
          component: () =>
            /**webpackChunkName:Permissions */ import(
              "@/components/admin/AdminPermissions.vue"
            ),
        },
        {
          path: "settings",
          name: "AdminSettings",
          component: () =>
            /**webpackChunkName:Settings */ import(
              "@/components/admin/AdminSettings.vue"
            ),
        },
        {
          path: "profile",
          name: "adminProfile",
          component: () =>
            /**webpackChunkName:Profile */ import(
              "@/components/admin/AdminProfile.vue"
            ),
        },{
          path: "calendar",
          name: "adminCalendar",
          component: () =>
            /**webpackChunkName:Caleandar */ import(
              "@/components/admin/AdminCalendar.vue"
            ),

        },
        {
          path: "lawyers",
          name: "adminLawyers",
          component: () =>
            /**webpackChunkName:Lawyers */ import(
              "@/components/admin/AdminLawyers.vue"
            ),
        },
        {
          path: "clients",
          name: "adminClients",
          component: () =>
            /**webpackChunkName:Clients */ import(
              "@/components/admin/AdminClients.vue"
            ),
        },
        {
          path: "cases",
          name: "adminCases",
          component: () =>
            /**webpackChunkName:Cases */ import(
              "@/components/admin/AdminCases.vue"
            ),
        },
        {
          path: "appointments",
          name: "adminAppointments",
          component: () =>
            /**webpackChunkName:Appointments */ import(
              "@/components/admin/AdminAppointments.vue"
            ),
        },
      ]
};

export default adminRoutes;

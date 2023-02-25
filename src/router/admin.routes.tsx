import { RouteRecordRaw } from "vue-router";

const adminRoutes: RouteRecordRaw = {
  path: "/admin",
  name: "Admin",
  component: () =>
    /**webpackChunkName:AdminLayout */ import("@/layouts/AdminLayout.vue"),
  children: [
    {
      path: "",
      name: "AdminBase",
      component: () =>
        /**webpackChunkName:Login */ import("@/views/admin/BaseAdmin.vue"),
    },
    {
      path: "dashboard",
      name: "AdminDashboard",
      component: () =>
        /**webpackChunkName:Dashboard */ import(
          "@/layouts/AdminDashboardLayout.vue"
        ),
      children: [
        {
          path: "",
          name: "AdminDashboardOverview",
          component: () =>
            /**webpackChunkName:Overview */ import(
              "@/components/admin/AdminOverview.vue"
            ),
        },
        {
          path: "users",
          name: "AdminUsers",
          component: () =>
            /**webpackChunkName:Users */ import(
              "@/components/admin/AdminUsers.vue"
            ),
        },
        {
          path: "roles",
          name: "AdminRoles",
          component: () =>
            /**webpackChunkName:Roles */ import(
              "@/components/admin/AdminRoles.vue"
            ),
        },
        {
          path: "permissions",
          name: "AdminPermissions",
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
          name: "AdminProfile",
          component: () =>
            /**webpackChunkName:Profile */ import(
              "@/components/admin/AdminProfile.vue"
            ),
        },
        {
          path: "lawyers",
          name: "AdminLawyers",
          component: () =>
            /**webpackChunkName:Lawyers */ import(
              "@/components/admin/AdminLawyers.vue"
            ),
        },
        {
          path: "clients",
          name: "AdminClients",
          component: () =>
            /**webpackChunkName:Clients */ import(
              "@/components/admin/AdminClients.vue"
            ),
        },
        {
          path: "cases",
          name: "AdminCases",
          component: () =>
            /**webpackChunkName:Cases */ import(
              "@/components/admin/AdminCases.vue"
            ),
        },
        {
          path: "appointments",
          name: "AdminAppointments",
          component: () =>
            /**webpackChunkName:Appointments */ import(
              "@/components/admin/AdminAppointments.vue"
            ),
        },
      ],
    },
  ],
};

export default adminRoutes;

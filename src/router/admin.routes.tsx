import { RouteMetaType } from "@/typings";
import { RouteRecordRaw } from "vue-router";

const adminRoutes: RouteRecordRaw = {
  path: "/admin",
  name: "adminDashboard",
  meta: {
    authorities: ["admin"],
    title: "Admin",
    requiresAuth: true,
    roles: ["admin"],
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
      path: "users/new",
      name: "adminNewUser",
      component: () =>
        /**webpackChunkName:AdminNewUser */ import(
          "@/components/admin/AdminNewUser.vue"
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
    },
    {
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
    },{
      path: "lawyers/new",
      name: "adminNewLawyer",
      component: () =>
        /**webpackChunkName:Lawyers */ import(
          "@/components/admin/AdminNewLawyer.vue"
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
    },{
      path: "cases/new",
      name: "newAdminCase",
      component: () =>
        /**webpackChunkName:newAdminCaseFiling */ import(
          "@/components/admin/AdminNewCaseFiling.vue"
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
    {
      name: "newCaseType",
      path: "caseTypes/new",
      component: () =>
        /**webpackChunkName:NewCaseType */ import(
          "@/components/admin/NewCaseType.vue"
        ),
    },
    {
      name: "caseTypes",
      path: "casetypes",
      component: () =>
        /**webpackChunkName:caseTypes */ import(
          "@/components/admin/CaseTypes.vue"
        ),
    },
    {
      name: "caseStatuses",
      path: "caseStatuses",
      component: () =>
        /**webpackChunkName:CaseStatuses */ import(
          "@/components/admin/CaseStatuses.vue"
        ),
    },
    {
      name: "newCaseStatus",
      path: "caseStatuses/new",
      component: () =>
        /**webpackChunkName:NewCaseStatus */ import(
          "@/components/admin/NewCaseStatus.vue"
        ),
    },
    {
      name: "newCaseFiling",
      path: "casefiling/new",
      component: () =>
        /**webpackChunkName:NewCaseFiling */ import(
          "@/components/admin/NewCaseFiling.vue"
        ),
    },
    {
      name: "newUser",
      path: "user/new",
      component: () =>
        /**webpackChunkName:NewUser */ import("@/components/admin/NewUser.vue"),
    },
  ],
};

export default adminRoutes;

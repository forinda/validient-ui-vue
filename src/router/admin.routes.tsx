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
          "@/components/admin/users/AdminUsers.vue"
        ),
    },
    {
      path: "users/new",
      name: "adminNewUser",
      component: () =>
        /**webpackChunkName:AdminNewUser */ import(
          "@/components/admin/users/AdminNewUser.vue"
        ),
    },
    {
      path: "roles",
      name: "adminRoles",
      component: () =>
        /**webpackChunkName:Roles */ import(
          "@/components/admin/roles/AdminRoles.vue"
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
          "@/components/admin/profile/AdminProfile.vue"
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
    /**
     * Lawyers
     */
    {
      path: "lawyers",
      name: "adminLawyers",
      component: () =>
        /**webpackChunkName:Lawyers */ import(
          "@/components/admin/lawyers/AdminLawyers.vue"
        ),
    },{
      path: "lawyers/new",
      name: "adminNewLawyer",
      component: () =>
        /**webpackChunkName:Lawyers */ import(
          "@/components/admin/lawyers/AdminNewLawyer.vue"
        ),
    },
    {
      path: "lawyers/:lawyerId/user/:userId",
      name: "adminLawyerDetails",
      component: () =>
        /**webpackChunkName:LawyerDetails */ import(
          "@/components/admin/lawyers/AdminLawyerDetails.vue"
        ),

    },
    /**
     * Clients
     */
    {
      path: "clients",
      name: "adminClients",
      component: () =>
        /**webpackChunkName:Clients */ import(
          "@/components/admin/AdminClients.vue"
        ),
    },
    /**
     * Cases
     */
    {
      path: "cases",
      name: "adminCases",
      component: () =>
        /**webpackChunkName:Cases */ import(
          "@/components/admin/cases/AdminCases.vue"
        ),
    },{
      path: "cases/new",
      name: "newAdminCase",
      component: () =>
        /**webpackChunkName:newAdminCaseFiling */ import(
          "@/components/admin/cases/AdminNewCaseFiling.vue"
        ),
    },{
      path: "cases/:caseId/edit",
      name: "editAdminCase",
      component: () =>
        /**webpackChunkName:editAdminCaseFiling */ import(
          "@/components/admin/cases/AdminEditCaseFiling.vue"
        ),
    },{
      path: "cases/:caseId",
      name: "adminCaseDetails",
      component: () =>
        /**webpackChunkName:adminCaseDetails */ import(
          "@/components/admin/cases/AdminCaseDetails.vue"
        ),
    }
    /**
     * Appointments
     */
    ,
    {
      path: "appointments",
      name: "adminAppointments",
      component: () =>
        /**webpackChunkName:Appointments */ import(
          "@/components/admin/appointments/AdminAppointments.vue"
        ),
    },
    {
      path: "appointments/new",
      name: "adminNewAppointment",
      component: () =>
        /**webpackChunkName:NewAppointment */ import(
          "@/components/admin/appointments/AdminNewAppointment.vue" 
        ),
    },
    {
      path: "appointments/:appointmentId",
      name: "adminAppointmentDetails",
      component: () =>
        /**webpackChunkName:AppointmentDetails */ import(
          "@/components/admin/appointments/AdminAppointmentDetails.vue"
        ),
        
    },
    {
      name: "newCaseType",
      path: "caseTypes/new",
      component: () =>
        /**webpackChunkName:NewCaseType */ import(
          "@/components/admin/cases/NewCaseType.vue"
        ),
    },
    {
      name: "caseTypes",
      path: "casetypes",
      component: () =>
        /**webpackChunkName:caseTypes */ import(
          "@/components/admin/cases/CaseTypes.vue"
        ),
    },
    {
      name: "caseStatuses",
      path: "caseStatuses",
      component: () =>
        /**webpackChunkName:CaseStatuses */ import(
          "@/components/admin/cases/CaseStatuses.vue"
        ),
    },
    {
      name: "newCaseStatus",
      path: "caseStatuses/new",
      component: () =>
        /**webpackChunkName:NewCaseStatus */ import(
          "@/components/admin/cases/NewCaseStatus.vue"
        ),
    },
    {
      name: "newCaseFiling",
      path: "casefiling/new",
      component: () =>
        /**webpackChunkName:NewCaseFiling */ import(
          "@/components/admin/cases/AdminNewCaseFiling.vue"
        ),
    },
    /**
     * Users
     */
    {
      name: "newUser",
      path: "user/new",
      component: () =>
        /**webpackChunkName:NewUser */ import("@/components/admin/NewUser.vue"),
    },
    {
      name: "adminUserDetails",
      path: "user/:userId",
      component: () =>
        /**webpackChunkName:AdminUserDetails */ import(
          "@/components/admin/users/AdminUserDetails.vue"
        ),}
  ],
};

export default adminRoutes;

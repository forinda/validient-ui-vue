import { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";
import { RouteMetaType } from "@/typings";

const baseRoutes: RouteRecordRaw = {
  path: "/",
  name: "base",
  component: () =>
    /**webpackChunkName:Base */ import("@/layouts/BaseLayout.vue"),

  children: [
    {
      path: "/",
      name: "home",
      component: () =>
        /**webpackChunkName:Homepage */ import("@/views/HomePage.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        /**webpackChunkName:About */ import("@/views/AboutPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        /**webpackChunkName:Login */ import("@/views/LoginPage.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.authenticated && authStore.authStateAccessTokenValid) {
          next({ name: "home" });
        }
        next();
      },
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        /**webpackChunkName:Register */ import("@/views/RegisterPage.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.authenticated && authStore.authStateAccessTokenValid) {
          next({ name: "home" });
        }
        next();
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () =>
        /**webpackChunkName:Contact */ import("@/views/ContactPage.vue"),
    },
    {
      path: "/faq",
      name: "faq",
      component: () => /**webpackChunkName:FAQ */ import("@/views/FAQs.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      meta: {
        requiresAuth: true,
        authorities: ["USER", "ADMIN", "LAWYER"],
        roles: ["user", "admin", "lawyer"],
        title: "Logout",
      } satisfies RouteMetaType,
      component: () =>
        /**webpackChunkName:Logout */ import("@/views/Logout.vue"),
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.authStateAuthenticated) {
          await authStore.logoutUser();
          next({ name: "home" });
        }
        next();
      },
    },
  ],
};

export default baseRoutes;

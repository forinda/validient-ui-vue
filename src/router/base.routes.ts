import { RouteRecordRaw } from "vue-router";

const baseRoutes: RouteRecordRaw = {
  path: "/",
  name: "Base",
  component: () =>
    /**webpackChunkName:Base */ import("@/layouts/BaseLayout.vue"),

  children: [
    {
      path: "/",
      name: "Home",
      component: () =>
        /**webpackChunkName:Homepage */ import("@/views/HomePage.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        /**webpackChunkName:About */ import("@/views/AboutPage.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () =>
        /**webpackChunkName:Login */ import("@/views/LoginPage.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () =>
        /**webpackChunkName:Register */ import("@/views/RegisterPage.vue"),
    },
    {
      path: "/contact",
      name: "Contact",
      component: () =>
        /**webpackChunkName:Contact */ import("@/views/ContactPage.vue"),
    },
    {
      path: "/faq",
      name: "FAQ",
      component: () => /**webpackChunkName:FAQ */ import("@/views/FAQs.vue"),
    },
  ],
};

export default baseRoutes;

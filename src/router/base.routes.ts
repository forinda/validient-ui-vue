import { RouteRecordRaw } from "vue-router";

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
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        /**webpackChunkName:Register */ import("@/views/RegisterPage.vue"),
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
  ],
};

export default baseRoutes;

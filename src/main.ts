import "./style.css";

import App from "./App.vue";
import Fa from "@/plugins/fontawesome";
import Multiselect from "@vueform/multiselect";
import { RouteMetaType } from "@/typings";
import VCalendar from "v-calendar";
import VueApexCharts from "vue3-apexcharts";
import { createApp } from "vue";
import filterUserRoles from "./utils/roleFilter";
import piniaPlugin from "@/plugins/piniaPlugin";
import router from "@/router";
import useAuthStore from "@/store/useAuthStore";

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  const { requiresAuth, authorities, roles, title } = to.meta as RouteMetaType;
  type RoleType = "admin" | "user" | "lawyer";
  if (requiresAuth) {
    if (!store.authStateAuthenticated) {
      next({ name: "login" });
    } else if (authorities.length > 0) {
      const userRole = filterUserRoles(store.authUserRoles!) as RoleType;

      const authMatch = roles.some((role) => {
        return role === userRole;
      });
      if (!authMatch) {
        next({ name: "home" });
      }
    }
  }
  next();
});

router.beforeResolve((to, from, next) => {
  console.log("beforeResolve");
  console.log({ to, from });
  next();
});
/**@ts-ignore */
createApp(App)
  .component("fa", Fa)
  .use(VCalendar, {})
  .use(VueApexCharts)
  .use(router)
  .component("multi-select", Multiselect)
  .use(piniaPlugin)
  .mount("#app");

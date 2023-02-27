import "./style.css";

import App from "./App.vue";
import Fa from "@/plugins/fontawesome";
import VCalendar from 'v-calendar';
import VueApexCharts from "vue3-apexcharts";
import { createApp } from "vue";
import piniaPlugin from "@/plugins/piniaPlugin";
import router from "@/router";

router.beforeEach((to, from, next) => {
  console.log("beforeEach");
  console.log({ to, from });
  next();
});

router.beforeResolve((to, from, next) => {
  console.log("beforeResolve");
  console.log({ to, from });
  next();
});

createApp(App)
  .component("fa", Fa)
  .use(VCalendar, {})
  .use(VueApexCharts)
  .use(router)
  .use(piniaPlugin)
  .mount("#app");

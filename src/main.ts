import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import Fa from "@/plugins/fontawesome";
import VueApexCharts from "vue3-apexcharts";
import VCalendar from 'v-calendar';

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
  .mount("#app");

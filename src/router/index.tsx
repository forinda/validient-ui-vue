import { createRouter, createWebHashHistory } from "vue-router";
import adminRoutes from "./admin.routes";
import baseRoutes from "./base.routes";
import clientRoutes from "./client.routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [baseRoutes, adminRoutes, clientRoutes],
});

export default router;

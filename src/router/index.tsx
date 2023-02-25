import { createRouter, createWebHashHistory } from "vue-router";
import adminRoutes from "./admin.routes";
import baseRoutes from "./base.routes";
import clientRoutes from "./client.routes";
import lawyerRoutes from "./lawyer.routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [baseRoutes, adminRoutes, clientRoutes,lawyerRoutes],
});

export default router;

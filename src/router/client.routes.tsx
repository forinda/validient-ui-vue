import { RouteRecordRaw } from "vue-router";

const clientRoutes: RouteRecordRaw = {
  path: "/profile",
  name: "Client",
  component: () =>
    /**webpackChunkName:ClientLayout */ import("@/layouts/ClientLayout.vue"),
  children: [
    {
      path:"",
      name:"ClientDashboardLayout",
      component:()=>
       /**webpackChunkName:ClientLayout */ import("@/layouts/ClientDashboardLayout.vue"),
       children:[
        
        {
          path: "cases",
          name: "ClientCases",
          component: () =>
            /**webpackChunkName:ClientCases */ import(
              "@/components/client/ClientCases.vue"
            ),
        },
        {
          path: "schedule",
          name: "ClientSchedule",
          component: () =>
            /**webpackChunkName:ClientSchedule */ import(
              "@/components/client/ClientSchedule.vue"
            ),
        },

       ]
    }
  ],
};

export default clientRoutes;

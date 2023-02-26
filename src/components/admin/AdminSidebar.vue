<script setup lang="ts">
import Logo from "../Logo.vue";
import { ref } from "vue";
type MenuItem = {
  name: string;
  icon: string;
  route: string;
  title: string;
};
const menuItems = ref<Array<MenuItem>>([
  {
    name: "AdminDashboardOverview",
    icon: "fa fa-dashboard",
    route: "AdminDashboardOverview",
    title: "Dashboard",
  },
  {
    name: "Admin Appointments",
    icon: "fa fa-calendar",
    route: "AdminAppointments",
    title: "Appointments",
  },
  {
    name: "Admin Clients",
    icon: "fa fa-user",
    route: "AdminClients",
    title: "Clients",
  },
  {
    name: "Admin lawyers",
    icon: "fa fa-user",
    route: "AdminLawyers",
    title: "Lawyers",
  },
  {
    name: "AdminUsers",
    icon: "fa fa-users",
    route: "AdminUsers",
    title: "Users",
  },
  {
    name: "AdminRoles",
    icon: "fa fa-user-shield",
    route: "AdminRoles",
    title: "Roles",
  },
  {
    name: "AdminPermissions",
    icon: "fa fa-lock-open",
    route: "AdminPermissions",
    title: "Permissions",
  },
  {
    name: "AdminProfile",
    icon: "fa fa-user",
    route: "AdminProfile",
    title: "Profile",
  },
  {
    name: "AdminSettings",
    icon: "fa fa-cog",
    route: "AdminSettings",
    title: "Settings",
  },
]);
</script>
<template>
  <aside
    class="h-screen bg-color2 border-r flex flex-col justify-between p-4 overflow-scroll no-scrollbar absolute w-60 top-0"
  >
    <div class="flex flex-col gap-3">
      <router-link
        :to="{ name: 'Admin' }"
        class="flex justify-center flex-col items-center"
      >
        <div class="h-8 w-8 text-color1">
          <Logo />
        </div>
        <h1 class="block text-color1">Validient</h1>
      </router-link>
      <hr />
      <div class="flex flex-col gap-4 overflow-scroll no-scrollbar">
        <router-link
          v-for="{ icon, name, route, title } in menuItems"
          :to="{ name: route }"
          :key="name"
          class="flex items-center gap-4 p-2 rounded-md text-color7 hover:bg-neutral-200 hover:text-color2 bg-opacity-25 transition-all ease-in duration-200 text-xl"
        >
          <div>
            <fa :icon="icon"></fa>
            <span class="ml-2">{{ title }}</span>
          </div>
        </router-link>
      </div>
    </div>
    <div>
      <button class="bg-color7 text-color2 w-full py-2 rounded-md">
        Logout
      </button>
    </div>
  </aside>
</template>
<style scoped>
.router-link-exact-active {
  @apply text-color2 bg-color3;
}
</style>

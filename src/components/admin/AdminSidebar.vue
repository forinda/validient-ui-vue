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
    name: "admin",
    icon: "fa fa-dashboard",
    route: "admin",
    title: "Dashboard",
  },
  {
    name: "Admin Appointments",
    icon: "fa fa-calendar",
    route: "adminAppointments",
    title: "Appointments",
  },
  {
    name: "Admin Clients",
    icon: "fa fa-user",
    route: "adminClients",
    title: "Clients",
  },
  {
    name: "Admin lawyers",
    icon: "fa fa-user",
    route: "adminLawyers",
    title: "Lawyers",
  },
  {
    name: "AdminUsers",
    icon: "fa fa-users",
    route: "adminUsers",
    title: "Users",
  },
  {
    name: "AdminRoles",
    icon: "fa fa-user-shield",
    route: "adminRoles",
    title: "Roles",
  },
  {
    name: "AdminPermissions",
    icon: "fa fa-lock-open",
    route: "adminPermissions",
    title: "Permissions",
  },
  {
    name: "AdminProfile",
    icon: "fa fa-user",
    route: "adminProfile",
    title: "Profile",
  },
]);
</script>
<template>
  <aside
    class="h-screen bg-color2 border-r flex flex-col justify-between p-4 overflow-scroll no-scrollbar absolute w-60 top-0"
  >
    <div class="flex flex-col gap-3">
      <router-link
        :to="{ name: 'admin' }"
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
      <router-link :to="{name:'logout'}" class="bg-color7 text-color2 w-full py-2 rounded-md block text-center">
        Logout
      </router-link>
    </div>
  </aside>
</template>
<style scoped>
.router-link-exact-active {
  @apply text-color2 bg-color3;
}
</style>

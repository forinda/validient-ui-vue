<script setup lang="ts">
import Logo from "../Logo.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import sidebarLinks from "@/data/sidebarLinks";

const { authStateUser } = storeToRefs(useAuthStore());
</script>
<template>
  <div class="h-screen flex flex-col w-full bg-color2 text-white overflow-y-scroll">
    <div class="flex flex-col justify-center items-center pt-10 pb-7">
      <p class="rounded-full">
        <img :src="authStateUser?.avatar!" alt="" class="rounded-full h-20 w-20">
      </p>
      <p>{{ authStateUser?.username }}</p>
      <p>{{ authStateUser?.email }}</p>
    </div>
    <hr class="shadow text-2xl bg-neutral-300">
    <div class="flex flex-col px-4 pt-10 gap-4">
      <router-link v-for="{ icon, title, path } in sidebarLinks.admin" :to="{ name: path }" :key="title"
        class="flex items-center gap-4 p-2 rounded-md hover: hover:text-color1 bg-opacity-25 transition-all ease-in duration-200 text-xl border">
        <div>
          <fa :icon="icon"></fa>
          <span class="ml-2" text->{{ title }}</span>
        </div>
      </router-link>
    </div>

  </div>
</template>
<style scoped>
.router-link-exact-active {
  @apply text-color2 bg-color3;
}
</style>

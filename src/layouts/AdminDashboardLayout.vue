<template>
   <div class="flex flex-col ">
      <div class="shadow-md fixed w-60">
        <admin-sidebar />
      </div>
      <div class="ml-60">
      <admin-header></admin-header>
      <div class="min-h-screen">
        <router-view></router-view>
      </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
</script>

<style scoped></style>

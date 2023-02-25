<template>
  <div class="grid grid-cols-[280px_1fr] bg-color8 p-4">
    <AdminSidebar />
    <div class="p-4">
      <AdminHeader />
      <main class="w-full p-4 ">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
</script>

<style scoped></style>

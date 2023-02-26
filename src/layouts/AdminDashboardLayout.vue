<template>
  <div class="">
   
    <AdminSidebar />
   
    <div class="flex flex-col ml-60">
     
        <AdminHeader />
      
      <div class=" bg-color8 h-full w-full ">
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

<template>
  <div class="flex flex-col ">
    <div class="h-24">
      <client-header />
    </div>
    <div class="grid grid-cols-[280px_1fr] h-[calc(100vh_-_9rem)] pt-5">
      <div class="shadow-md">
        <client-sidebar />
      </div>
      <div class="bg-color3">
        <router-view></router-view>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import ClientHeader from '@/components/client/ClientHeader.vue';
import ClientSidebar from '@/components/client/ClientSidebar.vue';

</script>

<style scoped></style>

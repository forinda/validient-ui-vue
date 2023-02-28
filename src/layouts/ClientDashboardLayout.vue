<template>
  <div class="flex flex-col ">
      <div class="shadow-md bg-neutral-100 fixed w-60">
        <client-sidebar />
      </div>
      <div class="ml-60 ">
      <client-header></client-header>
      <div class="min-h-screen">
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

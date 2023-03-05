<template>
 <div class="flex flex-col ">
      <div class="shadow-md fixed w-60">
        <lawyer-sidebar />
      </div>
      <div class="ml-60 ">
      <lawyer-header></lawyer-header>
      <div class="min-h-screen">
        <router-view></router-view>
      </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import LawyerHeader from '@/components/lawyer/LawyerHeader.vue';
import LawyerSidebar from '@/components/lawyer/LawyerSidebar.vue';

</script>

<style scoped></style>

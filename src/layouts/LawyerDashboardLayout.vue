<template>
  <div class="">
    <div class="h-24">
      <lawyer-header />
    </div>
    <div class="grid grid-cols-[280px_1fr] ">
     <div>
      <lawyer-sidebar />
     </div>
     <div class="bg-slate-300">
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

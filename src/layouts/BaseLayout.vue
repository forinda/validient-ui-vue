<template>
    <div class="w-full">
        <NavBar />
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>
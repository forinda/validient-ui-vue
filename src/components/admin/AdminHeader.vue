<template>
    <div class=" flex gap-3 bg-white drop-shadow-lg p-[16px_20px] h-20 w-full justify-between items-center">
        <router-link :to="{ name: 'home' }" class="flex items-center gap-4 pt-5 ">
            <fa icon="fa fa-bars"></fa>
            <span class="text-md uppercase font-medium">
                Validient
            </span>
        </router-link>
        <div>
            <img src="https://xsgames.co/randomusers/assets/avatars/male/40.jpg" class="h-8 w-8 object-cover rounded-full" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
// import Logo from '../Logo.vue';
</script>

<style scoped></style>

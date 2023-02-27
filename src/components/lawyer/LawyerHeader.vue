
<script setup lang="ts">
import Logo from '../Logo.vue';
</script>

<template>
    <div class=" flex gap-3 bg-white drop-shadow-lg p-[16px 20px] h-16 w-full">
        <router-link :to="{ name: 'home' }" class="flex items-center gap-4 pt-5">
            <Logo class="text-color1 font-bold" />
            <h1 class="text-2xl font-bold">
                Validient
                <span class="text-2xl font-bold">Law</span>
            </h1>
        </router-link>
        <nav class="flex items-center gap-3 justify-center pt-[30px] ">
           
           <router-link :to="{name:'home'}">Home</router-link>

        </nav>
    </div>
</template> 

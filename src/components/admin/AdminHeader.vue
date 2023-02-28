<script setup lang="ts">
// import Logo from '../Logo.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from "@/store/useAuthStore";
const { authStateUser } = storeToRefs(useAuthStore())
</script>

<template>
    <div class=" flex items-center justify-between gap-3 border-b-2 bg-white h-16 p-2 w-full sticky top-0 z-[10000]">
        <router-link :to="{ name: 'home' }" class="flex items-center gap-4 pt-5">
            <Logo class="text-color1 font-bold" :height="8" :w="8" />
            <h1 class="font-bold uppercase">
                Validient
            </h1>
        </router-link>
        <div class="flex items-center gap-4">
            <div>
                <router-link to="#" class="text-blue-700 hover:underline">@{{ authStateUser?.username! }}</router-link>
            </div>
            <img :src="authStateUser?.avatar!" alt="" class="h-12 w-12 object-cover rounded-full">
            <router-link :to="{ name: 'logout' }"
                class="px-4 py-2 rounded-full border text-white bg-color2">Logout</router-link>
        </div>
    </div>
</template>




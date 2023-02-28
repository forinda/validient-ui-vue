<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useAuthStore} from '@/store/useAuthStore'
import { ref } from "vue";
const {authStateUser} = storeToRefs(useAuthStore())
type MenuItem = {
    name: string;
    icon: string;
    route: string;
    title: string;
};
const menuItems = ref<Array<MenuItem>>([
    {
        name: "Dashboard",
        icon: "fa fa-dashboard",
        route: "client",
        title: "Dashboard",
    },  {
        name: "ClientCases",
        icon: "fa fa-gavel",
        route: "ClientCases",
        title: "Cases",
    },
    {
        name: "ClientSchedule",
        icon: "fa fa-calendar",
        route: "ClientSchedule",
        title: "Schedule",
    },

]);
</script>
<template class="">
    <div class="h-screen flex flex-col w-full">
        <div class="flex flex-col justify-center items-center pt-10 pb-7">
            <p class="rounded-full">
            <img :src="authStateUser?.avatar!" alt="" class="rounded-full h-20 w-20">
            </p>
            <p>{{ authStateUser?.username }}</p>
            <p>{{authStateUser?.email}}</p>
        </div>
        <hr class="shadow text-2xl bg-neutral-300">
        <div class="flex flex-col px-4 pt-10 gap-4">
            <router-link v-for="{ icon, name, route, title } in menuItems" :to="{ name: route }" :key="name"
                class="flex items-center gap-4 p-2 rounded-md hover: hover:text-color1 bg-opacity-25 transition-all ease-in duration-200 text-xl border">
                <div>
                    <fa :icon="icon"></fa>
                    <span class="ml-2" text->{{ title }}</span>
                </div>
            </router-link>
        </div>

    </div>
</template>
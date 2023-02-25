<script setup lang="ts">

import { ref } from "vue";
type MenuItem = {
    name: string;
    icon: string;
    route: string;
    title: string;
};
const menuItems = ref<Array<MenuItem>>([
    {
        name: "ClientCases",
        icon: "fa fa-dashboard",
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
<template class="fixed">
    <div class="h-screen flex flex-col w-full  bg-white shadow-md">
        <div class="flex flex-col justify-center items-center pt-10 pb-7">
            <p class="rounded-full bg-neutral-500">avatar</p>
            <p>validei</p>
            <p>valiedies@gmail.com</p>
        </div>
        <hr class="shadow text-2xl bg-neutral-300">
        <div class="flex flex-col gap-2 pt-11">
            <router-link v-for="{ icon, name, route, title } in menuItems" :to="{ name: route }" :key="name"
                class="flex items-center gap-4 p-2 rounded-md text-sky-400 hover:bg-[blue] hover:text-white bg-opacity-25 transition-all ease-in duration-200 text-xl">
                <div>
                    <fa :icon="icon"></fa>
                    <span class="ml-2" text->{{ title }}</span>
                </div>
            </router-link>
        </div>

    </div>
</template>
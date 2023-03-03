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
        name: "LawyerCases",
        icon: "fa fa-dashboard",
        route: "lawyerCases",
        title: "Cases",
    },
    {
        name: "LawyerSchedules",
        icon: "fa fa-dashboard",
        route: "lawyerSchedules",
        title: "Schedules",
    },
]);
</script>
<template>
    <div class="h-screen flex flex-col w-full  bg-white shadow-lg">
        <div class="flex flex-col justify-center items-center pt-10 pb-7">
            <p class="rounded-full bg-neutral-500">avatar</p>
            <p>Lawyer</p>
            <p>lawyer@gmail.com</p>
        </div>
        <hr class="shadow text-2xl bg-neutral-300">
        <div class="flex flex-col gap-2 pt-11">
            <router-link v-for="{ icon, name, route, title } in menuItems" :to="{ name: route }" :key="name"
                class="flex items-center gap-4 p-2 rounded-md text-sky-500 hover:bg-[blue] hover:text-white bg-opacity-25 transition-all ease-in duration-200 text-xl">
                <div>
                    <fa :icon="icon" class="text-opacity-200"></fa>
                    <span class="ml-2" text->{{ title }}</span>
                </div>
            </router-link>
        </div>

    </div>
</template>
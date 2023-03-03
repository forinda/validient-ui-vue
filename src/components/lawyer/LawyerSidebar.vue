<script setup lang="ts">

import sidebarLinks from "@/data/sidebarLinks";
import { ref } from "vue";

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
            <router-link v-for="{ icon, title,path } in sidebarLinks.lawyer" :to="{ name: path }" :key="title"
                class="flex items-center gap-4 p-2 rounded-md text-sky-500 hover:bg-[blue] hover:text-white bg-opacity-25 transition-all ease-in duration-200 text-xl">
                <div>
                    <fa :icon="icon" class="text-opacity-200"></fa>
                    <span class="ml-2" text->{{ title }}</span>
                </div>
            </router-link>
        </div>

    </div>
</template>
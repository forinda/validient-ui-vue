<script setup lang="ts">
import { ref } from "vue"

type TableItems = {
    name: String,

}
const tableItems = ref<Array<TableItems>>([
    {
        name: "Case",

    },
    {
        name: "CaseType",

    },

    {
        name: "Lawyer",


    }


])
</script>

<template>
    <div class="flex items-center justify-center w-full h-[300px] pt-7">
        <table class="table-auto shadow rounded">
            <thead class="bg-slate-100 flex gap-3 divide-x">
                <tr v-for="({ name }) of tableItems" class="divide-x p-2 border-spacing-1">
                    <th class="text-2xl font-semibold px-10 py-3">{{ name }}</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <!-- <td>Murder</td>
                    <td>Lorem ipsum dolor sit amet.</td>
                    <td>Felix</td> -->
                </tr>
                <!-- <tr>
                                <td>Defile</td>
                                <td>Stealing</td>
                                <td>Lisa</td>
                            </tr>
                            <tr>
                                <td>urder</td>
                                <td>Murder</td>
                                <td>Fiona</td>
                            </tr> -->
            </tbody>
        </table>
    </div>
</template>
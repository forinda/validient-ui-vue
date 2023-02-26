<script setup lang="ts">
import { ref ,computed} from "vue"
// <reference path="" /

type UserStates = {
  name: string;
  age: number;
  email: string;
  active: boolean;

};


const tableBody = ref<Array<UserStates>>(
  [

    {
      name: "rose rose",
      email: "rose@gmail.com",
      age: 19,
      active: true

    },
    {
      name: "rose",
      email: "rose@gmail.com",
      age: 19,
      active: true

    }
    ,
    {
      name: "rose",
      email: "rose@gmail.com",
      age: 19,
      active: true

    },
    {
      name: "rose",
      email: "rose@gmail.com",
      age: 19,
      active: true

    },
    {
      name: "rose rose",
      email: "rose@gmail.com",
      age: 19,
      active: true

    },
    {
      name: "rose",
      email: "rose@gmail.com",
      age: 19,
      active: true

    }
    ,
    {
      name: "rose",
      email: "rose@gmail.com",
      age: 19,
      active: true

    },
    {
      name: "rose",
      email: "rose@gmail.com",
      age: 19,
      active: true

    }
  ],
)
// pagination details
const currentPage = ref(1)
const pageSize = 5

const pageCount = computed(() => {
  return Math.ceil(tableBody.value.length / pageSize);
});

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return tableBody.value.slice(startIndex, endIndex);
});



</script>
<template>
  <!-- table -->

  <div class="bg-white shadow rounded-md  w-full h-full">
    <h1 class="text-center capitalize font-rubik text-3xl font-semibold pb-3">Validient Users Management Board</h1>
    <div>
      <table class="table-auto flex justify-center items-center flex-col ">
        <thead>
          <tr>
            <th class="px-12 py-3"> User <span>
                <fa icon="fa fa-users"></fa>
              </span></th>
            <th class="px-12 py-3">Email</th>
            <th class="px-12 py-3">Age</th>
            <th class="px-12 py-3">Active</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detail in paginatedItems" :key="detail.email">
            <td class="border px-11 py-3">{{ detail.name }}</td>
            <td class="border px-11 py-3">{{ detail.email }}</td>
            <td class="border px-11 py-3">{{ detail.age }}</td>
            <td class="border px-11 py-3 flex gap-4">{{ detail.active }} <span class="flex-end">
                <fa icon="fa fa-ellipsis-vertical"></fa>
              </span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center items-center gap-2 pb-4">
        <button class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300" v-if="currentPage > 1"
          @click="currentPage--">Previous</button>
        <button v-for="page in pageCount" :key="page" @click="currentPage = page"> >{{ page }}</button>
        <button class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300" v-if="currentPage < pageCount"
          @click="currentPage++">Next</button>
      </div>
  </div>
</template>
<style scoped></style>

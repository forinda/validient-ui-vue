<script setup lang="ts">
import { UserType, GenderType, UserRoleType, UserAuthorityType } from '@/typings'
import { users } from "@/data/userdata"
import { Url } from "url";
import { ref, computed } from "vue"
// <reference path="" /
// modal
const showModal = ref(false)
const close = () => {
  showModal.value = false
}


const tableBody = ref<Array<UserType>>(
  users
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
  <!-- modal -->
  <div class="fixed z-20 inset-0 overflow-y-auto" :class="{ 'hidden': !showModal }">
    <div class="flex items-center justify-center min-h-screen">

      <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog" aria-modal="true" aria-labelledby="modal-title">


        <fa @click="close" icon="fa fa-close"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:ml-3 sm:w-auto sm:text-sm sm:leading-5">
        </fa>

        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col">
          Permissions
          help

        </div>
      </div>
    </div>
  </div>
  <!-- table -->

  <div class="bg-white shadow rounded-md  w-full h-full">
    <div class="overflow-scroll p-10 no-scrollbar">
      <table class="table-auto w-full text-sm text-center text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-sm shadow-lg">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>

              <div class="flex items-center justify-center">
                <input id="checkbox-all-search" type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" v-for="tabl in Object.keys(tableBody[0])" class="px-6 py-3">{{ tabl }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedItems" :key="user.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <td v-for="objKey of Object.keys(user)">
              <div v-if="objKey === 'avatar'" class="flex justify-center items-centers">
                <img :src="user.avatar ? user.avatar : ''" alt="" class="h-8 w-8 rounded-full object-cover">
              </div>
              <div v-else-if="objKey === 'roles'">
                <select name="" id="">
                  <option v-for="role in user.roles" value="">{{ role.name }}</option>
                </select>
              </div>
              <div v-else-if="objKey === 'authorities'">
                <select name="" id="">
                  <option v-for="{ authority } in user.authorities" value="">{{ authority.toLowerCase() }}</option>
                </select>
              </div>
              <div v-else>{{ user[objKey] }}</div>
            </td>

          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <div class="flex justify-center items-center gap-2 pb-4">
        <button class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300" v-if="currentPage > 1"
          @click="currentPage--">Previous</button>
        <button v-for="page in pageCount" :key="page" @click="currentPage = page"> &gt;{{ page }}</button>
        <button class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300" v-if="currentPage < pageCount"
          @click="currentPage++">Next</button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

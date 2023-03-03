<script setup lang="ts">
import { publicAxios } from "@/api";
import { LawyerType, UserType } from "@/typings";
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useAuthStore from "@/store/useAuthStore";

const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore());
// pagination
const lawyersList = ref<LawyerType[]>([]);
// const userList = ref<LawyerType[]>([]);

const currentPage = ref(1);
const pageSize = 10;

const pageCount = computed(() => {
  return Math.ceil(lawyersList.value.length / pageSize);
});
console.log(pageCount);

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return lawyersList.value.slice(startIndex, endIndex);
});
// fetch data
onMounted(async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  const fetchLawyers = async () => {
    try {
      const res = await publicAxios.get("/lawyers", config);
      lawyersList.value = res.data;
      console.log("lawyers", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return Promise.all([fetchLawyers()]);
});
</script>
<template>
  <main>
    <!-- Quick actions -->
    <div class="rounded-md border-b p-4 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold uppercase">Lawyers</h1>
      </div>
      <div>
        <router-link
          :to="{ name: 'adminNewLawyer' }"
          class="bg-color2 px-4 py-2 rounded-md text-color3"
        >
          Add new Lawyer
        </router-link>
      </div>
    </div>
    <div class="bg-white shadow rounded-md w-full h-full">
      <div class="overflow-scroll p-10 no-scrollbar">
        <!-- page -->
        <!-- <div class="flex justify-center items-center gap-2 pb-4">
          <button
            class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            v-if="currentPage > 1"
            @click="currentPage--"
          >
            Previous
          </button>
          <button
            v-for="page in pageCount"
            :key="page"
            @click="currentPage = page"
          >
            >{{ page }}
          </button>
          <button
            class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            v-if="currentPage < pageCount"
            @click="currentPage++"
          >
            Next
          </button>
        </div> -->
      </div>
    </div>
    <div class="bg-white border overflow-scroll no-scrollbar">
      <table
        v-if="lawyersList.length > 0"
        class="table-auto w-full text-sm text-center text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-sm"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th>
              <div class="flex items-center justify-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </th>
            <th scope="col" class="px-6 py-3">id</th>
            <th scope="col" class="px-6 py-3">unique-identifier</th>
            <th scope="col" class="px-6 py-3">avatar</th>
            <th scope="col" class="px-6 py-3">username</th>
            <th scope="col" class="px-6 py-3">first name</th>
            <th scope="col" class="px-6 py-3">last name</th>
            <th scope="col" class="px-6 py-3">gender</th>
            <th scope="col" class="px-6 py-3">email</th>
            <th scope="col" class="px-6 py-3">specialization</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lawyer in paginatedItems"
            :key="lawyer.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div class="flex items-center justify-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td>
              {{ lawyer.id }}
            </td>
            <td>
              {{ lawyer.identification }}
            </td>
            <td>
              <div class="flex justify-center items-centers">
                <img
                  :src="lawyer.user.avatar ? lawyer.user.avatar : ''"
                  alt=""
                  class="h-8 w-8 rounded-full object-cover"
                />
              </div>
            </td>
            <td>
              {{ lawyer.user.username }}
            </td>

            <td>
              {{ lawyer.user.firstName }}
            </td>
            <td>
              {{ lawyer.user.lastName }}
            </td>
            <td>
              {{ lawyer.user.gender }}
            </td>
            <td>
              {{ lawyer.user.email }}
            </td>
            <td class="flex justify-center">
              <div class="border w-fit px-2">
                {{ lawyer.caseType.name }} law
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <div class="flex justify-center items-center gap-2 pb-4 border-t">
        <button
          class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
          v-if="currentPage > 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <button
          v-for="page in pageCount"
          :key="page"
          @click="currentPage = page"
        >
          &gt;{{ page }}
        </button>
        <button
          class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
          v-if="currentPage < pageCount"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped></style>

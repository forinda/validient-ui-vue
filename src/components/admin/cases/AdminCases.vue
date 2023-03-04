<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { CaseFilingType } from "@/typings";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";
import moment from "moment";
const { authStateAccessToken } = storeToRefs(useAuthStore());
const router = useRouter();
// pagination details
const currentPage = ref(1);
const pageSize = 10;
const pageCount = computed(() => {
  return Math.ceil(caseFiles.value.length / pageSize);
});
const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return caseFiles.value.slice(startIndex, endIndex);
});
// fetch case statuses
const caseFiles = ref<CaseFilingType[]>([]);
onMounted(async () => {
  const fetchCaseFiles = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authStateAccessToken.value}`,
      },
    };
    try {
      const response = await publicAxios.get("/cases", config);
      console.log(response.data);
      caseFiles.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return Promise.all([fetchCaseFiles()]);
});
const caseFilesAvailable = computed(() => {
  return caseFiles.value.length > 0;
});
// nav adminCaseDetails
</script>

<template>
  <main>
    <div class="flex justify-between px-10 py-4 bg-white border-b">
      <h1 class="text-2xl font-bold text-center">Case files</h1>
      <router-link
        :to="{ name: 'newAdminCase' }"
        class="border bg-color2 text-color3 rounded-lg px-4 py-2"
        >Create new</router-link
      >
    </div>
   <div v-if="!caseFilesAvailable">
    <h1>
      No case files available
    </h1>
    <p>
      If you have created a case file, please refresh the page.
    </p>
  </div>
  <div>
    <div class="bg-white border overflow-scroll no-scrollbar">
      <table
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
            <th scope="col" class="px-6 py-3">title</th>
            <th scope="col" class="px-6 py-3">Plaintiff</th>
            <th scope="col" class="px-6 py-3">Lawyer</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Date filed</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(casefile,index) in paginatedItems"
            :key="casefile.id"
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
              {{ index+1 }}
            </td> <td>
              {{ casefile.title }}
            </td> <td>
              {{ casefile.plaintiff.firstName }}
              {{ casefile.plaintiff.lastName }}
            </td> <td>
              {{ casefile.lawyer.user.firstName }}
              {{ casefile.lawyer.user.lastName }}
            </td>
            <td>
              {{ casefile.caseType.name }}
            </td>
            <td>
              {{ casefile.status.name }}
            </td>
            <td>
              {{ moment(casefile.dateFiled).format("DD/MM/YYYY") }}
            </td>
            <td>
              <div>
                <router-link
                  :to="{ name: 'adminCaseDetails', params: { caseId: casefile.id } }"
                  class="border bg-color2 text-color3 rounded-lg px-4 py-2"
                  >View</router-link
                >
                <!-- <router-link
                  :to="{ name: 'editAdminCase', params: { caseId: casefile.id } }"
                  class="border bg-color2 text-color3 rounded-lg px-4 py-2"
                  >Edit</router-link> -->
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
  </div>
  </main>
</template>

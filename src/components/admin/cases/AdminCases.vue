<script setup lang="ts">
import { onMounted, ref } from "vue";
import { caseFilingType } from "@/typings";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";
import moment from "moment";
const { authStateAccessToken } = storeToRefs(useAuthStore());
const router = useRouter();

// fetch case statuses
const caseFiles = ref<caseFilingType[]>([]);
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
    <div
      class="p-4 bg-white rounded shadow-sm border border-gray-200 w-full flex gap-3 flex-wrap"
    >
      <div
        v-for="caseFile of caseFiles"
        class="p-4 border flex-[0_0_20rem] space-y-2 rounded-md"
      >
        <h1 class="font-bold uppercase">{{ caseFile.title }}</h1>
        <!-- <p>
          Filed on:
          {{
            moment.isDate(caseFile.dateFiled)
              ? moment(caseFile.dateFiled).format("MMMM Do YYYY")
              : "Invalid date"
          }}
        </p> -->

        <p>
          Category:

          <span
            v-if="caseFile.caseType"
            class="bg-orange-500 text-white px-4"
            >{{ caseFile.caseType.name }}</span
          >
          <span v-else class="bg-red-200 text-red-500">No type assigned</span>
        </p>
        <p>
          Status:

          <span v-if="caseFile.status" class="bg-orange-500 text-white px-4">{{
            caseFile.status.name
          }}</span>
          <span v-else class="bg-red-200 text-red-500">No type assigned</span>
        </p>
        <p>{{ caseFile.description }}</p>
        <hr />
        <div>
          <div class="p-2 flex gap-2 items-center">
            <img
              :src="caseFile.lawyer.user.avatar"
              alt=""
              class="rounded-full"
            />
            <div class="flex-1">
              <h1 class="font-bold">Lawyer</h1>
              <p class="font-bold">{{ caseFile.lawyer.user.name }}</p>
              <p class="text-sm text-gray-500">
                {{ caseFile.lawyer.user.email }}
              </p>
              <p>
                <span class="text-sm text-gray-500">
                  {{ caseFile.lawyer.user.firstName }}
                  {{ caseFile.lawyer.user.lastName }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

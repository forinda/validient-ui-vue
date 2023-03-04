<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { CaseFilingType } from "@/typings";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import moment from "moment";

const { authStateAccessToken } = storeToRefs(useAuthStore());

const router = useRouter();
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const fetchedCaseFile = ref<CaseFilingType>({} as unknown as CaseFilingType);

const msg = ref("Case details");
onMounted(async () => {
  const fetchCaseFile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authStateAccessToken.value}`,
      },
    };
    try {
      isLoading.value = true;
      isError.value = false;
      const res = await publicAxios.get(
        `/cases/${router.currentRoute.value.params.caseId}/get`,
        config
      );
      const data = res.data;
      fetchedCaseFile.value = data;
    } catch (error) {
      console.log(error);
      isError.value = true;
    } finally {
      /**@ts-ignore */
      console.log(fetchedCaseFile.value);
      isLoading.value = false;
    }
  };
  return Promise.all([fetchCaseFile()]);
});
</script>

<template>
  <div v-if="isLoading" class="h-full w-full flex justify-center">
    <p>Loading...</p>
  </div>
  <div v-if="isError && !isLoading">
    <p>Error occured while fetching case details</p>
  </div>
  <div v-else class="font-rubik py-10 px-4 flex flex-col gap-4">
    <!-- Case details -->
    <fieldset class=" border-2 p-4">
        <legend class="font-bold text-md uppercase"> details</legend>
      <p>
        <strong class="font-bold">Case title:</strong>
        {{ fetchedCaseFile.title }}
      </p>
      <p>
        <strong class="font-bold">Case number:</strong>
        {{ fetchedCaseFile.caseId }}
      </p>
      <div>
        <strong class="font-bold">Case number:</strong>
       <p>
         {{ fetchedCaseFile.caseId }}
       </p>
      </div>
    </fieldset>
    <!-- Case category -->
    <fieldset v-if="fetchedCaseFile.caseType" class=" border-2 p-4">
        <legend class="font-bold text-md uppercase"> category</legend>
        <p>
        <strong class="font-bold">name:</strong>
        {{ fetchedCaseFile.caseType.name }}
      </p>
      <p>
        <strong class="font-bold">description:</strong>
        {{ fetchedCaseFile.caseType.name }}
      </p>
    </fieldset>
    <!-- Case status -->
    <fieldset v-if="fetchedCaseFile.status" class=" border-2 p-4">
        <legend class="font-bold text-md uppercase"> status</legend>
      <p>
        <strong class="font-bold">name:</strong>
        {{ fetchedCaseFile.status.name }}
      </p>
      <p>
        <strong class="font-bold">description:</strong>
        {{ fetchedCaseFile.status.name }}
      </p>
      
    </fieldset>
    <!-- Case plaintiff -->
    <fieldset v-if="fetchedCaseFile.plaintiff" class=" border-2 p-4">
        <legend class="font-bold text-md uppercase"> plaintiff</legend>
      <p>
        <strong class="font-bold">First name:</strong>
        {{ fetchedCaseFile.plaintiff.firstName }}
      </p>
      <p>
        <strong class="font-bold">Case number:</strong>
        {{ fetchedCaseFile.caseId }}
      </p>
      <div>
        <strong class="font-bold">Case number:</strong>
       <p>
         {{ fetchedCaseFile.caseId }}
       </p>
      </div>
    </fieldset>
    <fieldset v-if="fetchedCaseFile.lawyer" class=" border-2 p-4 flex flex-col gap-4">
        <legend class="font-bold text-md uppercase"> lawyer</legend>
      <p>
        <strong class="font-bold">ID:</strong>
        {{ fetchedCaseFile.lawyer.identification }}
      </p>
      <p>
        <strong class="font-bold">Email:</strong>
        {{ fetchedCaseFile.lawyer.user.email }}
      </p>
      <p>
        <strong class="font-bold">First name:</strong>
        {{ fetchedCaseFile.lawyer.user.firstName }}
      </p>
      <p>
        <strong class="font-bold">Last name:</strong>
        {{ fetchedCaseFile.lawyer.user.lastName }}
      </p>
      <p>
        <strong class="font-bold">Gender:</strong>
        {{ fetchedCaseFile.lawyer.user.gender }}
      </p>
        <p>
            <strong class="font-bold">Years of experience:</strong>
            {{ moment().year()-fetchedCaseFile.lawyer.verifiedYear }}
        </p>
    </fieldset>
  </div>
</template>

<style scoped>
/* code */
</style>

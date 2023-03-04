<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { LawyerType } from "@/typings";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import moment from "moment";

const { authStateAccessToken } = storeToRefs(useAuthStore());

const router = useRouter();
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const fetchedLawyer = ref<LawyerType>({} as unknown as LawyerType);

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
        `/lawyers/${router.currentRoute.value.params.lawyerId}/profile`,
        config
      );
      const data = res.data;
      fetchedLawyer.value = data;
    } catch (error) {
      console.log(error);
      isError.value = true;
    } finally {
      /**@ts-ignore */
      console.log(fetchedLawyer.value);
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
  <div v-else-if="!isLoading&&fetchedLawyer" class="font-rubik py-10 px-4 flex flex-col gap-4">
    <!-- User details -->
    <fieldset v-if="fetchedLawyer.user" class="border-2 p-4">
      <legend class="font-bold text-md uppercase">User details</legend>
      <p>
        <strong class="font-bold">Username:</strong>
        {{ fetchedLawyer.user.username }}
      </p>
      <p>
        <strong class="font-bold">First name:</strong>
        {{ fetchedLawyer.user.firstName }}
      </p>
      <p>
        <strong class="font-bold">Last name:</strong>
        {{ fetchedLawyer.user.lastName }}
      </p>
      <p>
        <strong class="font-bold">Email address:</strong>
        {{ fetchedLawyer.user.email }}
      </p>
      <p>
        <strong class="font-bold">Username:</strong>
        {{ fetchedLawyer.user.username }}
      </p>
    </fieldset>
    <!-- Case category -->
    <fieldset v-if="fetchedLawyer.caseType" class="border-2 p-4">
      <legend class="font-bold text-md uppercase">Specialization cases</legend>
      <p>
        <strong class="font-bold">name:</strong>
        {{ fetchedLawyer.caseType.name }}
      </p>
      <p>
        <strong class="font-bold">description:</strong>
        {{ fetchedLawyer.caseType.name }}
      </p>
    </fieldset>
    <!-- Lawyer details -->
    <fieldset v-if="!isLoading&&fetchedLawyer" class="border-2 p-4">
      <legend class="font-bold text-md uppercase">Details</legend>
      <p>
        <strong class="font-bold">ID:</strong>
        {{ fetchedLawyer.identification }}
      </p>
      <p>
        <strong class="font-bold">Hourly rate:</strong>
        ${{ fetchedLawyer.hourlyRate }}
      </p>
      <p>
        <strong class="font-bold">Years of experience:</strong>
        {{ moment().year() - fetchedLawyer.verifiedYear }} years
      </p>
      <p>
        <strong class="font-bold">Practice area:</strong>
        {{ fetchedLawyer.practiceAreas }}
      </p><p>
        <strong class="font-bold">Notes:</strong>
        {{ fetchedLawyer.notes }}
      </p>
    </fieldset>
   
  </div>
</template>

<style scoped>
/* code */
</style>

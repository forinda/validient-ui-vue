<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { UserType } from "@/typings";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import moment from "moment";

const { authStateAccessToken } = storeToRefs(useAuthStore());

const router = useRouter();
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const fetchedUser = ref<UserType>({} as unknown as UserType);

const msg = ref("Case details");
onMounted(async () => {
  const fetchUserProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authStateAccessToken.value}`,
      },
    };
    try {
      isLoading.value = true;
      isError.value = false;
      const res = await publicAxios.get(
        `/users/user/${router.currentRoute.value.params.userId}/profile`, //users/user/4/profile
        config
      );
      const data = res.data;
      fetchedUser.value = data;
    } catch (error) {
      console.log(error);
      isError.value = true;
    } finally {
      /**@ts-ignore */
      console.log(fetchedUser.value);
      isLoading.value = false;
    }
  };
  return Promise.all([fetchUserProfile()]);
});
</script>

<template>
  <main>
    <div v-if="isLoading" class="h-full w-full flex justify-center">
      <p>Loading...</p>
    </div>
    <div v-if="isError && !isLoading">
      <p>Error occured while fetching case details</p>
    </div>
    <div class="font-rubik py-10 px-4 flex flex-col gap-4">
      <!-- User details -->
      <fieldset v-if="fetchedUser" class="border-2 p-4">
        <legend class="font-bold text-md uppercase">User details</legend>
        <p>
          <strong class="font-bold">Username:</strong>
          {{ fetchedUser.username }}
        </p>
        <p>
          <strong class="font-bold">First name:</strong>
          {{ fetchedUser.firstName }}
        </p>
        <p>
          <strong class="font-bold">Last name:</strong>
          {{ fetchedUser.lastName }}
        </p>
        <p>
          <strong class="font-bold">Email address:</strong>
          {{ fetchedUser.email }}
        </p>
        <p>
          <strong class="font-bold">Username:</strong>
          {{ fetchedUser.username }}
        </p>
      </fieldset>
      <!-- Case roles -->
      <fieldset v-if="fetchedUser.roles" class="border-2 p-4">
        <legend class="font-bold text-md uppercase">Roles</legend>
        <ul class="px-4">
            <li v-for="role in fetchedUser.roles" :key="role.id" class="list-disc">
                {{ role.name }}
            </li>
        </ul>
    
      </fieldset>
   
    </div>
  </main>
</template>

<style scoped>
/* code */
</style>

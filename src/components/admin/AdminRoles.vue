<script setup lang="ts">
import { onMounted, ref } from "vue";
import { UserRoleType } from "@/typings";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";
const { authStateAccessToken } = storeToRefs(useAuthStore());
const router = useRouter();

// fetch case statuses
const rolesList = ref<UserRoleType[]>([]);
onMounted(async () => {
  const fetchRoles = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authStateAccessToken.value}`,
      },
    };
    try {
      const response = await publicAxios.get("/roles", config);
      console.log(response.data);
      rolesList.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return Promise.all([fetchRoles()]);
});
</script>

<template>
  <main>
    <div class="flex justify-between px-10 py-4 bg-white border-b">
      <h1 class="text-2xl font-bold text-center">Roles</h1>
      <router-link
        :to="{ name: 'newCaseStatus' }"
        class="border bg-color2 text-color3 rounded-lg px-4 py-2"
        aria-disabled="true"
        >Create new</router-link
      >
    </div>
    <div
      class="p-4 bg-white rounded shadow-sm border border-gray-200 w-full flex gap-3 flex-wrap"
    >
      <div v-for="role of rolesList" class="p-4 border flex-[0_0_20rem] space-y-2 rounded-md">
        <h1 class="font-bold uppercase">{{ role.name }}</h1>

        <p>{{ role.description }}</p>
      </div>
    </div>
  </main>
</template>

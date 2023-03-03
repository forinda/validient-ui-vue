<script setup lang="ts">
import { CaseType } from "@/typings";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";
const { authStateAccessToken } = storeToRefs(useAuthStore());
const router = useRouter();
const newCaseType = ref<Omit<CaseType, "id">>({
  description: "",
  name: "",
});
const handleSubmit = async (e: Event) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  const target = e.target as HTMLFormElement;
  if (target.checkValidity()) {
    try {
      const response = await publicAxios.post(
        "/case-type",
        newCaseType.value,
        config
      );
      response&& router.push({ name: "caseTypes" });
    } catch (error) {
      console.log(error);
    }
  }

  e.preventDefault();
  console.log(newCaseType.value);
};

</script>
<template>
  <div class="w-full h-full flex justify-center py-10">
    <form @submit.prevent="handleSubmit" class="form-component border">
      <div>
        <h1 class="text-2xl font-bold text-center">New Case type</h1>
      </div>
      <div class="input-wrapper">
        <label for="name">Name</label>
        <input
          required
          type="text"
          id="name"
          v-model="newCaseType.name"
          class="input-field"
          placeholder="Case type name eg."
        />
      </div>
      <div class="input-wrapper">
        <label for="description">Description</label>
        <input
          required
          type="text"
          id="description"
          v-model="newCaseType.description"
          class="input-field"
          placeholder="Description"
        />
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.input-wrapper {
  @apply flex flex-col gap-1;
}
.input-field {
  @apply border border-gray-300 rounded p-2;
}
.submit-button {
  @apply bg-blue-500 text-white rounded p-2;
}
.form-component {
  @apply flex flex-col gap-4 w-full lg:max-w-lg bg-white shadow-md rounded p-4 lg:p-10;
}
</style>

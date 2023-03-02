<script setup lang="ts">
import {
  NewCaseFilingType,
  CaseType,
  CaseStatusType,
  LawyerType,
  UserType,
} from "@/typings";
import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";
const { authStateAccessToken } = storeToRefs(useAuthStore());
const router = useRouter();
const newCaseFile = ref<NewCaseFilingType>({
  dateFiled: new Date().toISOString(),
  title: "",
  description: "",
  lawyer: 0,
  status: 0,
  caseType: 0,
});
const plaintiff = ref<number>(0);
const possiblePlaintiff = computed(() => {
  return users.value.find((user) => user.id === plaintiff.value);
});
// const selectedPlaintiff = computed(() => {
//   return possiblePlaintiff.value
//     ? `${possiblePlaintiff.value.firstName} ${possiblePlaintiff.value.lastName}`
//     : "";
// });
watch(plaintiff, (update) => {});
// case types
const caseTypes = ref<Array<CaseType>>([]);
// case statuses
const caseStatuses = ref<Array<CaseStatusType>>([]);
// case lawyers
const lawyers = ref<Array<LawyerType>>([]);
// users
const users = ref<Array<UserType>>([]);

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
        `/cases/${possiblePlaintiff.value?.id}/create`,
        newCaseFile.value,
        config
      );
      response && router.push({ name: "adminCases" });
    } catch (error) {
      console.log(error);
    }
  }

  e.preventDefault();
  console.log(newCaseFile.value);
};
onMounted(async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  const fetchLawyers = async () => {
    try {
      const response = await publicAxios.get("/lawyers", config);
      lawyers.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCaseTypes = async () => {
    try {
      const response = await publicAxios.get("/case-type", config);
      caseTypes.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCaseStatuses = async () => {
    try {
      const response = await publicAxios.get("/case-status", config);
      caseStatuses.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await publicAxios.get("/users", config);
      users.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return Promise.all([
    fetchLawyers(),
    fetchCaseTypes(),
    fetchCaseStatuses(),
    fetchUsers(),
  ]);
});
const possibleLawyers = computed(() => {
  const possible = lawyers.value
    .filter((l) => l.caseType.id === newCaseFile.value.caseType)
    .map((lawyer) => {
      return {
        id: lawyer.id,
        name: `${lawyer.user.firstName} ${lawyer.user.lastName}`,
      };
    });
  if (possible.length > 0) {
    newCaseFile.value.lawyer = possible[0].id;
  }
  return possible;
});
const possibleCaseTypes = computed(() => {
  const possible = caseTypes.value.slice();
  if (possible.length > 0) {
    newCaseFile.value.caseType = possible[0].id;
  }
  return possible;
});
const possibleCaseStatuses = computed(() => {
  const possible = caseStatuses.value.slice();
  if (possible.length > 0) {
    newCaseFile.value.status = possible[0].id;
  }
  return possible;
});
const foundPossibleCaseTypes = computed(() => {
  return possibleCaseTypes.value.length > 0;
});
const foundPossibleCaseStatuses = computed(() => {
  return possibleCaseStatuses.value.length > 0;
});
const foundPossiblePlaintiff = computed(() => {
  return users.value.length > 0;
});
const foundPossibleLawyers = computed(() => {
  return possibleLawyers.value.length > 0;
});
</script>
<template>
  <div class="w-full h-full flex justify-center py-10">
    <form @submit.prevent="handleSubmit" class="form-component border">
      <div>
        <h1 class="text-2xl font-bold text-center">New Case filing</h1>
      </div>
      <div class="input-wrapper">
        <label for="name">Title</label>
        <input
          required
          type="text"
          id="name"
          v-model="newCaseFile.title"
          class="input-field"
          placeholder="Case title."
        />
      </div>
      <!-- Description -->
      <div class="input-wrapper">
        <label for="description">Description</label>
        <textarea
          required
          type="text"
          id="description"
          v-model="newCaseFile.description"
          class="input-field"
          placeholder="Description"
        ></textarea>
      </div>
      <!-- Plaintiff -->
      <p v-if="!foundPossiblePlaintiff">
        <span>No users found please add as users</span>
      </p>
      <div v-if="foundPossiblePlaintiff" class="input-wrapper">
        <label for="name">Select plaintiff</label>
        <select
          required
          type="text"
          id="name"
          v-model="plaintiff"
          class="input-field"
          placeholder="Case plaintiff"
        >
          <option value="" disabled>Select category</option>
          <option v-for="user of users" :value="user.id">
            {{ user.firstName }} {{ user.lastName }}
          </option>
        </select>
      </div>
      <!-- Case type -->
      <p v-if="!foundPossibleCaseTypes" class="not-found-error">
        <span>No case types found please create</span>
      </p>
      <div v-if="foundPossibleCaseTypes" class="input-wrapper">
        <label for="name">Select category</label>
        <select
          required
          type="text"
          id="name"
          v-model="newCaseFile.caseType"
          class="input-field"
          placeholder="Case title."
        >
          <option value="" disabled>Select category</option>
          <option v-for="caseType of caseTypes" :value="caseType.id">
            {{ caseType.name }}
          </option>
        </select>
      </div>
      <!-- Status -->
      <p v-if="!foundPossibleCaseStatuses" class="not-found-error">
        <span>No case statuses found please create</span>
      </p>
      <div
        v-if="caseTypes.length > 0 && foundPossibleCaseStatuses"
        class="input-wrapper"
      >
        <label for="name">Select status</label>
        <select
          required
          type="text"
          id="name"
          v-model="newCaseFile.caseType"
          class="input-field"
          placeholder="Case title."
        >
          <option value="" disabled>Select status</option>
          <option v-for="caseType of possibleCaseTypes" :value="caseType.id">
            {{ caseType.name }}
          </option>
        </select>
      </div>
      <!-- Case lawyer -->
      <p v-if="!foundPossibleLawyers" class="not-found-error">
        <span>No lawyers found please add</span>
      </p>
      <div v-if="foundPossibleLawyers" class="input-wrapper">
        <label for="name">Select lawyer</label>
        <select
          required
          type="text"
          id="name"
          v-model="newCaseFile.caseType"
          class="input-field"
          placeholder="Case title."
        >
          <option value="0" disabled>Select case lawyer</option>
          <option value="invalid">Invalid</option>
          <option v-for="lawyer of possibleLawyers" :value="lawyer.id">
            {{ lawyer.name }}
          </option>
        </select>
      </div>
      <button
        :disabled="!foundPossibleLawyers"
        type="submit"
        class="submit-button"
      >
        {{ !foundPossibleLawyers ? "No lawyers found" : "Submit" }}
      </button>
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
.not-found-error {
  @apply text-red-500;
}
</style>

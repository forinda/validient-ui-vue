<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import {
  UserRoleType,
  SignUpFormPropType,
  UserType,
  NewLawyerType,
  CaseType,
  LawyerHourlyRateType,
  LawyerType,
} from "@/typings";
import { publicAxios } from "@/api";
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import filterUserRole from "@/utils/roleFilter";
import getYearsSince1960 from "@/utils/getYearsSince1960";
import lawyerRates from "@/utils/getLawyerHourlyRate";
import filterUserRoles from "@/utils/roleFilter";
import GlobalUserType from "@/utils/GlobalUserTypes";

const router = useRouter();

const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore());

const userRef = ref<number>();
const userList = ref<UserType[]>([]);
const existingLawyers = ref<LawyerType[]>([]);
const yearsChoices = ref(getYearsSince1960().sort((a, b) => b - a));
const lawyerHourlyRate = ref<LawyerHourlyRateType[]>(lawyerRates());

const selectableUsers = computed(() => {
  if (!userList.value.length) return [];
  if (!existingLawyers.value.length) return [];
  const eligibleUsers = userList.value.filter(
    (user) =>
      filterUserRole(user.roles.map((r) => r.name.toLowerCase())) ===
      GlobalUserType.LAWYER
  );

  const confirmedLawyers = eligibleUsers.filter((user) => {
    const found = existingLawyers.value.find(
      (lawyer) => lawyer.user.id === user.id
    );
    return found ? false : true;
  });

  return userList.value.length > 0 && existingLawyers.value.length > 0
    ? confirmedLawyers
    : [];
});

const handleUserSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  userRef.value = Number(target.value);
};
// watch(userRef, (update) => {

// });

// exclude password  and terms service
const formData = ref<NewLawyerType>({
  hourlyRate: 0,
  notes: "",
  practiceAreas: "",
  caseType: 0,
  verifiedYear: 0,
});
const possibleUserLawyers = computed(() => {});
// const caseTypeRef = ref<number[]>([]);
// watch(caseTypeRef, (update) => {
//   console.log(update);
//   formData.value.caseTypes = update;
// });
// const possibleCaseTypes = computed(() => {
//   return caseTypes.value.filter(
//     (caseType) => !formData.value.caseTypes.includes(caseType.id)
//   );
// });
// const selectedCaseTypes = computed(() => {
//   return caseTypes.value.filter((caseType) =>
//     formData.value.caseTypes.includes(caseType.id)
//   );
// });
// const removeCaseType = (id: number) => {
//   caseTypeRef.value = caseTypeRef.value.filter((caseType) => caseType !== id);
// };
// const handleCaseTypeSelect = (e: Event) => {
//   const target = e.target as HTMLSelectElement;
//   const caseTypeId = caseTypes.value.find(
//     (caseType) => caseType.id === Number(target.value)
//   )?.id;
//   if (caseTypeRef.value.includes(caseTypeId!)) return;
//   caseTypeRef.value = [...caseTypeRef.value, caseTypeId!] as number[];
//   console.log(formData.value);
// };
// submit new user
const handleSubmit = async (e: Event) => {
  const target = e.target as HTMLFormElement;
  if (!target.checkValidity()) {
    alert("Please fill all the required fields");
    return;
  }
  const headers = {
    Authorization: `Bearer ${authStateAccessToken.value}`,
  };
  try {
    const res = await publicAxios.post(
      `/lawyers/lawyer/${userRef.value}/create`,
      formData.value,
      { headers }
    );
    alert("Lawyer created successfully");
    res && router.push({ name: "adminLawyers" });
  } catch (error: any) {
    const { data } = error.response;
    console.log(data);

    if (data.errorMessage) {
      alert(data.errorMessage);
    }
    console.log(error);
  }
};

const caseTypes = ref<CaseType[]>([]);
onMounted(async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  const fetchCaseTypes = async () => {
    try {
      const res = await publicAxios.get("/case-type", config);
      caseTypes.value = res.data;
    } catch (error: any) {
      const { data } = error.response;
      if (data.errorMessage) {
        alert(data.errorMessage);
      }
    }
  };
  const fetchUsers = async () => {
    try {
      const res = await publicAxios.get("/users", config);
      userList.value = res.data;
      console.log(userList.value);
    } catch (error: any) {
      const { data } = error.response;
      if (data.errorMessage) {
        alert(data.errorMessage);
      }
    }
  };
  const fetchExistingLawyers = async () => {
    try {
      const res = await publicAxios.get("/lawyers", config);
      existingLawyers.value = res.data;
    } catch (error: any) {
      const { data } = error.response;
      if (data.errorMessage) {
        alert(data.errorMessage);
      }
    }
  };
  return Promise.all([fetchCaseTypes(), fetchUsers(), fetchExistingLawyers()]);
});
watch(
  formData,
  (update) => {
    //   check if the year is valid
    if (update.verifiedYear > new Date().getFullYear()) {
      alert("Year of graduation cannot be greater than current year");
      formData.value.verifiedYear = 0;
    }
    console.log({
      podssibleUserLawyers: possibleUserLawyers.value,
      userRef: userRef.value,
    });

    //   update hourly rate
    const currentYear = new Date().getFullYear();
    const lawyerRate = lawyerHourlyRate.value.find(
      (rate) => currentYear - update.verifiedYear <= rate.maxYears
    );
    formData.value.hourlyRate = lawyerRate?.rate!;
  },
  { deep: true }
);
</script>
<template>
  <main>
    <div class="w-full h-full flex justify-center py-10">
      <form @submit.prevent="handleSubmit" class="form-component">
        <div>
          <h1 class="text-2xl font-bold text-center">New Lawyer</h1>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <div class="input-wrapper">
              <label for="name">Graduation year</label>
              <select
                required
                type="text"
                id="name"
                v-model="formData.verifiedYear"
                class="input-field"
                placeholder="Year of graduation"
              >
                <option selected disabled :value="0">
                  Select year of graduation
                </option>
                <option v-for="year of yearsChoices" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
            <div class="input-wrapper">
              <label for="name">Practice areas</label>
              <textarea
                required
                type="text"
                id="name"
                v-model="formData.practiceAreas"
                class="input-field"
                placeholder="Description of practice areas"
              ></textarea>
            </div>
            <div class="input-wrapper">
              <label for="name">Notes</label>
              <textarea
                required
                type="text"
                id="name"
                v-model="formData.notes"
                class="input-field"
                placeholder="Notes about the lawyer"
              ></textarea>
            </div>
          </div>
          <div>
            <div v-if="formData.verifiedYear" class="input-wrapper">
              <label for="name">hourly rate</label>
              <input
                required
                type="number"
                readonly
                id="name"
                v-model="formData.hourlyRate"
                class="input-field"
                placeholder="username"
                name="username"
              />
            </div>
            <p v-if="selectableUsers.length < 1">
              <span>
                No user available for this year of graduation. Please add a new
                user
                <router-link
                  :to="{ name: 'adminNewUser' }"
                  class="text-blue-400"
                  >here</router-link
                >
              </span>
            </p>
            <div class="input-wrapper">
              <label for="name">Select User profile</label>
              <select
                required
                type="email"
                id="name"
                v-model="userRef"
                class="input-field"
              >
                <option selected disabled>Select user</option>
                <option v-for="user of selectableUsers" :value="user.id">
                  {{ user.firstName }} {{ user.lastName }}
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-2">
              <label for="" class="">Select areas of specialization</label>
              <!-- selected members -->
              <!-- <div
                v-if="selectedCaseTypes.length"
                class="flex gap-1 flex-wrap border p-2"
              >
                <button
                  v-for="caseType in selectedCaseTypes"
                  :key="caseType.id"
                  @click.prevent="removeCaseType(caseType.id)"
                  class="w-fit text-[12px] rounded-full bg-color2 text-color3 py-1 px-2"
                >
                  {{ caseType.name }} x
                </button>
              </div> -->
              <select
                name=""
                id=""
                :multiple="false"
                class="input-field"
                v-model="formData.caseType"
              >
                <option value="" selected disabled>Select specialty</option>
                <option
                  v-for="caseType of caseTypes"
                  :value="caseType.id"
                  class="py-2"
                >
                  <div class="flex items-center gap-2">
                    <span>{{ caseType.name }}</span>
                  </div>
                </option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </main>
</template>
<style scoped>
.input-wrapper {
  @apply flex flex-col gap-1;
}
.input-field {
  @apply border border-gray-300 rounded p-2;
}
.submit-button {
  @apply bg-blue-500 text-white rounded p-2 w-full lg:w-1/2;
}
.form-component {
  @apply flex flex-col gap-4 bg-white shadow-md rounded p-4  border grid-cols-2 w-full lg:p-10;
}
</style>

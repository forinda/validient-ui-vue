<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { UserRoleType, SignUpFormPropType, UserType } from "@/typings";
import { publicAxios } from "@/api";
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import genderInfo from "@/data/gender";
import { useRouter } from "vue-router";

const router = useRouter();

const { authStateAccessToken } = storeToRefs(useAuthStore());

// exclude password  and terms service
const formData = ref<
  Omit<SignUpFormPropType, "acceptTerms"> & { roles: number[] }
>({
  avatar: "",
  email: "",
  firstName: "",
  gender: "MALE",
  lastName: "",
  username: "",
  roles: [],
  password: `validient-${new Date().getFullYear().toString()}`,
});
const roleRef = ref<number[]>([]);
watch(roleRef, (update) => {
  console.log(update);
  formData.value.roles = update;
});
const possibleRoles = computed(() => {
  return userRoles.value.filter(
    (role) => !formData.value.roles.includes(role.id)
  );
});
const selectedRoles = computed(() => {
  return userRoles.value.filter((role) =>
    formData.value.roles.includes(role.id)
  );
});
const removeRole = (id: number) => {
  roleRef.value = roleRef.value.filter((role) => role !== id);
};
const handleRoleSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const roleId = userRoles.value.find(
    (role) => role.id === Number(target.value)
  )?.id;
  if (roleRef.value.includes(roleId!)) return;
  roleRef.value = [...roleRef.value, roleId!] as number[];
  console.log(formData.value);
};
// submit new user
const handleSubmit = async (e: Event) => {
  const target = e.target as HTMLFormElement;
  if (!target.checkValidity()) {
    alert("Please fill all the required fields");
    return;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  try {
    const res = await publicAxios.post("/users/new", formData.value, config);
    alert("User created successfully");
    res && router.push({ name: "adminUsers" });
  } catch (error) {
    console.log(error);
  }
};

// User roles
const userRoles = ref<UserRoleType[]>([]);
onMounted(async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  try {
    const res = await publicAxios.get("/roles", config);
    userRoles.value = res.data;
  } catch (error:any) {
    const { data } = error.response;
    if(data.errorMessage){
      alert(data.errorMessage);
    }
  }
});
</script>
<template>
  <main>
    <div class="w-full h-full flex justify-center py-10">
      <form @submit.prevent="handleSubmit" class="form-component">
        <div>
          <h1 class="text-2xl font-bold text-center">New user</h1>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <div class="input-wrapper">
              <label for="name">First name</label>
              <input
                required
                type="text"
                id="name"
                v-model="formData.firstName"
                class="input-field"
                placeholder="First name"
              />
            </div>
            <div class="input-wrapper">
              <label for="name">Last name</label>
              <input
                required
                type="text"
                id="name"
                v-model="formData.lastName"
                class="input-field"
                placeholder="Last name"
              />
            </div>
            <div class="input-wrapper">
              <label for="name">Username</label>
              <input
                required
                type="text"
                id="name"
                v-model="formData.username"
                class="input-field"
                placeholder="username"
                name="username"
              />
            </div>
            <div class="input-wrapper">
              <label for="name">Email adderss</label>
              <input
                required
                type="email"
                id="email"
                v-model="formData.email"
                class="input-field"
                placeholder="email"
              />
            </div>
          </div>
          <div>
            <!-- <div class="input-wrapper">
              <label for="description">Description</label>
              <input
                required
                type="text"
                id="description"
                v-model="formData.lastName"
                class="input-field"
              />
            </div> -->
            <div class="input-wrapper">
              <label for="name">Password</label>
              <input
                required
                type="email"
                id="name"
                disabled
                v-model="formData.password"
                class="input-field"
                placeholder="password"
              />
            </div>
            <label for="gender" class="input-wrapper">
              <span class="block"> Gender </span>
              <div class="flex gap-2">
                <label
                  v-for="{ id, value, checked } of genderInfo"
                  class="flex items-center gap-2"
                  :for="id"
                >
                  <input
                    v-model="formData.gender"
                    :value="value"
                    type="radio"
                    name="gender"
                    :id="id"
                    :checked="checked"
                  />
                  <span>{{ value }}</span>
                </label>
              </div>
            </label>
            <div class="flex flex-col gap-2">
              <label for="" class="">Select roles</label>
              <!-- selected members -->
              <div
                v-if="selectedRoles.length"
                class="flex gap-1 flex-wrap border p-2"
              >
                <button
                  v-for="role in selectedRoles"
                  :key="role.id"
                  @click.prevent="removeRole(role.id)"
                  class="w-fit text-[12px] rounded-full bg-color2 text-color3 py-1 px-2"
                >
                  {{ role.name }} x
                </button>
              </div>
              <select
                name=""
                id=""
                :multiple="false"
                @change="handleRoleSelect"
                class="input-field"
              >
                <option value="" selected disabled>Select members</option>
                <option
                  v-for="role of possibleRoles"
                  :value="role.id"
                  class="py-2"
                >
                  <div class="flex items-center gap-2">
                    <span>{{ role.name }}</span>
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

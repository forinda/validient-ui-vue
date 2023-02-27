<script setup lang="ts">
import { computed, ref } from "vue";
import { GenderType, SignUpFormPropType } from "@/typings";
import Logo from "@/components/Logo.vue";
import { useVuelidate } from "@vuelidate/core";
import { publicAxios } from "@/api";
import {
  required,
  email,
  minLength,
  helpers,
  sameAs,
} from "@vuelidate/validators";
import { useRouter } from "vue-router";
const router = useRouter();
type formSteps = "personal-info" | "password";
const currentStep = ref<formSteps>("personal-info");
const formData = ref<SignUpFormPropType & { confirmPassword: string }>({
  email: "",
  password: "",
  acceptTerms: false,
  firstName: "",
  lastName: "",
  gender: "OTHER",
  confirmPassword: "",
  avatar: '',
  username: ''
});

const personalInfoRules = computed(() => ({
  firstName: { required, minLength: minLength(3) },
  lastName: { required, minLength: minLength(3) },
  username: { required, minLength: minLength(2) },
  email: {
    required: required,
    email,
  },
  gender: { required },

}));

const validForm = computed(
  () => !personalInfo$.value.$error && !passwordInfo$.value.$error
);

const passwordInfoRules = computed(() => ({
  password: { required },
  confirmPassword: { required, sameAs: sameAs(formData.value.password, 'password') },
  acceptTerms: { required },
}));
const serverErrors = ref<string[]>([]);

const passwordInfo$ = useVuelidate(passwordInfoRules, formData);
const personalInfo$ = useVuelidate(personalInfoRules, formData);
const handleNext = (step: formSteps) => {
  personalInfo$.value.$validate();
  if (personalInfo$.value.$error) {
    return;
  }
  currentStep.value = step;
};
const genderInfo = ref<
  Array<{
    value: GenderType;
    id: string;
    checked?: boolean;
  }>
>([
  {
    id: "Male",
    value: "MALE",
    checked: false,
  },
  {
    id: "Female",
    value: "FEMALE",
    checked: false,
  },
  {
    id: "Other",
    value: "OTHER",
    checked: true,
  },
]);
const submitForm = async () => {
  passwordInfo$.value.$validate();
  if (passwordInfo$.value.$error) {
    return;
  }
  try {
    serverErrors.value = [];
    const res = await publicAxios.post("/auth/register", formData.value);
    alert("Account created successfully");
    await router.push({ name: "login" });
  } catch (error: any) {
    if (error.response) {
      const { data } = error.response;
      if (data.errorMessage) {
        if (String(data.errorMessage).toLowerCase() === "Please initialize roles first".toLowerCase()) {
          serverErrors.value = ['Something went wrong, please try again later'];
          await publicAxios.post("/auth/init");
          return;
        }
        else {
          serverErrors.value = [data.errorMessage];
          return;
        }
      }
      if (data.errors) {
        serverErrors.value = data.errors;
      }
    }
  }
};
const serverHasError = computed(() => serverErrors.value.length > 0);
const clearServerErrors = () => {
  serverErrors.value = [];
};
</script>
<template>
  <main class="flex justify-center items-center py-6 min-h-[60vh]">
    <form action="" class="w-full p-10 max-w-sm lg:max-w-xl bg-neutral-100 rounded-lg shadow-md border"
      @submit.prevent="submitForm">
      <div class="flex items-center justify-center py-10">
        <div class="h-8 w-8 fle items-center justify-center text-color1">
          <Logo />
        </div>
        <h1 class="text-4xl font-bold text-color1">Validient</h1>

      </div>
      <div>
        <p v-if="serverHasError" @click="clearServerErrors" class="border p-2 rounded bg-red-200">
          <span v-for="item in serverErrors" :key="item" class="text-red-500 text-sm">
            {{ item }}
          </span>
        </p>
      </div>
      <!-- Personal info -->
      <div v-if="currentStep === 'personal-info'" class="flex flex-col">
        <!-- First name -->
        <label class="flex flex-col gap-2 text-gray-700 text-xs font-bold mb-2">
          <span> First name </span>
          <input v-model="formData.firstName" name="firstName" type="text" class="register-input" placeholder="First Name"
            required />
          <p v-if="personalInfo$.firstName.$error">
            <span v-for="item in personalInfo$.firstName.$errors" :key="item.$uid" class="text-red-500 text-sm">
              {{ item.$message }}
            </span>
          </p>
        </label>
        <!-- Last name -->
        <label class="flex flex-col gap-2 text-gray-700 text-xs font-bold mb-2">
          <span class="uppercase"> Last name </span>
          <input type="text" name="lastName" v-model="formData.lastName" placeholder="Last name" class="register-input"
            required />
          <p v-if="personalInfo$.lastName.$error">
            <span v-for="item in personalInfo$.lastName.$errors" :key="item.$uid" class="text-red-500 text-sm">
              {{ item.$message }}
            </span>
          </p>
        </label>
        <!-- Email address -->
        <label class="flex flex-col gap-2 text-gray-700 text-xs font-bold mb-2">
          <span class="uppercase"> Email </span>
          <input type="email" v-model="formData.email" name="email" class="register-input" placeholder="Email" />
          <p v-if="personalInfo$.email.$error">
            <span v-for="item in personalInfo$.email.$errors" :key="item.$uid" class="text-red-500 text-sm">
              {{ item.$message }}
            </span>
          </p>
        </label>
        <!-- Username -->
        <label class="flex flex-col gap-2 text-gray-700 text-xs font-bold mb-2">
          <span class="uppercase"> Username </span>
          <input type="email" v-model="formData.username" name="username" class="register-input" placeholder="Username" />
          <p v-if="personalInfo$.username.$error">
            <span v-for="item in personalInfo$.username.$errors" :key="item.$uid" class="text-red-500 text-sm">
              {{ item.$message }}
            </span>
          </p>
        </label>
        <!-- Gender -->
        <label for="gender" class="flex flex-col gap-2 text-gray-700 text-xs font-bold mb-2">
          <span class="block"> Gender </span>
          <div class="flex gap-2">
            <label v-for="{ id, value, checked } of genderInfo" class="flex items-center gap-2" :for="id">
              <input v-model="formData.gender" :value="value" type="radio" name="gender" :id="id" :checked="checked" />
              <span>{{ value }}</span>
            </label>
          </div>
        </label>
        <div>
          <button class="w-full px-10 py-2 rounded-full text-color2" @click.prevent="handleNext('password')" :class="[
            personalInfo$.$error
              ? 'cursor-not-allowed bg-color8 text-color2 border border-color2'
              : 'bg-color1',
          ]">
            {{ personalInfo$.$error ? "Fix form errors" : "Next page" }}
          </button>
        </div>
      </div>
      <!-- Password -->
      <div v-if="currentStep === 'password'" class="flex flex-col">
        <label class="flex flex-col gap-2 text-gray-700 text-xs font-bold mb-2">
          <span class="uppercase"> Password </span>
          <input type="password" v-model="formData.password" name="password" class="register-input"
            placeholder="Password" />
          <p v-if="passwordInfo$.password.$error">
            <span v-for="item in passwordInfo$.password.$errors" :key="item.$uid" class="text-red-500 text-sm block">
              {{ item.$message }}
            </span>
          </p>
        </label><label class="flex flex-col gap-2 text-gray-700 text-xs font-bold mb-2">
          <span class="uppercase">Confirm Password </span>
          <input type="password" v-model="formData.confirmPassword" name="confirmPassword" class="register-input"
            placeholder="Confirm Password" />
          <p v-if="passwordInfo$.confirmPassword.$error">
            <span v-for="item in passwordInfo$.confirmPassword.$errors" :key="item.$uid"
              class="text-red-500 text-sm block">
              {{ item.$message }}
            </span>
          </p>
        </label>
        <label for="acceptTerms" class="my-2 p-2 flex gap-2">
          <input type="checkbox" name="acceptTerms" id="acceptTerms" />
          <span>
            Accept <router-link to="#" class="text-blue-500">Terms</router-link> and
            <router-link to="#">Privacy policies</router-link>
          </span>
        </label>
        <p v-if="passwordInfo$.ac">

        </p>
        <div class="flex gap-4 flex-col-reverse md:flex-row">
          <button class="w-full bg-gray-200 px-10 py-2 rounded-full border hover:bg-color1"
            @click.prevent="handleNext('personal-info')">
            Go back
          </button>
          <button :disabled="!validForm" class="w-full bg-color1 text-lg py-2 px-4 rounded-lg"
            :class="[validForm ? 'bg-color1' : 'bg-color8 cursor-not-allowed']">
            Create account
          </button>
        </div>
      </div>
      <p class="py-4 text-center">
        Already have an account? <router-link :to="{ name: 'login' }" class="text-blue-500">Login</router-link>
      </p>
    </form>
  </main>
</template>

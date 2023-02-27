<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import { SignInFormPropType } from '@/typings'
import { computed, ref } from "vue";
import {
  required,
  minLength,
  maxLength
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useAuthStore } from '@/store/useAuthStore'
const store = useAuthStore()
const formData = ref<SignInFormPropType>({
  username: "",
  password: "",
});
const loginRules = computed(() => ({
  username: { required, },
  password: { required, minLength: minLength(8), maxLength: maxLength(32) },

}));
const valid$ = useVuelidate(loginRules, formData);
const handleLogin = async () => {
  valid$.value.$validate();
  if (valid$.value.$error) {
    return;
  }
  await store.loginUser(formData.value)
  console.log(formData.value)
}
</script>
<template>
  <main>
    <div class="flex flex-wrap bg-color8 p-4">
      <div class="w-full px-4 flex justify-center items-center h-screen">
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg m-4 border max-w-md">
          <div class="rounded-t bg-white mb-0 px-6 py-6">
            <div class="flex justify-center items-center gap-4 font-bold text-color1">
              <div class="h-8 w-8 text-color1">
                <Logo />
              </div>
              <h1>Validient</h1>
            </div>
            <h1 class="text-3xl text-center my-4 uppercase font-bold">Sign in</h1>
            <hr class="mt-6 border-b-1 border-gray-400" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
            <form @submit.prevent="handleLogin">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Username</label>
                <input type="text" v-model="formData.username" class="register-input w-full" placeholder="username" />
              </div>
              <p v-if="valid$.username.$error">
                <span v-for="item in valid$.username.$errors" :key="item.$uid" class="text-red-500 text-sm">
                  {{ item.$message }}
                </span>
              </p>
              <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
                <input type="password" v-model="formData.password" class="register-input w-full" placeholder="Password" />
              </div>
              <p v-if="valid$.password.$error">
                <span v-for="item in valid$.password.$errors" :key="item.$uid" class="text-red-500 text-sm">
                  {{ item.$message }}
                </span>
              </p>
              <div class="text-center mt-6">
                <button
                  class="bg-color1 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
                  type="submit">
                  Sign In
                </button>
              </div>
              <p class="py-4 text-center">
                Don't have an account?
                <router-link :to="{ name: 'register' }" class="text-blue-500">Sign up</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

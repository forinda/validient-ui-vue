<script setup lang="ts">
import Logo from "@/components/Logo.vue";
</script>
<template>
  <main>
    <div class="flex flex-wrap bg-color8 p-4">
      <div class="w-full px-4 flex justify-center items-center h-screen">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg m-4 border max-w-md"
        >
          <div class="rounded-t bg-white mb-0 px-6 py-6">
            <div
              class="flex justify-center items-center gap-4 font-bold text-color1"
            >
              <div class="h-8 w-8 text-color1">
                <Logo />
              </div>
              <h1>Validient</h1>
            </div>
            <h1 class="text-3xl text-center my-4 uppercase font-bold">Sign in</h1>
            <hr class="mt-6 border-b-1 border-gray-400" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                  >Email</label
                >
                <input
                  type="email"
                  class="register-input w-full"
                  placeholder="Email"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                  >Password</label
                >
                <input
                  type="password"
                  class="register-input w-full"
                  placeholder="Password"
                />
              </div>
              <div class="text-center mt-6">
                <button
                  class="bg-color1 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
                  type="button"
                >
                  Sign In
                </button>
              </div>
              <p class="py-4 text-center">
                Don't have an account?
                <router-link :to="{ name: 'Register' }" class="text-blue-500">Sign up</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

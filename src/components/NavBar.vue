<template>
  <main class="bg-neutral-50 border-b sticky top-0 z-[99999]">
    <div class="mx-auto max-w-7xl flex justify-between py-4">
      <!-- Logo -->
      <router-link :to="{ name: 'Home' }" class="flex items-center gap-4">
        <!-- draw a v logo  svg-->
        <Logo />
        <h1>
          <span class="text-2xl font-bold text-colo">Validient</span>
          <span class="text-2xl font-bold">Law</span>
        </h1>
      </router-link>
      <!-- Navlinks -->
      <nav class="flex items-center">
        <ul class="flex gap-6 items-center">
          <li v-for="link in headerLinks.unauthorized" :key="link.name">
            <router-link
              :to="link.href"
              class="text-lg font-lg text-neutral-500 hover:text-neutral-900"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- CTAs -->
      <div class="flex gap-4">
        <router-link
          :to="{ name: 'Login' }"
          class="text-md font-medium hover:text-neutral-900 px-4 py-2 rounded-full border border-color1 text-color1"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'Register' }"
          class="text-md font-medium hover:text-neutral-900 bg-color1 text-color3 py-2 px-4 rounded-full"
        >
          Register
        </router-link>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { HeaderLinksType } from "@/typings";
import Logo from "./Logo.vue";
import { ref } from "vue";
const headerLinks = ref<HeaderLinksType>({
  unauthorized: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "FAQs",
      href: "/faq", 
    },
  ],
  authorized: [
    {
      name: "Login",
      href: "/login",
    },
    {
      name: "Register",
      href: "/register",
    },
  ],
});
</script>

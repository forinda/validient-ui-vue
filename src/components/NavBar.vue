<template>
  <main class="bg-neutral-50 border-b sticky top-0 lg:z-[99999] ">
      <div class="mx-auto max-w-7xl flex justify-between py-2 lg:py-4">
          <!-- Logo -->
          <router-link :to="{ name: 'home' }" class="flex items-center gap-2 lg:gap-4">
              <!-- draw a v logo  svg-->
              <Logo />
              <h1>
                  <span class="text-md lg:text-2xl font-bold text-colo">Validient</span>
                  <span class="text-md lg:text-2xl font-bold">Law</span>
              </h1>
          </router-link>
          <!-- Navlinks -->
          <nav class=" flex items-center">
              <ul :class="showMenu ? 'flex' : 'hidden'" class=" flex-col
                  mt-8
                  space-y-4 lg:flex lg:gap-6 lg:items-center">
                  <li v-for="link in headerLinks" :key="link.name">
                      <router-link :to="link.href"
                          class="text-md font-mediumlg:text-lg lg:font-lg text-neutral-500 hover:text-neutral-900">
                          {{ link.name }}
                      </router-link>
                  </li>
              </ul>
              <div @click="toggleMenu"
                  class="lg:hidden justify-center flex items-center mr-2 ml-1 cursor-pointer transition">
                  <button type="button">
                      <fa icon="fa fa-bars" class="text-2xl"></fa>
                  </button>
              </div>

          </nav>
          <!-- CTAs -->
          <div v-if="authStateAuthenticated" class="flex gap-2 items-center  md:gap-4">
              <div v-for="({ routeName, title }) of dashBoardLinks">
                  <router-link v-if="routeName === 'client'" :to="{ name: routeName }"
                      class="text-md font-medium hover:text-neutral-900 px-2 py-1 lg:px-4 lg:py-2 rounded-full border flex items-center lg:gap-2">
                      @
                      {{ authStateUser?.username }}
                      <img :src="authStateUser?.avatar!" alt="" class="h-8 w-8 rounded-full">
                  </router-link>
                  <router-link v-else :to="{ name: routeName }"
                      class="text-lg font-lg text-neutral-500 hover:text-neutral-900">
                      {{ title }}
                  </router-link>
              </div>


          </div>
          <div v-if="!authStateAuthenticated" class="flex gap-2 lg:gap-4">
              <router-link :to="{ name: 'login' }"
                  class="text-md font-medium hover:text-neutral-900 px-4 py-2 rounded-full border border-color1 text-color1">
                  Login
              </router-link>
              <router-link :to="{ name: 'register' }"
                  class="text-md font-medium hover:text-neutral-900 bg-color1 text-color3 py-2 px-4 rounded-full">
                  Register
              </router-link>
          </div>

      </div>
  </main>
</template>
<script setup lang="ts">
import Logo from "./Logo.vue";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import useAuthStore from "@/store/useAuthStore";
const store = useAuthStore();
const { authStateAuthenticated, authStateUser } = storeToRefs(useAuthStore())
const headerLinks = ref([
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
],);
type RouteV = {
  name: string;
  title: string;
  routeName: string;
}
const dashBoardLinks = computed((): RouteV[] => {
  const pages: RouteV[] = []
  store.authStateUser?.roles?.forEach((role) => {
      if (role.name === 'user') {
          pages.push({
              name: 'client',
              title: 'Profile',
              routeName: 'client'
          })
      }
      if (role.name === 'lawyer') {
          pages.push({
              name: 'lawyer',
              title: 'Lawyer dashboard',
              routeName: 'lawyer'
          })
      }
      if (role.name === 'admin') {
          pages.push({
              name: 'admin',
              title: 'admin dashboard',
              routeName: 'admin'
          })
      }

  })
  pages.push({
      name: 'logout',
      title: 'Logout',
      routeName: 'logout'
  })
  return pages.sort((a, b) => a.title.localeCompare(b.title))
})
// responsive navbar
const showMenu = ref(false)
const toggleMenu = () => (showMenu.value = !showMenu.value)

</script>

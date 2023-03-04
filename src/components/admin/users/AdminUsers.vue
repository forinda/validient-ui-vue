<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import {
  UserType,
  UserRoleType,
} from "@/typings";
import { ref, computed, onMounted } from "vue";
import { publicAxios } from "@/api";
import filterUserRoles from "@/utils/roleFilter";
const { authStateAccessToken } = storeToRefs(useAuthStore());

const tableBody = ref<Array<UserType>>([]);
const userRoles = ref<Array<UserRoleType>>([]);
onMounted(() => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  const fetchUsers = async () => {
    try {
      const res = await publicAxios.get("/users", config);
      tableBody.value = res.data;
      console.log("users", tableBody.value);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchUserRoles = async () => {
    try {
      const res = await publicAxios.get("/roles", config);
      userRoles.value = res.data;
      console.log("userRoles", userRoles.value);
    } catch (error) {
      console.log("error", error);
    }
  };
  return Promise.all([fetchUsers(), fetchUserRoles()]);
});
// pagination details
const currentPage = ref(1);
const pageSize = 10;
const pageCount = computed(() => {
  return Math.ceil(tableBody.value.length / pageSize);
});
const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return tableBody.value.slice(startIndex, endIndex);
});

type userStatsKeys =
  | "users"
  | "lawyers"
  | "admins"
  | "total"
  | "male"
  | "female";
type userStatsType = {
  [key in userStatsKeys]: {
    count: number;
    percentage: number;
    title: string;
    color: string;
    icon: string;
  };
} & {
  [key: string]: {
    count: number;
    percentage: number;
    title: string;
    color: string;
    icon: string;
  };
};


const computedUserStats = computed((): userStatsType => {
  const users = tableBody.value.filter(
    (user) =>
      filterUserRoles(user.roles.map((role) => role.name.toLowerCase())) ===
      "user"
  );
  const lawyers = tableBody.value.filter(
    (user) =>
      filterUserRoles(user.roles.map((role) => role.name.toLowerCase())) ===
      "lawyer"
  );
  const admins = tableBody.value.filter(
    (user) =>
      filterUserRoles(user.roles.map((role) => role.name.toLowerCase())) ===
      "admin"
  );
  const males = tableBody.value.filter(
    (u) => u.gender.toLowerCase() === "male"
  );
  const females = tableBody.value.filter(
    (u) => u.gender.toLowerCase() === "female"
  );
  const other = tableBody.value.filter(
    (u) =>
      u.gender.toLowerCase() !== "male" || u.gender.toLowerCase() !== "female"
  );
  const userStats = {
    users: {
      count: users.length,
      percentage: (users.length / tableBody.value.length) * 100,
      title: "Users",
      color: "bg-color1",
      icon: "fa fa-user",
    },

    lawyers: {
      count: lawyers.length,
      percentage: (lawyers.length / tableBody.value.length) * 100,
      title: "Lawyers",
      color: "bg-color2",
      icon: "fa fa-user-tie",
    },
    admins: {
      count: admins.length,
      percentage: (admins.length / tableBody.value.length) * 100,
      title: "Admins",
      color: "bg-color3",
      icon: "fa fa-user-shield",
    },
    total: {
      count: tableBody.value.length,
      percentage: 100,
      title: "Total",
      color: "bg-color4",
      icon: "fa fa-users",
    },
    female: {
      color: "",
      count: females.length,
      icon: "fa fa-person",
      percentage: (females.length / tableBody.value.length) * 100,
      title: "Female users",
    },
    male: {
      color: "",
      count: males.length,
      icon: "fa fa-person",
      percentage: (males.length / tableBody.value.length) * 100,
      title: "Male users",
    },
    other: {
      color: "",
      count: other.length,
      icon: "fa fa-person",
      percentage: (other.length / tableBody.value.length) * 100,
      title: "Other users",
    },
  } satisfies userStatsType;
  return userStats;
});
// prevent form propagation
const formClick = (e: Event) => {
  e.stopPropagation();
};
// user creation modal
const createUserModal = ref<boolean>(false);
const toggleCreateUserModal = (val: boolean) => {
  createUserModal.value = val;
};
const createUserModalOpen = computed(() => {
  return createUserModal.value;
});
</script>
<template>
  <main class="p-4 flex flex-col gap-4 py-10">
    <!-- create New user modal -->
    <Teleport to="#modal"
      >>
      <div
        class="fixed top-0 w-screen min-h-screen overflow-y-auto bg-gray-500 opacity-95 left-0 z-[999999999] flex justify-center items-center overflow-scroll"
        :class="{ hidden: !createUserModalOpen, block: createUserModalOpen }"
        @click="toggleCreateUserModal(false)"
      ></div>
      <!-- end of create new user modal -->
    </Teleport>
    <!-- Quick actions -->
    <div class="rounded-md border-b p-4 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold uppercase">Users</h1>
      </div>
      <div>
        <router-link :to="{ name: 'adminNewUser' }" class="bg-color2 px-4 py-2 rounded-md text-color3"> Add new user </router-link>
      </div>
    </div>
    <div class="bg-white w-full border">
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] grid-rows-2 w-full gap-4 bg-white p-4 mx-4"
      >
        <div
          v-for="key of Object.keys(computedUserStats)"
          class="h-full flex flex-col p-4 justify-between border rounded-lg bg-color8"
        >
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">
                {{ computedUserStats?.[key].count.toString().padStart(2, "0") }}
              </h1>
              <p>{{ computedUserStats?.[key].title }}</p>
            </div>
            <div>
              <fa
                :icon="computedUserStats?.[key].icon"
                class="text-color2 bg-color3 p-4 rounded-full h-8 w-8"
              ></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>{{ computedUserStats?.[key].percentage.toFixed(1) }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- table -->
    <div class="bg-white border overflow-scroll no-scrollbar">
      <table
        class="table-auto w-full text-sm text-center text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-sm"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th>
              <div class="flex items-center justify-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </th>
            <th scope="col" class="px-6 py-3">id</th>
            <th scope="col" class="px-6 py-3">avatar</th>
            <th scope="col" class="px-6 py-3">username</th>
            <th scope="col" class="px-6 py-3">role</th>
            <th scope="col" class="px-6 py-3">first name</th>
            <th scope="col" class="px-6 py-3">last name</th>
            <th scope="col" class="px-6 py-3">gender</th>
            <th scope="col" class="px-6 py-3">email</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user,index) in paginatedItems"
            :key="user.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div class="flex items-center justify-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td>
              {{ index+1 }}
            </td>
            <td>
              <div class="flex justify-center items-centers">
                <img
                  :src="user.avatar ? user.avatar : ''"
                  alt=""
                  class="h-8 w-8 rounded-full object-cover"
                />
              </div>
            </td>
            <td>
              {{ user.username }}
            </td>
            <td>
              {{
                filterUserRoles(
                  user.roles.map((role) => role.name.toLowerCase())
                )
              }}
            </td>
            <td>
              {{ user.firstName }}
            </td>
            <td>
              {{ user.lastName }}
            </td>
            <td>
              {{ user.gender }}
            </td>
            <td>
              {{ user.email }}
            </td>
            <td>
              <div>
                <router-link
                  :to="{ name: 'adminUserDetails', params: { userId: user.id } }"
                  class="text-blue-600 hover:text-blue-900"
                  >View details</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <div class="flex justify-center items-center gap-2 pb-4 border-t">
        <button
          class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
          v-if="currentPage > 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <button
          v-for="page in pageCount"
          :key="page"
          @click="currentPage = page"
        >
          &gt;{{ page }}
        </button>
        <button
          class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
          v-if="currentPage < pageCount"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped></style>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import MultiSelect from "@vueform/multiselect";
import { AppointmentType, UserType } from "@/typings";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { publicAxios } from "@/api";
import formatScheduleTime from "@/utils/formatScheduleTime";
import { getDateStatus } from "@/utils/dateBefoeAfterUtil";
import moment from "moment";

const modalOpen = ref(false);
const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore());
const allAppointments = ref<AppointmentType[]>([]);
const personalAppointments = ref<AppointmentType[]>([]);
const users = ref<UserType[]>([]);
const toggleModal = (val: boolean) => {
  console.log("toggleModal");
  modalOpen.value = val;
};

const formClick = (e: Event) => {
  e.stopPropagation();
};

onMounted(async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  const fetchAppointments = async () => {
    try {
      const response = await publicAxios.get("/appointments", config);
      const data = await response.data;
      allAppointments.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPersonalAppointments = async () => {
    try {
      const response = await publicAxios.get(
        `/appointments/${authStateUser.value?.id}/personalAppointments`,
        config
      );
      const data = await response.data;
      personalAppointments.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await publicAxios.get("/users", config);
      const data = await response.data;
      users.value = data;
      console.log(users.value);
    } catch (error) {
      console.log(error);
    }
  };

  return Promise.all([
    fetchAppointments(),
    fetchPersonalAppointments(),
    fetchUsers(),
  ]);
});
// pagination details
const currentPage = ref(1);
const pageSize = 10;
const pageCount = computed(() => {
  return Math.ceil(allAppointments.value.length / pageSize);
});
const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return allAppointments.value.slice(startIndex, endIndex);
});
</script>
<template>
  <main class="flex-col py-10">
    <div class="flex items-center justify-between px-4 py-5">
     <h1 class="font-bold">
        Appointments
     </h1>
     <router-link
      :to="{ name: 'adminNewAppointment' }"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Create new appointment
    </router-link>
    </div>
    <!-- create new appointment button -->

    
    <div>
      <div class="h-full flex flex-col gap-4 p-2">
        <div class="shadow w-full p-4 flex gap-4 border">
          <div
            class="border w-full max-w-xs bg-white p-4 rounded flex items-center justify-between gap-4"
          >
            <div class="text-center">
              <h1 class="font-extrabold text-6xl">
                {{ personalAppointments.length }}
              </h1>
              <p class="text-2xl capitalize">Appointments</p>
            </div>
            <div class="flex justify-end w-full">
              <fa icon="fa fa-calendar"></fa>
            </div>
          </div>
          <div
            class="border w-full max-w-xs bg-white p-4 rounded flex items-center justify-between gap-4"
          >
            <div class="text-center">
              <h1 class="font-extrabold text-6xl">
                {{ personalAppointments.length }}
              </h1>
              <p class="text-2xl capitalize">today's appointments</p>
            </div>
            <div class="flex justify-end w-full">
              <fa icon="fa fa-calendar"></fa>
            </div>
          </div>
        </div>
        <!-- Schedule listing -->
        <div v-if="allAppointments" class="bg-white border overflow-scroll no-scrollbar">
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
            <th scope="col" class="px-6 py-3">title</th>
            <th scope="col" class="px-6 py-3">time</th>
            <th scope="col" class="px-6 py-3">date</th>
            <th scope="col" class="px-6 py-3">creator</th>
            <th scope="col" class="px-6 py-3">Members</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(appointment,index) in paginatedItems"
            :key="appointment.id"
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
              {{ appointment.title }}
            </td>
            <td>
              {{ moment(formatScheduleTime(appointment)).format("HH:mm") }}
            </td>
            <td>
              <div>
                {{ moment(formatScheduleTime(appointment)).format("DD/MM/YYYY") }}  
              </div>
            </td>
            <td>
             <div>
                {{ appointment.owner.firstName }}
                {{ appointment.owner.lastName }}
             </div>
            </td>
            <td>
              <select>
                <option v-for="member in appointment.members" :key="member.id">
                  {{ member.firstName }}
                  {{ member.lastName }}
                </option>
              </select>
            </td>
            <td>
              <div>
                <router-link
                  :to="{ name: 'adminAppointmentDetails', params: { appointmentId: appointment.id } }"
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
      </div>
    </div>
  </main>
</template>

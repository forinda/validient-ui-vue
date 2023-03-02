<script setup lang="ts">
import { publicAxios } from "@/api";
import useAuthStore from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { ApexOptions } from "apexcharts";
import axios from "axios";
import {
  UserType,
  LawyerType,
  CaseType,
  CaseStatusType,
  ScheduleType,
  CaseDefendantType,
  caseFilingType,
  AppointmentType,
  UserRoleType,
} from "@/typings";
import { getDateStatus } from "@/utils/dateBefoeAfterUtil";
import formatScheduleTime from "@/utils/formatScheduleTime";
import moment from "moment";

const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore());
const schedules = ref<Array<ScheduleType>>([]);
const caseDefendants = ref<Array<CaseDefendantType>>([]);
const caseFilings = ref<Array<caseFilingType>>([]);
const appointments = ref<Array<AppointmentType>>([]);
const roles = ref<Array<UserRoleType>>([]);

onMounted(async () => {
  const headers = {
    Authorization: `Bearer ${authStateAccessToken.value}`,
  };
  const fetchSchedules = async () => {
    try {
      const res = await publicAxios.get("/schedules", { headers });
      console.log("schedules", res.data);
      schedules.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCaseFilings = async () => {
    try {
      const res = await publicAxios.get("/cases", { headers });
      console.log("caseFilings", res.data);
      caseFilings.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAppointments = async () => {
    try {
      const res = await publicAxios.get("/appointments", { headers });
      console.log("appointments", res.data);
      appointments.value = res.data.filter(
        (appointment: AppointmentType) =>
          appointment.owner === authStateUser.value?.id ||
          appointment.members.some((user) => {
            const u = user as unknown as UserType;
            return u.id === authStateUser.value?.id;
          })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRoles = async () => {
    try {
      const res = await publicAxios.get("/roles", { headers });
      console.log("roles", res.data);
      roles.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return Promise.all([
    fetchSchedules(),
    fetchCaseFilings(),
    fetchAppointments(),
    fetchRoles(),
  ]);
});
</script>
<template>
  <main class="flex flex-col gap-4 p-4 font-rubik bg-neutral-100 h-full">
    <div class="gap-4 w-full">
      <!-- <div class="h-80 w-80 bg-white rounded border flex flex-col p-4 justify-between shadow">
          <div class="py-2">
            <h1 class="text-center">{{ authStateUser?.firstName }} {{ authStateUser?.lastName }}</h1>
            <p class="text-center">{{ authStateUser?.email }}</p>
          </div>
          <div class="h-full flex justify-center items-center">
            <img :src="authStateUser?.avatar" alt="" class="h-32 w-32 rounded-full">
          </div>
          <div class="">
            <h1 class="text-center font-bold ">Roles</h1>
            <ul class="flex items-center justify-center gap-2">
              <li v-for="role in authStateUser?.roles" :key="role.id"
                class=" px-2 text-sm rounded-full bg-color2 text-color3">
                {{ role.name }}
              </li>
            </ul>
          </div>
        </div> -->
      <!-- Stats grid -->
      <div class="grid grid-cols-5 grid-rows-2 w-full gap-4">
        <!-- Grid item1 -->
        <!-- <div class=" bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ lawyers.length }}</h1>
              <p>Lawyers</p>
            </div>
            <div>
              <fa icon="fa fa-user" class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div> -->
        <!-- Grid 2 -->
        <!-- <div class=" bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ users.length }}</h1>
              <p>Users</p>
            </div>
            <div>
              <fa icon="fa fa-user" class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div> -->
        <!-- Grid 3 -->
        <!-- <div class=" bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ caseTypes.length }}</h1>
              <p>Case types</p>
            </div>
            <div>
              <fa icon="fa fa-user" class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div> -->
        <!-- Grid 4 -->
        <!-- <div class=" bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ caseStatuses.length }}</h1>
              <p>Case statuses</p>
            </div>
            <div>
              <fa icon="fa fa-user" class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div> -->
        <!-- Grid 5 -->
        <div class="bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ schedules.length }}</h1>
              <p>Schedules</p>
            </div>
            <div>
              <fa
                icon="fa fa-user"
                class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"
              ></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div>
        <!-- Grid 6 -->
        <!-- <div class=" bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ caseDefendants.length }}</h1>
              <p>Case defendants</p>
            </div>
            <div>
              <fa icon="fa fa-user" class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div> -->
        <!-- Grid 7 -->
        <div class="bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">
                {{ caseDefendants.length }}
              </h1>
              <p>Case files</p>
            </div>
            <div>
              <fa
                icon="fa fa-user"
                class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"
              ></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div>
        <!-- Grid 8 -->
        <div class="bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">
                {{ appointments.length }}
              </h1>
              <p>Appointments</p>
            </div>
            <div>
              <fa
                icon="fa fa-user"
                class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"
              ></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div>
        <!-- Grid 9 -->
        <!-- <div class=" bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ roles.length }}</h1>
              <p>Roles</p>
            </div>
            <div>
              <fa icon="fa fa-user" class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div> -->
        <div></div>
      </div>
    </div>
    <table
      v-if="appointments.length"
      class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-sm shadow-lg"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th>
            <div class="flex items-center justify-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">Id</th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Date</th>
          <th scope="col" class="px-6 py-3">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="schedule in appointments"
          :key="schedule.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div class="flex items-center justify-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ schedule.id }}
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ schedule.title }}
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              class="border px-2 rounded-full uppercase py-1 text-xs"
              :class="{
                'bg-green-600 text-white':
                  getDateStatus(formatScheduleTime(schedule)) === 'today',
                'bg-red-300 text-white':
                  getDateStatus(formatScheduleTime(schedule)) === 'yesterday',
                'bg-yellow-600 text-white':
                  getDateStatus(formatScheduleTime(schedule)) === 'tomorrow',
                'bg-neutral-200': true,
              }"
              >{{ getDateStatus(formatScheduleTime(schedule)) }}</span
            >
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ schedule.description }}
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ moment(formatScheduleTime(schedule)).format("MMMM Do YYYY") }}
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ moment(formatScheduleTime(schedule)).format("HH:mm") }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

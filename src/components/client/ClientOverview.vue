<script setup lang="ts">
import { publicAxios } from "@/api";
import useAuthStore from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed } from "vue";
import { ApexOptions } from "apexcharts";
import axios from "axios";
import {
  UserType,
  LawyerType,
  CaseType,
  CaseStatusType,
  ScheduleType,
  CaseDefendantType,
  CaseFilingType,
  AppointmentType,
  UserRoleType,
} from "@/typings";
import { getDateStatus } from "@/utils/dateBefoeAfterUtil";
import formatScheduleTime from "@/utils/formatScheduleTime";
import moment from "moment";

type clientStatsKeys =
  | "totalCases"
  | "totalSchedules"
  | "totalAppointments"
  | "totalFilings"
  | "todaySchedules"
  | "todayAppointments"
  | "createdAppointments"
  | "memberAppointments"
  | "tomorrowSchedules";

type ClientStatsType = {
  [key in clientStatsKeys]: {
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

const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore());
const schedules = ref<Array<ScheduleType>>([]);
const caseFilings = ref<Array<CaseFilingType>>([]);
const appointments = ref<Array<AppointmentType>>([]);

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
      appointments.value = res.data
      // .filter(
      //   (appointment: AppointmentType) =>
      //     appointment.owner === authStateUser.value?.id ||
      //     appointment.members.some((user) => {
      //       const u = user as unknown as UserType;
      //       return u.id === authStateUser.value?.id;
      //     })
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return Promise.all([
    fetchSchedules(),
    fetchCaseFilings(),
    fetchAppointments(),
  ]);
});

const clientStats = computed((): ClientStatsType => {
  const totalCases = caseFilings.value.length;
  const totalSchedules = schedules.value.length;
  const totalAppointments = appointments.value.length;
  const createdAppointments = appointments.value.filter(
    (appointment) =>
      (appointment.owner as unknown as UserType).id === authStateUser.value?.id
  );
  const memberAppointments = appointments.value.filter((appointment) =>
    appointment.members.some((user) => {
      const u = user as unknown as UserType;
      return u.id === authStateUser.value?.id;
    })
  );
  const tomorrowSchedules = schedules.value.filter(
    (schedule) =>
      getDateStatus(schedule as any) === "tomorrow" &&
      schedule.user.id === authStateUser.value?.id
  );
  const todaySchedules = schedules.value.filter(
    (schedule) =>
      getDateStatus(schedule as any) === "today" &&
      schedule.user.id === authStateUser.value?.id
  );
  const personalSchedules = schedules.value.filter(
    (schedule) => schedule.user.id === authStateUser.value?.id
  )

  const clientcases = caseFilings.value.filter(
    (caseFiling) => caseFiling.plaintiff.id === authStateUser.value?.id

  );

  return {
    totalCases: {
      count: totalCases,
      percentage: 0,
      title: "Total Cases Filed",
      color: "bg-blue-500",
      icon: "fas fa-file-alt",
    },
    totalSchedules: {
      count: totalSchedules,
      percentage: 0,
      title: "Total Schedules",
      color: "bg-green-500",
      icon: "fas fa-calendar-alt",
    },
    totalAppointments: {
      count: memberAppointments.length,
      percentage: 0,
      title: "Total Appointments",
      color: "bg-yellow-500",
      icon: "fas fa-calendar-check",
    },
    createdAppointments: {
      count: createdAppointments.length,
      percentage: (createdAppointments.length / totalAppointments) * 100,
      title: "Created Appointments",
      color: "bg-yellow-500",
      icon: "fas fa-calendar-check",
    },
    memberAppointments: {
      count: memberAppointments.length,
      percentage: memberAppointments.length ,
      title: "Member Appointments",
      color: "bg-yellow-500",
      icon: "fas fa-calendar-check",
    },
    totalFilings: {
      count: clientcases.length,
      percentage: 0,
      title: "Total Filings",
      color: "bg-indigo-500",
      icon: "fas fa-file",
    },

    todaySchedules: {
      count: todaySchedules.length,
      percentage: 0,
      title: "Today Schedules",
      color: "bg-green-500",
      icon: "fas fa-calendar-alt",
    },
    todayAppointments: {
      count: memberAppointments.filter(
        (appointment) => getDateStatus(appointment as any) === "today"
      ).length,
      percentage: 0,
      title: "Today Appointments",
      color: "bg-yellow-500",
      icon: "fas fa-calendar-check",
    },
    tomorrowSchedules: {
      count: tomorrowSchedules.length,
      percentage: 0,
      title: "Tomorrow Schedules",
      color: "bg-green-500",
      icon: "fas fa-calendar-alt",
    },
  };
});
</script>
<template>
  <main class="flex flex-col gap-4 p-4 font-rubik bg-neutral-100 h-full">
    <div class="bg-white w-full border">
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] grid-rows-2 w-full gap-4 bg-white p-4 mx-4"
      >
        <div
          v-for="key of Object.keys(clientStats)"
          class="h-full flex flex-col p-4 justify-between border rounded-lg bg-color8"
        >
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">
                {{ clientStats?.[key].count.toString().padStart(2, "0") }}
              </h1>
              <p>{{ clientStats?.[key].title }}</p>
            </div>
            <div>
              <fa
                :icon="clientStats?.[key].icon"
                class="text-color2 bg-color3 p-4 rounded-full h-8 w-8"
              ></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>{{ clientStats?.[key].percentage.toFixed(1) }}%</p>
          </div>
        </div>
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

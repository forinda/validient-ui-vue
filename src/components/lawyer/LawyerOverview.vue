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

const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore());
const lawyers = ref<Array<LawyerType>>([]);
const users = ref<Array<UserType>>([]);
const caseTypes = ref<Array<CaseType>>([]);
const caseStatuses = ref<Array<CaseStatusType>>([]);
const schedules = ref<Array<ScheduleType>>([]);
const caseDefendants = ref<Array<CaseDefendantType>>([]);
const caseFilings = ref<Array<CaseFilingType>>([]);
const appointments = ref<Array<AppointmentType>>([]);
const roles = ref<Array<UserRoleType>>([]);

type LawyerStatsKeys =
  | "cases"
  | "appointments"
  | "schedules"
  | "linkedAppointments";

type LawyerStats = {
  [key in LawyerStatsKeys]: {
    title: string;
    count: number;
  };
} & { [key: string]: any };

onMounted(async () => {
  const headers = {
    Authorization: `Bearer ${authStateAccessToken.value}`,
  };
  const fetchUsers = async () => {
    console.log("fetching users");

    try {
      const res = await publicAxios.get("/users", { headers });
      users.value = res.data;
      console.log("users", users.value);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLawyers = async () => {
    try {
      const res = await publicAxios.get("/lawyers", { headers });
      lawyers.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCaseTypes = async () => {
    try {
      const res = await publicAxios.get("/case-type", { headers });
      caseTypes.value = res.data;
      console.log("caseTypes", caseTypes.value);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCaseStatuses = async () => {
    try {
      const res = await publicAxios.get("/case-status", { headers });
      caseStatuses.value = res.data;
      console.log("caseStatuses", caseStatuses.value);
    } catch (error) {
      console.log(error);
    }
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
  const fetchCaseDefendants = async () => {
    try {
      const res = await publicAxios.get("/defendants", { headers });
      console.log("caseDefendants", res.data);
      caseDefendants.value = res.data;
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
      appointments.value = res.data;
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
    fetchLawyers(),
    fetchUsers(),
    fetchCaseTypes(),
    fetchCaseStatuses(),
    fetchSchedules(),
    fetchCaseDefendants(),
    fetchCaseFilings(),
    fetchAppointments(),
    fetchRoles(),
  ]);
});

const lawyerStats = computed((): LawyerStats => {
  const stats = {
    cases: {
      title: "Cases to handle",
      count: caseFilings.value.filter(
        (caseFiling) =>
          caseFiling.lawyer.id ===
          lawyers.value.find(
            (lawyer) => lawyer.user.id === authStateUser.value?.id
          )?.id
      ).length,
    },
    appointments: {
      title: "Appointments",
      count: 0,
    },
    schedules: {
      title: "Schedules",
      count: 0,
    },
    linkedAppointments: {
      title: "Linked Appointments",
      count: 0,
    },
  } satisfies LawyerStats;

  return stats;
});
</script>
<template>
  <main class="flex flex-col gap-4 p-4 font-rubik bg-neutral-100 h-full">
    <div class="bg-white w-full border">
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] grid-rows-2 w-full gap-4 bg-white p-4 mx-4"
      >
        <div
          v-for="key of Object.keys(lawyerStats)"
          class="h-full flex flex-col p-4 justify-between border rounded-lg bg-color8"
        >
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">
                {{ lawyerStats?.[key].count.toString().padStart(2, "0") }}
              </h1>
              <p>{{ lawyerStats?.[key].title }}</p>
            </div>
            <div>
              <fa
                :icon="lawyerStats?.[key].icon"
                class="text-color2 bg-color3 p-4 rounded-full h-8 w-8"
              ></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <div class="gap-4 w-full"></div>
  </main>
</template>

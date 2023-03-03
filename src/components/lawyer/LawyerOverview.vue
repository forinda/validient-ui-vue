<script setup lang="ts">
import { publicAxios } from "@/api";
import useAuthStore from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { ApexOptions } from "apexcharts";
import axios from "axios";
import { UserType,LawyerType, CaseType, CaseStatusType, ScheduleType, CaseDefendantType, caseFilingType, AppointmentType,UserRoleType } from "@/typings";

const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore())
const lawyers = ref<Array<LawyerType>>([]);
const users = ref<Array<UserType>>([]);
const caseTypes = ref<Array<CaseType>>([]);
const caseStatuses = ref<Array<CaseStatusType>>([]);
const schedules = ref<Array<ScheduleType>>([]);
const caseDefendants = ref<Array<CaseDefendantType>>([]);
const caseFilings = ref<Array<caseFilingType>>([]);
const appointments = ref<Array<AppointmentType>>([]);
  const roles = ref<Array<UserRoleType>>([]);

onMounted(async () => {
  const headers = {
    Authorization: `Bearer ${authStateAccessToken.value}`,
  };
  const fetchUsers = async () => {
    console.log('fetching users');

    try {
      const res = await publicAxios.get('/users', { headers })
      users.value = res.data
      console.log('users', users.value);

    } catch (error) {
      console.log(error);
    }
  }
  const fetchLawyers = async () => {
    try {
      const res = await publicAxios.get('/lawyers', { headers })
      lawyers.value = res.data
    } catch (error) {
      console.log(error);
    }
  }
  const fetchCaseTypes = async () => {
    try {
      const res = await publicAxios.get('/case-type', { headers })
      caseTypes.value = res.data
      console.log('caseTypes', caseTypes.value);
      
    } catch (error) {
      console.log(error);
    }
  }
  const fetchCaseStatuses = async () => {
    try {
      const res = await publicAxios.get('/case-status', { headers })
      caseStatuses.value = res.data
      console.log('caseStatuses', caseStatuses.value);

    } catch (error) {
      console.log(error);
    }
  }
  const fetchSchedules = async () => {
    try {
      const res = await publicAxios.get('/schedules', { headers })
      console.log('schedules', res.data);
      schedules.value = res.data

    } catch (error) {
      console.log(error);
    }
  }
  const fetchCaseDefendants = async () => {
    try {
      const res = await publicAxios.get('/defendants', { headers })
      console.log('caseDefendants', res.data);
      caseDefendants.value = res.data

    } catch (error) {
      console.log(error);
    }
  }
  const fetchCaseFilings = async () => {
    try {
      const res = await publicAxios.get('/cases', { headers })
      console.log('caseFilings', res.data);
      caseFilings.value = res.data

    } catch (error) {
      console.log(error);
    }
  }
  const fetchAppointments = async () => {
    try {
      const res = await publicAxios.get('/appointments', { headers })
      console.log('appointments', res.data);
      appointments.value = res.data

    } catch (error) {
      console.log(error);
    }
  }
  const fetchRoles = async () => {
    try {
      const res = await publicAxios.get('/roles', { headers })
      console.log('roles', res.data);
      roles.value = res.data

    } catch (error) {
      console.log(error);
    }
  }


  return Promise.all([
    fetchLawyers(),
    fetchUsers(),
    fetchCaseTypes(),
    fetchCaseStatuses(),
    fetchSchedules(),
    fetchCaseDefendants(),
    fetchCaseFilings(),
    fetchAppointments(),
    fetchRoles()
  ])

})


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
        <div class=" bg-white h-full flex flex-col p-4 justify-between">
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
        </div>
        <!-- Grid 2 -->
        <div class=" bg-white h-full flex flex-col p-4 justify-between">
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
        </div>
        <!-- Grid 3 -->
        <div class=" bg-white h-full flex flex-col p-4 justify-between">
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
        </div>
        <!-- Grid 4 -->
        <div class=" bg-white h-full flex flex-col p-4 justify-between">
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
        </div>
        <!-- Grid 5 -->
        <div class=" bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ schedules.length }}</h1>
              <p>Schedules</p>
            </div>
            <div>
              <fa icon="fa fa-user" class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div>
        <!-- Grid 6 -->
        <div class=" bg-white h-full flex flex-col p-4 justify-between">
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
        </div>
        <!-- Grid 7 -->
        <div class=" bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ caseDefendants.length }}</h1>
              <p>Case files</p>
            </div>
            <div>
              <fa icon="fa fa-user" class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div>
        <!-- Grid 8 -->
        <div class=" bg-white h-full flex flex-col p-4 justify-between">
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="color-1 font-bold text-3xl">{{ appointments.length }}</h1>
              <p>Appointments</p>
            </div>
            <div>
              <fa icon="fa fa-user" class="text-color3 bg-color2 p-4 rounded-full h-8 w-8"></fa>
            </div>
          </div>
          <div class="h-fit border-t">
            <p>Available</p>
          </div>
        </div>
         <!-- Grid 9 -->
         <div class=" bg-white h-full flex flex-col p-4 justify-between">
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
        </div>
        <div>
        </div>
      </div>
    </div>
  </main>
</template>

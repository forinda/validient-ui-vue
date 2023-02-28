<script setup lang="ts">
import { publicAxios } from "@/api";
import { ScheduleType } from "@/typings";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import moment from 'moment'
import formatScheduleTime from "@/utils/formatScheduleTime";
const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore())
const date = ref(new Date());
const userSchedules = ref<ScheduleType[]>([]);
const todaysSchedules = computed(() => {
  return userSchedules.value.filter((schedule) => {
    return moment(formatScheduleTime(schedule)).isSame(date.value, "day");
  });
});
const totalSchedules = computed(() => {
  return userSchedules.value.length;
});
onMounted(async () => {
  try {
    const res = await publicAxios.get(`/schedules/user/${authStateUser.value?.id}`, {
      headers: {
        Authorization: `Bearer ${authStateAccessToken.value}`,
      },
    })
    userSchedules.value = res.data;
  } catch (err) {
    console.log(err);
  }
})
</script>
<template>
  <div class="h-full flex flex-col gap-4 p-2">
    <div class="shadow w-full p-4 flex gap-4 border">
      <div class="border w-full max-w-xs bg-white p-4 rounded flex items-center justify-between gap-4">
        <div class="text-center">
          <h1 class="font-extrabold text-6xl">{{ totalSchedules }}</h1>
          <p class="text-2xl capitalize">
            Schedules
          </p>
        </div>
        <div class="flex justify-end w-full">
          <fa icon="fa fa-calendar"></fa>
        </div>
      </div>
      <div class="border w-full max-w-xs bg-white p-4 rounded flex items-center justify-between gap-4">
        <div class="text-center">
          <h1 class="font-extrabold text-6xl">{{ todaysSchedules.length }}</h1>
          <p class="text-2xl capitalize">
            today's Schedules
          </p>
        </div>
        <div class="flex justify-end w-full">
          <fa icon="fa fa-calendar"></fa>
        </div>
      </div>
    </div>
    <!-- Schedule listing -->
    <table v-if="userSchedules.length"
      class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-sm shadow-lg">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th>

            <div class="flex items-center justify-center">
              <input id="checkbox-all-search" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">Id</th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Date</th>
          <th scope="col" class="px-6 py-3">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="schedule in userSchedules" :key="schedule.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <div class="flex items-center justify-center">
              <input id="checkbox-all-search" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </td>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ schedule.id }}
          </td>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ schedule.title }}
          </td>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ schedule.description }}
          </td>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ moment(formatScheduleTime(schedule)).format('MMMM Do YYYY') }}
          </td>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ moment(formatScheduleTime(schedule)).format('HH:mm') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
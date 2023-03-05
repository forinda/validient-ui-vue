<script setup lang="ts">
import { publicAxios } from "@/api";
import { ScheduleType, DateStatusType } from "@/typings";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import moment from "moment";
import formatScheduleTime from "@/utils/formatScheduleTime";
import { getDateStatus } from "@/utils/dateBefoeAfterUtil";
import { dateMonthYearRetrieve } from "@/utils/dateMonthYearRetrieve";

type ScheduleStatsKeys =
  | "total"
  | "today"
  | "upcoming"
  | "past"
  | "thisWeek"
  | "thisMonth"
  | "thisYear";

type ScheduleStatsType = {
  [k in ScheduleStatsKeys]: {
    title: string;
    count: number;
    icon: string;
  };
} & { [k: string]: any };

const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore());
const date = ref(new Date());
const userSchedules = ref<ScheduleType[]>([]);

onMounted(async () => {
  try {
    const res = await publicAxios.get(
      `/schedules/user/${authStateUser.value?.id}`,
      {
        headers: {
          Authorization: `Bearer ${authStateAccessToken.value}`,
        },
      }
    );
    userSchedules.value = (res.data as unknown as ScheduleType[]).filter(
      (s) => s.user.id === authStateUser.value?.id!
    );
  } catch (err) {
    console.log(err);
  }
});

const scheduleCountsAvailable = computed(() => {
  return userSchedules.value.length > 0;
});
const dateTimeToday = new Date();
const scheduleStats = computed((): ScheduleStatsType => {
  const total = userSchedules.value.length;
  const today = userSchedules.value.filter((schedule) => {
    const { date, month, year } = dateMonthYearRetrieve(
      formatScheduleTime(schedule)
    );
    return (
      date === dateTimeToday.getDate() &&
      month === dateTimeToday.getMonth() + 1 &&
      year === dateTimeToday.getFullYear()
    );
  }).length;
  const upcoming = userSchedules.value.filter((schedule) => {
    const { date, month, year } = dateMonthYearRetrieve(
      formatScheduleTime(schedule)
    );
    return (
      date > dateTimeToday.getDate() &&
      month >= dateTimeToday.getMonth() + 1 &&
      year >= dateTimeToday.getFullYear()
    );
  }).length;
  const past = userSchedules.value.filter((schedule) => {
    const { date, month, year } = dateMonthYearRetrieve(
      formatScheduleTime(schedule)
    );
    return moment(`${year}-${month}-${date}`).isBefore(
      `${dateTimeToday.getFullYear()}-${
        dateTimeToday.getMonth() + 1
      }-${dateTimeToday.getDate()}`
    );
  }).length;
  const thisWeek = userSchedules.value.filter((schedule) => {
    const { date, month, year } = dateMonthYearRetrieve(
      formatScheduleTime(schedule)
    );
    const dateToday = dateTimeToday.getDate();
    const monthToday = dateTimeToday.getMonth() + 1;
    const yearToday = dateTimeToday.getFullYear();
    const dateSchedule = date;
    const monthSchedule = month;
    const yearSchedule = year;
    const dateTodayMoment = moment(`${yearToday}-${monthToday}-${dateToday}`);
    const dateScheduleMoment = moment(
      `${yearSchedule}-${monthSchedule}-${dateSchedule}`
    );
    const diff = dateTodayMoment.diff(dateScheduleMoment, "days");
    return diff >= 0 && diff <= 7;
  }).length;
  const thisMonth = userSchedules.value.filter((schedule) => {
    const { date, month, year } = dateMonthYearRetrieve(
      formatScheduleTime(schedule)
    );
    const dateToday = dateTimeToday.getDate();
    const monthToday = dateTimeToday.getMonth() + 1;
    const yearToday = dateTimeToday.getFullYear();
    const dateSchedule = date;
    const monthSchedule = month;
    const yearSchedule = year;
    const dateTodayMoment = moment(`${yearToday}-${monthToday}-${dateToday}`);
    const dateScheduleMoment = moment(
      `${yearSchedule}-${monthSchedule}-${dateSchedule}`
    );
    const diff = dateTodayMoment.diff(dateScheduleMoment, "days");
    return diff >= 0 && diff <= 30;
  }).length;
  const thisYear = userSchedules.value.filter((schedule) => {
    const { date, month, year } = dateMonthYearRetrieve(
      formatScheduleTime(schedule)
    );
    const dateToday = dateTimeToday.getDate();
    const monthToday = dateTimeToday.getMonth() + 1;
    const yearToday = dateTimeToday.getFullYear();
    const dateSchedule = date;
    const monthSchedule = month;
    const yearSchedule = year;
    const dateTodayMoment = moment(`${yearToday}-${monthToday}-${dateToday}`);
    const dateScheduleMoment = moment(
      `${yearSchedule}-${monthSchedule}-${dateSchedule}`
    );
    const diff = dateTodayMoment.diff(dateScheduleMoment, "days");
    return diff >= 0 && diff <= 365;
  }).length;

  return {
    total: {
      title: "Total",
      count: total,
      icon: "fa fa-calendar",
    },
    today: {
      title: "Today",
      count: today,
      icon: "fa fa-calendar",
    },
    upcoming: {
      title: "Upcoming",
      count: upcoming,
      icon: "fa fa-calendar",
    },
    past: {
      title: "Past",
      count: past,
      icon: "fa fa-calendar",
    },
    thisWeek: {
      title: "This Week",
      count: thisWeek,
      icon: "fa fa-calendar",
    },
    thisMonth: {
      title: "This Month",
      count: thisMonth,
      icon: "fa fa-calendar",
    },
    thisYear: {
      title: "This Year",
      count: thisYear,
      icon: "fa fa-calendar",
    },
  };
});
</script>
<template>
  <div class="py-5 px-8 flex justify-between items-center">
    <h1 class="font-bold">
      {{ scheduleCountsAvailable ? "Schedule Counts" : "No Schedules" }}
    </h1>
    <router-link
      :to="{ name: 'adminNewSchedule' }"
      class="text-white hover:text-blue-600 border py-2 px-4 rounded bg-color2"
      >Create new schedule</router-link
    >
  </div>
  <div v-if="scheduleCountsAvailable" class="bg-white w-full border">
    <div
      class="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] grid-rows-2 w-full gap-4 bg-white p-4 mx-4"
    >
      <div
        v-for="key of Object.keys(scheduleStats)"
        class="h-full flex flex-col p-4 justify-between border rounded-lg bg-color8"
      >
        <div class="flex justify-between">
          <div class="flex flex-col gap-2">
            <h1 class="color-1 font-bold text-3xl">
              {{ scheduleStats?.[key].count.toString().padStart(2, "0") }}
            </h1>
            <p>{{ scheduleStats?.[key].title }}</p>
          </div>
          <div>
            <fa
              :icon="scheduleStats?.[key].icon"
              class="text-color2 bg-color3 p-4 rounded-full h-8 w-8"
            ></fa>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule listing -->
    <table
      v-if="userSchedules.length"
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
          v-for="schedule in userSchedules"
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
  </div>
  <div
    v-else
    class="h-full p-10 text-center flex justify-center flex-col gap-4"
  >
    <p class="text-center text-gray-500 font-bold text-3xl">
      No schedules found
    </p>
    <div>
      <p>
        Get started by creating a new schedule
        <router-link
          :to="{ name: 'adminNewSchedule' }"
          class="text-blue-500 hover:text-blue-600"
          >here</router-link
        >
      </p>
      <p>
        Create personal schedules to keep track of your daily activities and
        tasks
      </p>
    </div>
  </div>
</template>

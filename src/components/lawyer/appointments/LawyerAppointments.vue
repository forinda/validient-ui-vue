<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import MultiSelect from "@vueform/multiselect";
import { AppointmentType, NewAppointmentType, UserType } from "@/typings";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { publicAxios } from "@/api";
import formatScheduleTime from "@/utils/formatScheduleTime";
import { getDateStatus } from "@/utils/dateBefoeAfterUtil";
import { getDateStamp } from "@/utils/getDateStamp";
import moment from "moment";

const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore());
const allAppointments = ref<AppointmentType[]>([]);
const personalAppointments = ref<AppointmentType[]>([]);

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

  return Promise.all([fetchAppointments(), fetchPersonalAppointments()]);
});
type AppointmentStatsKeys =
  | "today"
  | "tomorrow"
  | "past"
  | "upcoming"
  | "all"
  | "personal"
  | "linked";
type AppointmentStatsType = {
  [k in AppointmentStatsKeys]: {
    title: string;
    count: number;
    items: AppointmentType[];
    icon?: string;
  } 
}
const lawyerStats = computed(() => {
  const past = allAppointments.value.filter((appointment) => {
    return getDateStamp(appointment) === "past";
  });
  const upcoming = allAppointments.value.filter((appointment) => {
    return getDateStamp(appointment) === "upcoming";
  });
  const all = allAppointments.value;
  const personal = personalAppointments.value;
  const linked = allAppointments.value.filter((appointment) => {
    return appointment.members.find(
      (member) => member.id === authStateUser.value?.id
    );
  });
  return {
    today: {
      title: "Today's Appointments",
      count: allAppointments.value.filter((appointment) => {
        return getDateStamp(appointment) === "today";
      }).length,
      items: allAppointments.value.filter((appointment) => {
        return getDateStamp(appointment) === "today";
      }),
    },
    tomorrow: {
      title: "Tomorrow's Appointments",
      count: allAppointments.value.filter((appointment) => {
        return getDateStamp(appointment) === "tomorrow";
      }).length,
      items: allAppointments.value.filter((appointment) => {
        return getDateStamp(appointment) === "tomorrow";
      }),
    },
    past: {
      title: "Past Appointments",
      count: past.length,
      items: past,
    },
    upcoming: {
      title: "Upcoming Appointments",
      count: upcoming.length,
      items: upcoming,
    },
    all: {
      title: "All Appointments",
      count: all.length,
      items: all,
    },
    personal: {
      title: "Personal Appointments",
      count: personal.length,
      items: personal,
    },
    linked: {
      title: "Linked Appointments",
      count: linked.length,
      items: linked,
    },
  } satisfies AppointmentStatsType;
});
const linkedOrPersonalAppointments = computed(() => {
  return allAppointments.value.filter((appointment) => {
    return (
      appointment.members.find(
        (member) => member.id === authStateUser.value?.id
      ) || appointment.owner.id === authStateUser.value!.id
    );
  });
});
const numberOfApointmentsPerPage = 5;
const currentPage = ref(1);
const numberOfPages = computed(() => {
  return Math.ceil(
    linkedOrPersonalAppointments.value.length / numberOfApointmentsPerPage
  );
});
const paginatedAppointments = computed(() => {
  const start = (currentPage.value - 1) * numberOfApointmentsPerPage;
  const end = start + numberOfApointmentsPerPage;
  return linkedOrPersonalAppointments.value.slice(start, end);
});
const nextPage = () => {
  if (currentPage.value < numberOfPages.value) {
    currentPage.value++;
  }
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const totalPages = computed(() => {
  return Math.ceil(
    linkedOrPersonalAppointments.value.length / numberOfApointmentsPerPage
  );
});
</script>
<template>
  <main class="flex-col py-10">
    <div>
      <div></div>
    </div>
    <!-- create new appointment button -->
    <div class="flex justify-end py-4 px-4">
      <router-link
        :to="{ name: 'lawyerAppointmentsNew' }"
        class="bg-color2 text-color3 border py-2 px-4 rounded"
      >
        Create new appointment
      </router-link>
    </div>

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
                {{ lawyerStats?.[key as AppointmentStatsKeys].count.toString().padStart(2, "0") }}
              </h1>
              <p>{{ lawyerStats?.[key as AppointmentStatsKeys].title }}</p>
            </div>
            <div>
              <fa
                :icon="lawyerStats?.[key as AppointmentStatsKeys]"
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
    <div class="grid grid-cols-[1fr_280px]">
      <div>
        <!-- component -->
        <section class="container px-4 mx-auto">
          <div class="sm:flex sm:items-center sm:justify-between">
            <div>
              <div class="flex items-center gap-x-3">
                <h2 class="text-lg font-medium text-gray-800 dark:text-white">
                  Appointments
                </h2>

                <span
                  class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"
                >
                  {{ linkedOrPersonalAppointments.length }} Appointments</span
                >
              </div>

              <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
                These are all your appointments invited and personal
              </p>
            </div>

            <div class="flex items-center mt-4 gap-x-3">
              <button
                class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
              >
                <!-- <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3098_154395)">
                    <path
                      d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                      stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3098_154395">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg> -->

                <!-- <span>Import</span> -->
              </button>

              <button
                class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> -->

                <!-- <span>Add vendor</span> -->
              </button>
            </div>
          </div>

          <div class="mt-6 md:flex md:items-center md:justify-between">
            <div
              class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700"
            >
              <button
                class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
              >
                View all
              </button>

              <button
                class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                Monitored
              </button>

              <button
                class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                Unmonitored
              </button>
            </div>

            <div class="relative flex items-center mt-4 md:mt-0">
              <span class="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Search"
                class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div class="flex flex-col mt-6">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
              >
                <div
                  class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
                >
                  <table
                    class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <thead class="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button
                            class="flex items-center gap-x-3 focus:outline-none"
                          >
                            <span>Title</span>

                            <svg
                              class="h-3"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.3"
                              />
                            </svg>
                          </button>
                        </th>

                        <th
                          scope="col"
                          class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Description
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Members
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Date
                        </th>

                        <th scope="col" class="relative py-3.5 px-4">
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                    >
                      <tr v-for="appointment in paginatedAppointments">
                        <td
                          class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                        >
                          <div>
                            <h2
                              class="font-medium text-gray-800 dark:text-white"
                            >
                              Title
                            </h2>
                            <p
                              class="text-sm font-normal text-gray-600 dark:text-gray-400"
                            >
                              {{ appointment.title }}
                            </p>
                          </div>
                        </td>
                        <td
                          class="px-12 py-4 text-sm font-medium whitespace-nowrap"
                        >
                          <div
                            class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800"
                          >
                            {{ getDateStamp(appointment) }}
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 class="text-gray-700 dark:text-gray-200">
                              Appointment description
                            </h4>
                            <p class="text-gray-500 dark:text-gray-400">
                              {{ appointment.description }}
                            </p>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="flex items-center">
                            <img
                              v-for="user in appointment.members.slice(0, 3)"
                              class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              :src="user.avatar"
                              alt=""
                            />
                            <p
                              v-if="appointment.members.length > 3"
                              class="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full"
                            >
                              +{{ appointment.members.length - 3 }}
                            </p>
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="w-4">
                            {{
                              moment(formatScheduleTime(appointment)).format(
                                "LLL"
                              )
                            }}
                            <!-- <div class="bg-blue-500 w-2/3 h-1.5"></div> -->
                          </div>
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <button
                            class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 sm:flex sm:items-center sm:justify-between">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Page {{ currentPage }} of {{ totalPages }}
            </div>

            <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
              <button
                type="button"
                class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
                :disabled="currentPage === 1"
                @click="prevPage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 rtl:-scale-x-100"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span> previous </span>
              </button>

              <button
                type="button"
                :disabled="currentPage === totalPages"
                @click="nextPage"
                class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                <span> Next </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 rtl:-scale-x-100"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
      <div class="p-8 border rounded h-fit">
        <div>
          <h1 class="text-center font-bold text-2xl">Today</h1>
        </div>
        <ul v-if="lawyerStats.today.items.length" class="flex flex-col gap-4">
          <li
            v-for="appointment in lawyerStats.today.items"
            :key="appointment.id"
            class="border shadow-md rounded p-4"
          >
            <h1>
              {{ appointment.title }}
            </h1>
            <p>
              {{ moment(formatScheduleTime(appointment)).format("LLL") }}
            </p>
          </li>
        </ul>
        <div v-else>
          <p>No appointments today</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { AppointmentType, LawyerType } from "@/typings";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import moment from "moment";
import formatScheduleTime from "@/utils/formatScheduleTime";

const { authStateAccessToken } = storeToRefs(useAuthStore());

const router = useRouter();
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const fetchAppointment = ref<AppointmentType>({} as unknown as AppointmentType);

const msg = ref("Case details");
onMounted(async () => {
  const fetchCaseFile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authStateAccessToken.value}`,
      },
    };
    try {
      isLoading.value = true;
      isError.value = false;
      const res = await publicAxios.get(
        `/appointments/appointment/${router.currentRoute.value.params.appointmentId}/get`,//appointments/appointment/23/get
        config
      );
      const data = res.data;
      fetchAppointment.value = data;
    } catch (error) {
      console.log(error);
      isError.value = true;
    } finally {
      /**@ts-ignore */
      console.log(fetchAppointment.value);
      isLoading.value = false;
    }
  };
  return Promise.all([fetchCaseFile()]);
});
</script>

<template>
  <div v-if="isLoading" class="h-full w-full flex justify-center">
    <p>Loading...</p>
  </div>
  <div v-if="isError && !isLoading">
    <p>Error occured while fetching case details</p>
  </div>
  <div v-else-if="!isLoading&&fetchAppointment" class="font-rubik py-10 px-4 flex flex-col gap-4">
    <!-- User details -->
    <fieldset v-if="fetchAppointment.owner" class="border-2 p-4">
      <legend class="font-bold text-md uppercase">Creator details</legend>
      <p>
        <strong class="font-bold">Username:</strong>
        {{ fetchAppointment.owner.username }}
      </p>
      <p>
        <strong class="font-bold">First name:</strong>
        {{ fetchAppointment.owner.firstName }}
      </p>
      <p>
        <strong class="font-bold">Last name:</strong>
        {{ fetchAppointment.owner.lastName }}
      </p>
      <p>
        <strong class="font-bold">Email address:</strong>
        {{ fetchAppointment.owner.email }}
      </p>
    
    </fieldset>
    <fieldset v-if="!isLoading&&fetchAppointment" class="border-2 p-4">
      <legend class="font-bold text-md uppercase">Appointment info</legend>
      <p>
        <strong class="font-bold">Date time:</strong>
        {{ moment(formatScheduleTime(fetchAppointment)).format("LLLL") }}
      </p> <p>
        <strong class="font-bold">Date :</strong>
        {{ moment(formatScheduleTime(fetchAppointment)).format("DD-MM-yy") }}
      </p>
      <p>
        <strong class="font-bold">Time:</strong>
        {{ moment(formatScheduleTime(fetchAppointment)).format("hh:mm a") }}
      </p>
      <p>
        <strong class="font-bold">Title:</strong>
        {{fetchAppointment.title    }}
      </p>
      <p>
        <strong class="font-bold">Description:</strong>
        <br>
        {{ fetchAppointment.description }}
      </p>
    </fieldset>
    <!-- Case category -->
    <fieldset v-if="fetchAppointment.members" class="border-2 p-4">
      <legend class="font-bold text-md uppercase">Members</legend>
        <div v-for="member in fetchAppointment.members" :key="member.id" class="border my-1 p-4 rounded">
            <p>
            <strong class="font-bold">Username:</strong>
            {{ member.username }}
            </p>
            <p>
            <strong class="font-bold">First name:</strong>
            {{ member.firstName }}
            </p>
            <p>
            <strong class="font-bold">Last name:</strong>
            {{ member.lastName }}
            </p>
            <p>
            <strong class="font-bold">Email address:</strong>
            {{ member.email }}
            </p>
        </div>

    </fieldset>
    <!-- Lawyer details -->
   
   
  </div>
</template>

<style scoped>
/* code */
</style>

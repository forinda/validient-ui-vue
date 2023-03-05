<script setup lang="ts">
import { NewScheduleType } from "@/typings";
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { publicAxios } from "@/api";
import { useRouter } from "vue-router";

const router = useRouter();
const { authStateUser, authStateAccessToken } = storeToRefs(useAuthStore());
const newSchedule = ref<NewScheduleType>({
  title: "",
  description: "",
  date: 0,
  month: 0,
  year: 0,
  startHour: 0,
  startMinute: 0,
});
const handleSubmit = async (e: Event) => {
  const form = e.target as HTMLFormElement;
  // if (form.in) {
  //     alert('Please fill all fields')
  //     console.log(form.checkValidity());

  //     return
  // }
  const creationConfig = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  const createSchedule = async () => {
    try {
      const { data } = await publicAxios.post(
        `/schedules/user/${authStateUser.value?.id}/create`,
        newSchedule.value,
        creationConfig
      );
      alert("Schedule created successfully");
      data && await router.push({ name: "adminSchedules" });
    } catch (err) {
      console.log(err);
    }
  };
  await createSchedule();
};
const date = ref(new Date());
watch(date, (val) => {
  const d = new Date(val);
  newSchedule.value = {
    ...newSchedule.value,
    date: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
    startHour: d.getHours(),
    startMinute: d.getMinutes(),
  };
});
</script>

<template>
  <div class="p-10">
    <form @submit.prevent="handleSubmit" class="form-component border w-full">
      <div>
        <h1 class="text-2xl font-bold text-center">
          New Schedule for
          <span class="px-4 text-underline text-blue-500 border rounded"
            >@{{ authStateUser?.username }}</span
          >
        </h1>
      </div>
      <div class="input-wrapper">
        <label for="name">Schedule title</label>
        <input
          required
          type="text"
          id="name"
          v-model="newSchedule.title"
          class="input-field"
          placeholder="Case status name eg."
        />
      </div>
      <div class="input-wrapper">
        <label for="name">Select date and time</label>
        <input
          required
          type="datetime-local"
          id="name"
          v-model="date"
          class="input-field"
          placeholder="Case status name eg."
        />
      </div>
      <div class="input-wrapper">
        <label for="description">Description</label>
        <textarea
          required
          type="text"
          id="description"
          v-model="newSchedule.description"
          class="input-field h-32"
          placeholder="Description"
        ></textarea>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.input-wrapper {
  @apply flex flex-col gap-1;
}

.input-field {
  @apply border border-gray-300 rounded p-2;
}

.submit-button {
  @apply bg-blue-500 text-white rounded p-2;
}

.form-component {
  @apply flex flex-col gap-4 w-full bg-white shadow-md rounded p-4 lg:p-10;
}
</style>

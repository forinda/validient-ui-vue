<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import MultiSelect from "@vueform/multiselect";
import { AppointmentType, NewAppointmentType, UserType } from '@/typings'
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { publicAxios } from "@/api";
import formatScheduleTime from "@/utils/formatScheduleTime";
import { getDateStatus } from "@/utils/dateBefoeAfterUtil";
import moment from "moment";

const modalOpen = ref(false);
const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore())
const allAppointments = ref<AppointmentType[]>([
]);
const personalAppointments = ref<AppointmentType[]>([
]);
const users = ref<UserType[]>([
]);
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
      const response = await publicAxios.get(`/appointments/${authStateUser.value?.id}/personalAppointments`, config);
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

  return Promise.all([fetchAppointments(), fetchPersonalAppointments(), fetchUsers()]);
});

const newAppointmentDateTime = ref(new Date());

const newAppointment = ref<NewAppointmentType>({
  title: "",
  description: "",
  year: 0,
  month: 0,
  date: 0,
  startHour: 0,
  startMinute: 0,
  members: [],
  owner: authStateUser.value?.id!,
});

type MemberType = {
  id: number;
  name: string;
  avatar: string;
  email: string;
  username: string;
};

const membersRef = ref<Array<MemberType>>([]);

const possibleMembers = computed(() => {
  return users.value.filter((user) => {
    return user.id !== authStateUser.value?.id;
  }).map((user) => {
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
      email: user.email,
      username: user.username,
    };
  }).filter((user) => {
    // extract 
    return !membersRef.value.some((member) => {
      return member.id === user.id;
    });
  });
});

const handleSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const selected = target.value;
  const selectedMember = possibleMembers.value.find((member) => {
    return member.id === Number(selected);
  });
  if (selectedMember) {
    membersRef.value.push(selectedMember);
    newAppointment.value.members = membersRef.value.map((member) => {
      return member.id;
    });
  }

}

const removeMember = (id: number) => {
  membersRef.value = membersRef.value.filter((member) => {
    return member.id !== id;
  });
}

watch(membersRef, (update) => {
  console.log(update);

  newAppointment.value.members = update.map((member) => {
    return member.id;
  });
});


watch(newAppointmentDateTime, (update) => {
  const val = new Date(update);
  newAppointment.value.year = val.getFullYear();
  newAppointment.value.month = val.getMonth() + 1;
  newAppointment.value.date = val.getDate();
  newAppointment.value.startHour = val.getHours();
  newAppointment.value.startMinute = val.getMinutes();
  console.log(newAppointment.value);

});
const handleCancel = (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLButtonElement;
  // reset form
  target.form?.reset();
  toggleModal(false);
  newAppointment.value = {
    title: "",
    description: "",
    year: 0,
    month: 0,
    date: 0,
    startHour: 0,
    startMinute: 0,
    members: [],
    owner: authStateUser.value?.id!,
  };
  membersRef.value = [];
  modalOpen.value = false;
};
const resetInputs = () => {
  newAppointment.value = {
    title: "",
    description: "",
    year: 0,
    month: 0,
    date: 0,
    startHour: 0,
    startMinute: 0,
    members: [],
    owner: authStateUser.value?.id!,
  };
  membersRef.value = [];
  modalOpen.value = false;
}
const handleFormSubmit = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  try {
    const res = await publicAxios.post("/appointments/create/new", newAppointment.value, config);
    alert("Appointment created successfully");
    res && resetInputs();

  }
  catch (err) {
    console.log(err);
  }
  finally {
    console.log("finally");

  }

}
</script>
<template>
  <main class="flex-col py-10">
    <div>
      <div>

      </div>
    </div>
    <!-- create new appointment button -->
    <div class="flex justify-end py-4 px-4">

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click.prevent="toggleModal(true)">
          Create New Appointment
        </button>
    </div>
    <!-- create appointment modal -->
    <div
      class="fixed top-0 w-screen min-h-screen overflow-y-auto bg-gray-500 opacity-95 left-0 z-[999999999] flex justify-center items-center"
      :class="{ 'hidden': !modalOpen, 'block': modalOpen }" @click="toggleModal(false)">
      <form action="" @click.pre="formClick" @submit.prevent="handleFormSubmit"
        class="w-full lg:max-w-2xl min-[20rem] bg-white rounded-lg p-4 lg:p-10 ">
        <div>
          <h1 class="text-center uppercase my-1 font-bold">Create new appointment</h1>
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="text-xl font-bold">Appointment title</label>
          <input required type="text" placeholder="Appointment title...." class="rounded "
            v-model="newAppointment.title">
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="text-xl font-bold">Schedule Date and time</label>
          <input required type="datetime-local" placeholder="Appointment time and date...."
            class="rounded" v-model="newAppointmentDateTime">
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="text-xl font-bold">Appointment descriription</label>
          <textarea required name="" id="" placeholder="Appointment description...." v-model="newAppointment.description"
            class="w-full h-32 rounded text-md"></textarea>
        </div>
        <div class="flex flex-col gap-2 ">
          <label for="" class="text-xl font-bold">Select members</label>
          <!-- selected members -->
          <div v-if="membersRef.length" class="flex gap-1 flex-wrap border p-2">
            <button v-for="m in membersRef" :key="m.id" @click.prevent="removeMember(m.id)"
              class="w-fit text-[12px] rounded-full bg-color2 text-color3 py-1 px-2">{{ m.name
              }} x</button>
          </div>
          <select name="" id="" :multiple="false" @change="handleSelect">
            <option value="" selected>Select members</option>
            <option v-for="user of possibleMembers" :value="user.id" class="py-2">
              <div class="flex items-center gap-2">
                <img :src="user.avatar" alt="" class="h-8 w-8 rounded-full">
                <span>{{ user.name }}</span>
              </div>
            </option>
          </select>
        </div>
        <div class="py-4 flex gap-4">
          <button type="reset" class="px-4 py-2 bg-gray-300 text-black rounded">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-color1 text-black rounded">
            Create
          </button>
        </div>
      </form>
    </div>
<div>
  <div class="h-full flex flex-col gap-4 p-2">
    <div class="shadow w-full p-4 flex gap-4 border">
      <div class="border w-full max-w-xs bg-white p-4 rounded flex items-center justify-between gap-4">
        <div class="text-center">
          <h1 class="font-extrabold text-6xl">{{ personalAppointments.length }}</h1>
          <p class="text-2xl capitalize">
            Appointments
          </p>
        </div>
        <div class="flex justify-end w-full">
          <fa icon="fa fa-calendar"></fa>
        </div>
      </div>
      <div class="border w-full max-w-xs bg-white p-4 rounded flex items-center justify-between gap-4">
        <div class="text-center">
          <h1 class="font-extrabold text-6xl">{{ personalAppointments.length }}</h1>
          <p class="text-2xl capitalize">
            today's appointments
          </p>
        </div>
        <div class="flex justify-end w-full">
          <fa icon="fa fa-calendar"></fa>
        </div>
      </div>
    </div>
    <!-- Schedule listing -->
    <table v-if="allAppointments.length"
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
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Date</th>
          <th scope="col" class="px-6 py-3">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="schedule in allAppointments" :key="schedule.id"
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
            <span class="border px-2 rounded-full uppercase py-1 text-xs"
              :class="{ 'bg-green-600 text-white': getDateStatus(formatScheduleTime(schedule)) === 'today', 'bg-red-300 text-white': getDateStatus(formatScheduleTime(schedule)) === 'yesterday', 'bg-yellow-600 text-white': getDateStatus(formatScheduleTime(schedule)) === 'tomorrow', 'bg-neutral-200': true }">{{
                getDateStatus(formatScheduleTime(schedule)) }}</span>
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
</div>
  </main>
</template>

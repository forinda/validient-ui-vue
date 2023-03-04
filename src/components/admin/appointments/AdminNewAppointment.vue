<script setup lang="ts">
import { publicAxios } from '@/api';
import { ref,onMounted,watch, computed } from 'vue'
import { AppointmentType, NewAppointmentType, UserType } from '@/typings'
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "vue-router";

const router = useRouter();

const { authStateAccessToken, authStateUser } = storeToRefs(useAuthStore())

const users = ref<UserType[]>([
]);
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
const handleFormSubmit = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
  };
  try {
    const res = await publicAxios.post("/appointments/create/new", newAppointment.value, config);
    alert("Appointment created successfully");
    res && await router.push({ name: "adminAppointments"});

  }
  catch (err) {
    console.log(err);
  }
  finally {
    console.log("finally");

  }

}
onMounted(async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authStateAccessToken.value}`,
    },
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

  return Promise.all([fetchUsers()]);
});
</script>

<template>
    <div>
        <form action="" @submit.prevent="handleFormSubmit"
        class="w-full  min-[20rem] bg-white rounded-lg p-4 lg:p-10 ">
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
</template>

<style scoped >
    /* code */
</style>
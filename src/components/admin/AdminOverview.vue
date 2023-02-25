<script setup lang="ts">
import { ref } from "vue";
import { ApexOptions } from "apexcharts";

const overviewData = ref<
  Array<{
    [key: string]: {
      name: string;
      icon: string;
      value: number;
    };
  }>
>([
  {
    appointments: {
      name: "Appointments",
      icon: "fa fa-calendar",
      value: 0,
    },
  },
  {
    clients: {
      name: "Clients",
      icon: "fa fa-user",
      value: 0,
    },
  },
  {
    lawyers: {
      name: "Lawyers",
      icon: "fa fa-user",
      value: 0,
    },
  },
  {
    users: {
      name: "Users",
      icon: "fa fa-users",
      value: 0,
    },
  },
  {
    roles: {
      name: "Roles",
      icon: "fa fa-user-shield",
      value: 0,
    },
  },
  {
    permissions: {
      name: "Permissions",
      icon: "fa fa-lock-open",
      value: 0,
    },
  },
]);

const topLawyers = ref([
  {
    name: "Jane Doe",
    email: "",
    image: "https://xsgames.co/randomusers/assets/avatars/female/20.jpg",
    appointments: 0,
  },
  {
    name: "John Doe",
    email: "",
    image: "https://xsgames.co/randomusers/assets/avatars/male/20.jpg",
    appointments: 0,
  },
  {
    name: "June M.",
    email: "",
    image: "https://xsgames.co/randomusers/assets/avatars/female/40.jpg",
    appointments: 0,
  },
  {
    name: "Dan Mose",
    email: "",
    image: "https://xsgames.co/randomusers/assets/avatars/male/10.jpg",
    appointments: 0,
  },
  {
    name: "John Doe",
    email: "",
    image: "https://xsgames.co/randomusers/assets/avatars/female/20.jpg",
    appointments: 0,
  },
]);

const ApxOptions = ref<ApexOptions>({
  theme: {
    mode: "light",
    monochrome: {
      color: "red",
    },
  },
  series: [
    {
      data: [
        {
          y: 3,
          x: "Jan",
        },
        {
          y: 50,
          x: "Feb",
          strokeColor: "#004534",
        },
        {
          y: 100,
          x: "March",
          strokeColor: "#004534",
        },
        {
          y: 30,
          x: "April",
          strokeColor: "#004534",
        },
        {
          y: 100,
          x: "May",
          strokeColor: "#004534",
        },
        {
          y: 100,
          x: "June",
          strokeColor: "#004534",
        },
        {
          y: 100,
          x: "July",
          strokeColor: "#004534",
        },
        {
          y: 100,
          x: "August",
          strokeColor: "#004534",
        },
        {
          y: 100,
          x: "September",
          strokeColor: "#004534",
        },
        {
          y: 43,
          x: "October",
          strokeColor: "#004534",
        },
        {
          y: 55,
          x: "November",
          strokeColor: "#004534",
        },
        {
          y: 67,
          x: "December",
          strokeColor: "#004534",
        },
      ],
      name: "Data layers",
    },
  ],
  xaxis: {
    title: {
      text: "Months (12)",
    },
  },
  yaxis: {
    title: { text: "Number of cases reported", offsetX: 3 },
  },
  chart: {
    height: 400,
    toolbar: {
      tools: { pan: true },
    },
    type: "candlestick",
  },
});

const t2 = {
  series: [
    {
      name: "Divorse cases",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Criminal cases",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "string",
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    tooltip: {
      x: {
        format: "MM",
      },
    },
  },
};
</script>
<template>
  <div
    class="overflow-scroll no-scrollbar grid grid-cols-[1fr_250px] gap-8 w-full min-h-screen p-4"
  >
    <div class="w-full flex flex-col gap-4">
      <div class="border p-10 rounded-lg shadow bg-color3">
        <h1 class="text-4xl font-bold">
          Welcome back, <span class="font-bold">Admin</span>
        </h1>
        <p class="text-xl">Admin stats and overview</p>
      </div>
      <div class="grid grid-cols-3 gap-4 p-4 border rounded bg-color3">
        <div
          v-for="item in overviewData"
          :key="Object.keys(item)[0]"
          class="flex items-center justify-between p-4 bg-gradient-to-r from-color1 to-color4 text-color3 shadow-md rounded h-24"
        >
          <div class="flex flex-col gap-2 text-xl uppercase p-10">
            <fa :icon="Object.values(item)[0].icon" class="text-4xl"></fa>
            <h1 class="ml-2">{{ Object.values(item)[0].name }}</h1>
          </div>
          <h1 class="text-5xl font-bold">{{ Object.values(item)[0].value }}</h1>
        </div>
      </div>
      <div class="h-fit bg-white p-4 rounded-lg border">
        <apexchart
          type="area"
          height="350"
          :options="t2.chartOptions"
          :series="t2.series"
        ></apexchart>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="bg-color3 p-4 rounded">
        <h1>Top lawyers</h1>
        <div class="flex flex-col gap-2">
          <div
            v-for="lawyer in topLawyers.slice(0, 5)"
            :key="lawyer.name"
            class="flex items-center gap-4 p-4 border rounded text-sm"
          >
            <div class="w-8 h-8 rounded-full bg-gray-200">
              <img :src="lawyer.image" alt="" class="h-full aspect-square rounded-full">
            </div>
            <div class="flex flex-col">
              <h1>{{ lawyer.name }}</h1>
              <p>{{ lawyer.email }}</p>
            </div>
            <div class="flex items-center">
              <i class="fa fa-calendar"></i>
              <h1 class="ml-2">{{ lawyer.appointments }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

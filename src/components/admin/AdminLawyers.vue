<script setup lang="ts">
import { ref } from "vue";
// <reference path="" /

type LaywerName = {
  name: String;
};
const lawyers = ref<Array<LaywerName>>([
  {
    name: "fel",
  },
  {
    name: "fel1",
  },
  {
    name: "fel2",
  },
  {
    name: "fel3",
  },
]);
</script>
<template>
  <ul class="flex gap-3 justify-center items-center">
    <template v-for="lawyer in lawyers">
      <li class="flex shadow-sm w-full h-24 bg-slate-50">{{ lawyer.name }}</li>
    </template>
  </ul>
</template>
<style scoped></style>

<script setup lang="ts">
import { ref } from "vue";

const date = ref(new Date());
</script>
<template>
  <div>
    <div class="border p-4 rounded-lg bg-white flex flex-col gap-4">
      <h1 class="">Appointments</h1>
      <v-calendar
        title-position="left"
        rows="3"
        columns="4"
        class="border-none"
        color="red"
        is-range
        :min-date="new Date()"
      />
    </div>
  </div>
</template>
<style scoped></style>

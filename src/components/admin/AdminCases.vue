<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";

const { authStateAuthenticated, authStateUser, authUserRoles } = storeToRefs(useAuthStore())


</script>
<template>
  <div>
    <h1>Cases</h1>
  </div>
</template>

<style scoped></style>

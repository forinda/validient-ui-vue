<script setup lang="ts">
import { ref,onMounted,watch } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const scheduleId = router.currentRoute.value.params.scheduleId
console.log({scheduleId});

const msg = ref('Hello World')

</script>

<template>
    <div>
        <h1>{{msg}}</h1>
    </div>
</template>

<style scoped >
    /* code */
</style>
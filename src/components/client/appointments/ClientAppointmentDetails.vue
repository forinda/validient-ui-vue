<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { AppointmentType } from '@/typings'
import { publicAxios } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter()

const appointment = ref<AppointmentType>()

onMounted(async () => {
    const fetchAppointment = async () => {
        try {
            const { data } = await publicAxios.get(`/api/appointments/${router.currentRoute.value.params.id}`)
            appointment.value = data
        } catch (err) {
            console.log(err)
        }
    }
    await fetchAppointment()
})

</script>

<template>
    <div>
        <h1>{{ appointment?.title }}</h1>
    </div>
</template>

<style scoped >
/* code */
</style>
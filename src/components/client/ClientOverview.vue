<template>
    <h1>Overview</h1>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { publicAxios } from '@/api';
import { onMounted } from 'vue'
import useAuthStore from '@/store/useAuthStore';

const { authStateAccessToken,authStateUser } = storeToRefs(useAuthStore())
onMounted(() => {
    try {
        publicAxios.get(`http://localhost:8080/api/v1/users`, {
            headers: {
                Authorization: `Bearer ${authStateAccessToken.value}`,
            },
        }).then(res => {
            console.log(res.data)
        })
    } catch (err) {
        console.log(err)
    }
    finally {
        console.log('finally')
    }
})
</script>
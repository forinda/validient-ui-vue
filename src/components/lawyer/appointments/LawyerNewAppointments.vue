<script setup lang="ts">
import { ref,onMounted,watch } from 'vue'

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
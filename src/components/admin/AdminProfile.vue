<script setup lang="ts">
// import { email } from '@vuelidate/validators';
import { ref } from 'vue';
const email = ref('felix@gmail.com')
const firstName = ref('Felix')
const lastName = ref('Orinda')
</script>
<template>
    <div class="  
                        ">
        <form class="bg-white shadow-d flex flex-col">
            <h1 class="text-xl text-center pt-5">Profile</h1>
            <div class="flex flex-col gap-3 pt-5">
                <div class="flex  justify-center items-center gap-2">
                    <label for="" class="flex flex-col text-slate-400">
                        First Name
                        <input type="name" v-model="firstName" class="p-2 border border-slate-400 rounded-md "
                            placeholder="felix@gmail.com">
                    </label>

                    <label for="" class="flex flex-col  text-slate-400">
                        Last Name
                        <input v-model="lastName" type="name" placeholder="" class="p-2 border-slate-400 rounded-md border">
                    </label>

                </div>
                <div class="flex left-[-100px] ">
                    <label for="" class="flex flex-col  text-slate-400">
                        <input v-model="email" type="email" name="" id="" class="p-2 border-slate-400 rounded-md border">
                    </label>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped></style>
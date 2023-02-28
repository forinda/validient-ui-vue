<script setup lang="ts">
// import { email } from '@vuelidate/validators';
import { ref } from 'vue';
const email = ref('felix@gmail.com')
const firstName = ref('Felix')
const lastName = ref('Orinda')
</script>
<template>
    <div class="flex gap-3 flex-col p-3">
        
        <form class="w-full mx-auto shadow rounded bg-slate-100 p-2 flex gap-5">
            <div class="flex-1 mt-12 flex flex-col gap-3 items-center">
                <img class="rounded-full w-20 h-20" src="https://xsgames.co/randomusers/assets/avatars/male/10.jpg" alt="">
                <button class="bg-sky-600 rounded p-3 text-white">Connect lawyers</button>
                <fa class="rounded bg-slate-400 capitalize font-semibold text-center text-2xl"
                    icon="fa fa-edit"><span>Edit</span></fa>
            </div>
            <div class="flex-1 flex flex-col">
                <h1 class="text-center text-3xl font-rubik">My Profile</h1>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        First Name
                    </label>
                    <input v-model="firstName"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="Enter your name">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Last Name
                    </label>
                    <input v-model="lastName"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="Enter your name">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input v-model="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Enter your email address">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
                        Comments
                    </label>
                    <textarea
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message" rows="5" placeholder="Enter your message"></textarea>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                        Save
                    </button>
                </div>
            </div>
        </form>

    </div>
</template>
<style scoped></style>


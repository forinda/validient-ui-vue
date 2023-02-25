<template>
    <main class="w-full bg-white py-10">
        <!-- Hero section -->
        <div class="mx-auto max-w-7xl w-full min-h-[80vh] flex flex-col-reverse lg:flex-row p-4">
            <div class="w-full lg:w-1/2 flex items-center">
                <div class="flex gap-6 flex-col">
                    <h1 class="text-5xl font-bold text-color2 font-catanta">We are experts in legal profession</h1>
                    <p class="text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt adipisci consectetur
                        incidunt aspernatur, hic ducimus vel odio ad dolor.
                    </p>
                    <div>
                        <button class="bg-color1 text py-2 px-6 text-2xl flex items-center gap-4 rounded-full">
                            <span class="text-white"> Get started </span>
                            <fa icon="fa fa-arrow-right" class="p-2 bg-white rounded-full text-color1"></fa>
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-1/2 relative flex items-center justify-center">
                <span class="bg-color2 h-48 w-48 rounded-full absolute left-12"></span>
                <span
                    class="h-64 w-64 border-r-color1 border-r-8 rounded-tr-full  border-t-8 border-t-color1 absolute rotate-180 right-8"></span>
                <div class="h-80 w-80 bg-color1 relative rounded-full">
                    <img src="/woman-folding hands.png" alt="" class="absolute -top-36 z-2 h-96 w-96 object-cover">
                    <div
                        class="absolute w-fit bg-white p-4 -bottom-20 border -right-20 z-10 flex flex-col rounded-md shadow-sm gap-2">
                        <div v-for="({ statIcon, statValue, title }) of heroStats" :key="title"
                            class="bg-color2 rounded p-2 flex gap-2 text-color3">
                            <fa :icon="statIcon" class="text-5xl bg-white p-2 bg-opacity-20 rounded"></fa>
                            <div>

                                <h1 class="font-bold text-xl">
                                    {{ statValue }}
                                </h1>
                                <p>{{ title }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <!-- Services -->
        <div id="why-choose-us" class="bg-color8 py-20 bg-opacity-25 min-h-[50vh]">
            <div class="max-w-7xl mx-auto w-full h-full flex flex-col gap-10">
                <div class="flex flrx-col gap-2 flex-col text-center ">
                    <h1 class="text-lg uppercase font-bold text-color1">Our services</h1>
                    <p class="text-color2 font-bold text-5xl italic">Our practice area</p>
                </div>
                <div class="grid gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 p-4">
                    <div v-for="({ title, icon, description }) of validientServices" :key="title"
                        class="p-6 bg-white rounded-md shadow hover:bg-color1 bg-opacity-40 hover:text-color3 group transition-[background-color] duration-200 ease-linear cursor-pointer flex flex-col gap-2">
                        <div>
                            <fa :icon="icon" class="text-6xl text-color1 group-hover:text-color3"></fa>
                        </div>
                        <h1 class="text-2xl font-bold text-color2 group-hover:text-color3">{{ title }}</h1>
                        <p class="text-lg">
                            {{ description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <!-- Teams section -->
        <div class="bg-color3">
            <div class="min-h-[40vh] bg-color2 py-20">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-color1 text-xl font-bold uppercase">Lawyers</h1>
                    <p class="text-5xl font-bold text-color3 uppercase font-catanta">
                        Our expert lawyers
                    </p>
                </div>
            </div>
            <div class="w-full bg-color3 py-20">
                <div class="max-w-7xl w-full border border-transparent mx-auto relative bg-color-3 h-fit">
                    <!-- Team absolute -->
                    <div
                        class="mx-4 sm:mx-0 w-full p-6 absolute -top-48 bg-color3 min-h-fit h-fit rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div v-for="({ firstName, lastName, lawyerType, image }) of teamUsers"
                            :key="firstName + lastName" class="bg-neutral-100 h-fit">

                            <div class="w-full overflow-hidden rounded">
                                <img :src="image" alt="" class="w-full object-cover aspect-square">
                            </div>
                            <div class="p-4">
                                <h1 class="font-rubik-mono-one text-lg text-color1">{{ firstName }} {{ lastName }}</h1>
                                <p class="text-color2 font-medium">
                                    {{ lawyerType }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Secretary section -->
                    <div class="py-28 mt-64">
                        <div class="bg-white w-full py-4 rounded-md shadow-lg flex flex-col-reverse lg:flex-row">
                            <div class="p-10 flex flex-col gap-4 w-full lg:w-1/2">
                                <h2 class="text-3xl font-bold font-rubik text-color2">Are you looking for a lawyer?</h2>
                                <p class="text-lg">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod rem, iste, illum nihil
                                    reiciendis repellat voluptas modi, odit reprehenderit dignissimos dolores fuga illo?
                                    Odio qui facere omnis delectus magnam minima?
                                </p>
                                <div>
                                    <button
                                        class="bg-color1 text py-2 px-4 text-2xl flex items-center gap-4 rounded-full">
                                        <span class="text-white"> Contact us </span>
                                        <fa icon="fa fa-arrow-right" class="p-2 bg-white rounded-full text-color1"></fa>
                                    </button>
                                </div>
                            </div>
                            <div class="w-full lg:w-1/2 relative p-10 h-fit">
                                <div
                                    class="absolute h-48 w-48 bg-color1 left-1/2 bg-opacity-30 rounded-b-full rounded-tl-full z-[1]">
                                </div>
                                <div class="absolute h-10 w-10 bg-color2 top-1/2 left-1/3"></div>
                                <div class="absolute h-32 w-32 bg-color6 top-1/2 bg-opacity-20 rounded-full bottom-8">
                                </div>
                                <div class="absolute h-10 w-10 bg-color4 right-4 bg-opacity-25 rounded-full"></div>
                                <div
                                    class="h-full w-full flex justify-center items-center z-40 absolute top-0 bottom-0 mx-auto">
                                    <img src="/woman-folding hands.png" alt="" class="h-96 w-96">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <footer class="bg-white pt-10">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-4 lg:gap-4 place-items-start p-4">
                <div class="flex flex-col gap-2">
                    <h1 class="text-3xl font-bold text-color1">Validient</h1>
                    <p class="text-lg text-color2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod rem, iste, illum nihil
                        reiciendis repellat voluptas modi, odit reprehenderit dignissimos dolores fuga illo?
                        Odio qui facere omnis delectus magnam minima?
                    </p>
                    <div class="flex gap-2 py-2">
                        <fa class="p-2 bg-color1 text-color2 rounded-full bg-opacity-50" icon="fa-brands fa-facebook">
                        </fa>
                        <fa class="p-2 bg-color1 text-color2 rounded-full bg-opacity-50" icon="fa-brands fa-twitter">
                        </fa>
                        <fa class="p-2 bg-color1 text-color2 rounded-full bg-opacity-50" icon="fa-brands fa-instagram">
                        </fa>
                    </div>
                </div>
                <div class="flex flex-col gap-4">
                    <h1 class="text-2xl text-color1 underline">Practice area</h1>
                    <ul class="flex flex-col gap-2">
                        <li>
                            <router-link to="#">Business law</router-link>
                        </li>
                        <li>
                            <router-link to="#">Family law</router-link>
                        </li>
                        <li>
                            <router-link to="#">Criminal law</router-link>
                        </li>
                        <li>
                            <router-link to="#">Personal injury</router-link>
                        </li>
                        <li>
                            <router-link to="#">Real estate law</router-link>
                        </li>

                    </ul>
                </div>
                <div class="flex flex-col gap-4">
                    <h1 class="text-2xl text-color1 underline">
                        Company
                    </h1>
                    <ul class="flex flex-col gap-2">
                        <li>
                            <router-link to="#">About us</router-link>
                        </li>
                        <li>
                            <router-link to="#">Our team</router-link>
                        </li>
                        <li>
                            <router-link to="#">Our services</router-link>
                        </li>
                        <li>
                            <router-link to="#">Contact us</router-link>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col gap-4">
                    <h1 class="text-2xl text-color1 underline">
                        Contact us
                    </h1>
                    <ul class="flex flex-col gap-2">
                        <li>
                            <router-link to="#">Address
                                1234 Street Name, City Name, United States
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">Phone +1 234 567 890
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">Email</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="py-10">
                <p class="text-center">
                    &copy; {{ cuttentYear }} Validient. All rights reserved
                </p>
            </div>
        </footer>
    </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const heroStats = ref<Array<{
    title: string
    statValue: number
    statIcon: string
}>>([
    {
        title: 'Total cases won',
        statIcon: 'fa-solid fa-gavel',
        statValue: 300

    }, {
        title: 'Expert lawyers', statIcon: 'fa-solid fa-user',
        statValue: 300
    }, {
        title: 'Business partners', statIcon: 'fa-solid fa-handshake',
        statValue: 300
    }
])
const validientServices = ref<Array<{
    title: string
    icon: string
    description: string
}>>([
    {
        title: 'Business law',
        icon: 'fa fa-briefcase',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }, {
        title: 'Family law',
        icon: 'fa fa-users',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }, {
        title: 'Finance law ',
        icon: 'fa fa-dollar',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }, {
        title: 'Criminal law ',
        icon: 'fa fa-handcuffs',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }, {
        title: 'Real estate law ',
        icon: 'fa fa-house',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }, {
        title: 'Divorce law ',
        icon: 'fa fa-users',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
])
const teamUsers = ref<Array<{
    image: string
    firstName: string
    lastName: string
    lawyerType: string
}>>([
    {
        firstName: 'Demarcus ',
        lastName: 'Lespier',
        image: 'https://xsgames.co/randomusers/assets/avatars/male/37.jpg',
        lawyerType: 'Family Lawyer'
    }, {
        firstName: 'Jane ',
        lastName: 'Doe',
        image: 'https://xsgames.co/randomusers/assets/avatars/female/43.jpg',
        lawyerType: 'Financial lawyer'
    }, {
        firstName: 'Faith ',
        lastName: 'Gonzales',
        image: 'https://xsgames.co/randomusers/assets/avatars/female/60.jpg',
        lawyerType: 'Real estate lawyer'
    }, {
        firstName: 'John ',
        lastName: 'Doe',
        image: 'https://xsgames.co/randomusers/assets/avatars/male/48.jpg',
        lawyerType: 'Divorce lawyer'
    }
])
const cuttentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>

</style>
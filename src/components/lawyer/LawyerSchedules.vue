<script setup lang="ts"></script>
<template>
     <div class="flex items-center justify-center">
      
      <div class="flex flex-col pt-5 capitalize items-center
      ">
       <h1 style="border-bottom: 2px;" class="text-2xl text-center pb-2  ">Schedule your Appointents</h1>
       <v-calendar
       title-position="left"
       rows="1"
       columns="2"
       class="border-none"
       color="red"
       is-range
       :min-date="new Date()"
     />
      </div>
   </div>
</template>
<script setup lang="ts">
import {ref} from "vue"
// <reference path="" /

type ClientName={
  name:String
}
const users=ref<Array<ClientName>>([
  {
    name:'user0'
  },
  {
    name:'user1'
  },
  {
    name:'user2'
  },
  {
    name:'user3'
  }

])

</script>
<template>
<ul class="flex gap-3 justify-center items-center ">
<template v-for="user in users">
  <li class="flex shadow-sm w-full h-24 bg-slate-50">{{user.name}}</li>
</template>
</ul>
  
</template>
<style scoped></style>

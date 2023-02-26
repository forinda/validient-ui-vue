<script setup lang="ts">
import { ref, computed } from "vue";
interface Item {
  name: string;
}

// pagination
const items = ref<Item[]>([
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
  { name: 'Item 4' },
  { name: 'Item 5' },
  { name: 'Item 6' },
  { name: 'Item 7' },
  { name: 'Item 8' },
  { name: 'Item 9' },
  { name: 'Item 10' }
]);
console.log(items);

const currentPage = ref(1);
const pageSize = 3;

const pageCount = computed(() => {
  return Math.ceil(items.value.length / pageSize);
});
console.log(pageCount);

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.value.slice(startIndex, endIndex);
});





</script>
<template>
  <div class="bg-white">
    <h1>Lawyers</h1>
    <ul>
      <li v-for="item in paginatedItems" :key="item.name">{{ item.name }}</li>
    </ul>
    <div class="flex justify-center items-center gap-2 pb-4">
      <button class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300" v-if="currentPage > 1"
        @click="currentPage--">Previous</button>
      <button v-for="page in pageCount" :key="page" @click="currentPage = page"> >{{ page }}</button>
      <button class="rounded px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300" v-if="currentPage < pageCount"
        @click="currentPage++">Next</button>
    </div>
  </div>
  <table class="table-auto flex justify-center items-center flex-col bg-sky-100 border-spacing-3">
        <thead>
          <tr>
           
            <th class="px-12 py-3  text-slate-400">Email</th>
           
          </tr>
        </thead>
        <tbody>
          <tr v-for="detail in paginatedItems" :key="detail.name">
            <td class="border-b px-11 py-3">{{ detail.name }}</td>
            
           
                <fa icon="fa fa-ellipsis-vertical"></fa>
             
          </tr>
        </tbody>
      </table>
</template>
<style scoped></style> 


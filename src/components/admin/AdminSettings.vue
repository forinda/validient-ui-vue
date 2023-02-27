<template>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex">
      <a :class="['bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold', activeTab === 'tab1' ? 'tab-active' : '']"
        @click="activeTab = 'tab1'">Personal</a>
      <a :class="['bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold', activeTab === 'tab2' ? 'tab-active' : '']"
        @click="activeTab = 'tab2'">Clients</a>
      <a :class="['bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold', activeTab === 'tab3' ? 'tab-active' : '']"
        @click="activeTab = 'tab3'">Lawyers</a>
      <a :class="['bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold', activeTab === 'tab4' ? 'tab-active' : '']"
        @click="activeTab = 'tab4'">Lawyers</a>
    </nav>
    <div v-if="activeTab === 'tab1'">
      <!-- personal -->
    </div>
    <div class="flex gap-3" v-if="activeTab === 'tab2'">
      <div class="flex  ml-4 flex-col justify-center items-center">
        <h1 class="text-center font-semibold text-2xl">Clients</h1>
        <p class="text-center">Add new clients so that they can be help with therir cases</p>
        <div>
          <button class="bg-slate-400">Download CSV</button>
          <button class="bg-sky-300">Add a client</button>
        </div>
      </div>
      <div>
      <AdminClients/>
      </div>
    </div>
    <div v-if="activeTab === 'tab3'">INtegrations</div>
    <div v-if="activeTab === 'tab4'">Lawyers</div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import AdminClients from './AdminClients.vue';

export default {
    setup() {
        const activeTab = ref("tab1");
        return {
            activeTab,
        };
    },
    components: { AdminClients }
};
</script>

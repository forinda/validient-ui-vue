<template>
  <main class="min-h-screen w-full flex items-center justify-center">
    <div class="flex flex-col gap-4">
      <h1 class="text-4xl font-bold text-center">Admin</h1>
      <p class="text-center">Welcome to the admin dashboard</p>
      <p>
        Get started by editing
        <code class="bg-black text-white p-2 rounded-full"
          >Admin dashboard</code
        >
      </p>
      <div class="flex gap-4 justify-center">
        <router-link :to="{ name: 'home' }" class="text-blue-500 border-blue-500"
          >Homepage</router-link
        >
        <router-link :to="{ name: 'admin' }" class="text-blue-500"
          >Dashboard</router-link
        >
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

</script>
<template lang="">
    <div>
        <form action="" @click.pre="formClick" @submit.prevent="handleFormSubmit($event, currentAction)"
        class="w-full lg:max-w-lg min-[20rem] bg-white rounded-lg p-4 lg:p-10 ">
        <div>
          <h1 class="text-center uppercase my-1 font-bold">Create new user</h1>
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="text-xl font-bold">First name</label>
          <input required type="text" placeholder="First name..." class="rounded " v-model="formData.firstName">
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="text-xl font-bold">Last name</label>
          <input required type="text" placeholder="last name...." class="rounded " v-model="formData.lastName">
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="text-xl font-bold">Username</label>
          <input required type="text" placeholder="Username...." class="rounded " v-model="formData.username">
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="text-xl font-bold">Email</label>
          <input required type="text" placeholder="Email address" class="rounded " v-model="formData.email">
        </div>

        <div class="flex flex-col gap-2 ">
          <label for="" class="text-xl font-bold">Selected roles</label>
          <!-- selected members -->
          <div v-if="roleRef" class="flex gap-1 flex-wrap border p-2 rounded">
            <button v-for="role in selectedRoles" @click.prevent="removeRole(role.id)"
              class="w-fit text-[12px] rounded-full bg-color2 text-color3 py-1 px-2">{{ role.name
              }} x</button>
          </div>
          <!-- end of selected members -->
          <select name="" id="" :multiple="false" @change="handleRoleSelect">
            <option value="" selected>Select user roles</option>
            <option v-for="role of possibleRoles" :value="role.id" class="py-2">
              <div class="flex items-center gap-2">
                <span>{{ role.name }}</span>
              </div>
            </option>
          </select>
          <!--  -->
        </div>
        <!-- Gender -->
        <label for="gender" class="flex flex-col gap-2 text-gray-700 text-xs font-bold mb-2">
          <span class="block"> Gender </span>
          <div class="flex gap-2">
            <label v-for="{ id, value, checked } of genderInfo" class="flex items-center gap-2" :for="id">
              <input v-model="formData.gender" :value="value" type="radio" name="gender" :id="id" :checked="checked" />
              <span>{{ value }}</span>
            </label>
          </div>
        </label>
        <div class="flex flex-col gap-2">
          <label for="" class="text-xl font-bold">Password</label>
          <input required type="text" readonly placeholder="Email address" class="rounded " v-model="formData.password">
        </div>
        <div class="py-4 flex gap-4">
          <button type="reset" class="px-4 py-2 bg-gray-300 text-black rounded">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-color1 text-black rounded">
            Create
          </button>
        </div>
      </form>
    </div>
</template>

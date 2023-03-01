<template>
   <v-calendar
        title-position="left"
        rows="3"
        columns="4"
        class="border-none"
        color="red"
        is-range
        :min-date="new Date()"
      />
</template>
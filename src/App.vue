<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div>
    TEST123456
    {{ app.getConfig('baseUrl') }}
    {{lpk('Index')}}
    {{lpk('Type', {index:1})}}
  </div>
</template>

<style scoped>
</style>

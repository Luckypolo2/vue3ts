<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div>
    TEST123
    {{ app.getConfig('baseUrl') }}
    {{lpk('Index')}}
    {{lpk('Type', {index:1})}}
    <Icon icon="icon-time"></Icon>
    <van-button type="success">主要按钮</van-button>
  </div>
</template>

<style scoped>
</style>

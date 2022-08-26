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
    <div class="theme">
      <div class="theme-item" v-for="index in 3">{{index}}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme{
  display: flex;
  justify-content: space-between;
  .theme-item{
    margin: 10px 20px;
    width: 30%;
    padding: 30px 0;
    text-align: center;
    background-color: var(--primary-bg);
    color: var(--primary-color);
    font-size: var(--primary-size);
  }
}
</style>

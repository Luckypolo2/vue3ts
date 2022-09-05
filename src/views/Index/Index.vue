<script lang="ts" setup>
// NAME: Index
</script>

<template>
<div class="index-v">
  <div class="title">Index.vue</div>
  <keep-alive-router-view/>
  <ul class="g-flex-rsbc">
    <li>
      <router-link :to="{name:'home'}">{{lpk('page.index.Title')}}</router-link>
    </li>
    <li>
      <router-link :to="{name:'my'}">{{lpk('page.my.Title')}}</router-link>
    </li>
    <li>
      <router-link :to="{name: 'BlogIndex'}">{{lpk('Blog')}}</router-link>
    </li>
  </ul>
</div>
</template>

<style lang="scss" scoped>
.index-v{
  background: #ffff00;
  .title{
    margin: 30px;
  }
}
</style>

<script lang="ts" setup>
// NAME: Index
import mdlUserApi from '@/api/UserApi'
import {onMounted} from "vue";
onMounted(async () => {
  const iUser = await mdlUserApi.get({id: 1})
  console.log('获取用户详情：', iUser)
  const iUserList = await mdlUserApi.list({nPageSize:2})
  console.log('获取用户列表：', iUserList)
})
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

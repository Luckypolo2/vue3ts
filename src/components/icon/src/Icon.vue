<script lang="ts" setup>
import {defineProps, toRefs} from "vue";

interface IIconProps {
  icon: string;
}
const props = defineProps<IIconProps>()
const { icon } = toRefs(props) // 转成响应式数据

</script>
<template>
  <i :class="`iconfont ${icon}`"></i>
</template>

<style lang="sass" scoped>

</style>

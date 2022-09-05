<script lang="ts" setup>
import {reactive, toRefs, watch} from "vue"
import {useRoute} from "vue-router"
import {get} from "lodash";

interface IKeepAliveRouterViewState {
  giExcludeNames: string[];
}
const iState = reactive<IKeepAliveRouterViewState>({
  giExcludeNames: [],
})

const { giExcludeNames } = toRefs(iState)
// useRoute() is a function that returns the current route object
watch( useRoute(),(newValue,oldValue)=>{
  if(false === get(newValue,'meta.keepAlive',true)){
    // const stCmpName = get(newValue,'meta.cmpName','')
    const stCmpName = get(newValue.matched[newValue.matched.length-1],'components.default["__name"]','')
    console.log('stCmpName',stCmpName)
    console.log(newValue)
    if (stCmpName && iState.giExcludeNames.indexOf(stCmpName) === -1) {
      iState.giExcludeNames.push(stCmpName)
    }
  }
}, { deep: true })
</script>

<template>
  <router-view v-slot="{Component}">
    <keep-alive :exclude="giExcludeNames">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style lang="scss" scoped>

</style>

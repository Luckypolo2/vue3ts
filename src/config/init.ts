import { App } from "vue";
import app from "@/config/app";
import Tools from "@/utils/tools";
import {lpk, initLpk } from "@/config/lpk";
import {initLoginUserInfo} from "@/controller/AppCtl";
import {initTheme} from "@/config/theme";

type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
type IGlobalVars = {
    [key in IGlobalVarsKey]?: any
}
const isGlobalVars: IGlobalVars = {
    app,
    Tools,
    lpk
}
Object.keys(isGlobalVars).forEach(key => {
    (window as any)[key as IGlobalVarsKey] = isGlobalVars[key as IGlobalVarsKey]
})
export const initApp = async () => {
    // 初始化基础业务信息 如当前登录用户信息
    await initLoginUserInfo()
    initTheme()
    // 主题定制
    initLpk()
    // 初始化各业务模块
    const iAllEntry:GlobalType.IRecord = import.meta.glob('@/bmod/*/entry.ts',{eager: true})
    for (const path in iAllEntry) {
        const iEntryFile = iAllEntry[path]
        iEntryFile && iEntryFile.entryInit && await iEntryFile.entryInit()
    }
}
// 动态注册全局组件
export const initGlobalComponents = (uiApp:App<Element>) => {
    const iAllGlobalComponents:GlobalType.IRecord = import.meta.glob('@/components/*/src/*.vue',{eager: true})
    Object.keys(iAllGlobalComponents).map((path:string) => {
        const paths = path.split('/')
        const stCmpName = paths[paths.length - 3]
        uiApp.component(stCmpName, iAllGlobalComponents[path].default)
    })
}

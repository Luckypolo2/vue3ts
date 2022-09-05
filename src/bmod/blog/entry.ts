import syscfg from "./config/syscfg";
import { initRoutes } from './router';


const stModuleName = syscfg.module
export const  entryInit = async () => {
    // 如果当前未开启模块，终止处理
    if (!app.checkBModIsEnable(stModuleName)) {
        return
    }
    // 初始化当前模块语言包
    app.getAppCtl().mergeLpk(import.meta.glob('./locales/*', {eager: true}))
    console.log(lpk('Blog'))
    // 初始化当前模块配置信息
    // 初始化当前模块状态管理
    // 初始化当前模块路由信息
    initRoutes()
}
export default {}

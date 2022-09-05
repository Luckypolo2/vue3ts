import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import './assets/styles/global.scss'
import './assets/foots/iconfont.css'
import { initApp, initGlobalComponents } from "@/config/init";
import '@/assets/styles/base-theme.scss'
import '@/assets/styles/black-theme.scss'
import '@/assets/styles/blue-theme.scss'
import {initRoute} from "@/router";

(async () => {
    //初始化系统基础配置信息
    // 加载系统当前状态信息
    // 加载当前登录用户个人信息
    await initApp()
    // 初始化UI组件
    const uiApp = createApp(App)
    //注册全局组件
    initGlobalComponents(uiApp)
    //向根组件绑定全局对象
    uiApp.config.globalProperties.app = app
    uiApp.config.globalProperties.Tools = Tools
    uiApp.config.globalProperties.lpk = lpk
    //初始化路由管理并渲染根组件
    // 配置路由及路由守卫
    uiApp.use(initRoute()).mount('#app')
})()

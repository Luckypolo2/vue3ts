import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import './assets/styles/global.scss'
import './assets/foots/iconfont.css'
import { initApp } from "@/config/init";

(async () => {
    //TODO: 初始化系统基础配置信息
    await initApp()
    //TODO: 初始化UI组件
    const uiApp = createApp(App)
    //TODO: 注册全局组件
    //TODO: 向根组件绑定全局对象
    uiApp.config.globalProperties.app = app
    //TODO: 初始化路由管理并渲染根组件
    uiApp.mount('#app')
})()

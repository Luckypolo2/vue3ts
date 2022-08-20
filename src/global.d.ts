import { IApp } from "@/config/app";
import { ITools } from "@/utils/tools";

declare global {
    namespace GlobalType{
        type IKey = string | number
        type IRecord = Record<IKey, any>
    }
    const app: IApp
    const Tools: ITools
    interface Window {
        app: IApp,
        Tools: ITools // 全局公用方法
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        app: IApp,
        Tools: ITools // 全局公用方法
    }
}
export {}

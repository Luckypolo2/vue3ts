import { IApp } from "@/config/app";
import { ITools } from "@/utils/tools";
import { IFnLpk} from "@/config/lpk";

declare global {
    namespace GlobalType{
        type IKey = string | number
        type IRecord = Record<IKey, any>
    }
    const app: IApp
    const Tools: ITools
    const lpk: IFnLpk
    type ITimeout = ReturnType<typeof setTimeout>
    interface Window {
        app: IApp,
        Tools: ITools, // 全局公用方法
        lpk: IFnLpk, // 全局语言包方法
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        app: IApp,
        Tools: ITools, // 全局公用方法
        lpk: IFnLpk, // 全局语言包方法
    }
}
export {}

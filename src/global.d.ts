import { IApp } from "@/config/app";

declare global {
    namespace GlobalType{
        type IKey = string | number
        type IRecord = Record<IKey, any>
    }
    const app: IApp
    interface Window {
        app: IApp
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        app: IApp
    }
}
export {}

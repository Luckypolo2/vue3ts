import { IApp } from "@/config/app";
import { ITools } from "@/utils/tools";
import { IFnLpk} from "@/config/lpk";
import {IAjax, IResponse} from "@/utils/Request";

declare global {
    type IRecord = Record<string | number, any>
    declare namespace GlobalType{
        type IKey = string | number
        type IRecord = Record<IKey, any>
    }
    declare namespace BaseAPIType{
        interface IMethods<T>{
            get(params: GlobalType.IRecord): Promise<T>;
            list(params: GlobalType.IRecord): Promise<IListResult<T>>;
            post(params: GlobalType.IRecord): Promise<IResponse>;
            put(params: GlobalType.IRecord): Promise<IResponse>;
            patch(params: GlobalType.IRecord): Promise<IResponse>;
            delete(params: GlobalType.IRecord): Promise<IResponse>;
        }
        interface IListResult<T> {
            total: number,
            items: T[]
        }
        interface IURIItem {
            path:string,
            errMsg:string,
            fnUrlTransfer?:(url:string,params:IRecord)=>string,
            fnParamsTransfer?:(url:string,params:IRecord)=>IRecord,
        }
        interface IURI{
            [key:string]:IURIItem
        }
        interface IInitParams<T = any>{
            mapper?: (item: any) => T
            uri: IURI
        }
    }

    const app: IApp
    const Tools: ITools
    const lpk: IFnLpk
    type ITimeout = ReturnType<typeof setTimeout>
    interface Window {
        app: IApp,
        Tools: ITools, // 全局公用方法
        lpk: IFnLpk, // 全局语言包方法
        Ajax: IAjax
    }
}
// 为了让<template>中的lpk在typescript环境不会报错, 还需要增加下面声明
// 注意: 该声明必须放置到module中, 否则就会覆盖全局类型, 而不是增强全局类型
declare module 'vue' {
    interface ComponentCustomProperties {
        app: IApp,
        Tools: ITools, // 全局公用方法
        lpk: IFnLpk, // 全局语言包方法
    }
}
export {}

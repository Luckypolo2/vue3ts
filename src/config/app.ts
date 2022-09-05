import sysCfg, {ISysCfg, ISysCfgBModItem} from "@/config/syscfg"
import appCtl from "@/controller/AppCtl"
import type {RouteRecordRaw} from "vue-router";
// 存储路由信息
let giAllBModRoutes:RouteRecordRaw[] = []
interface IBModRoutes {
    registerBMModRoute(mixRoute:RouteRecordRaw[] | RouteRecordRaw):void
    getAllBModRoutes():RouteRecordRaw[]
}
const routeBModRoute:IBModRoutes = {
    // 注册业务模块
    registerBMModRoute(mixRoute: RouteRecordRaw[] | RouteRecordRaw) {
        if (!mixRoute) {
            return
        }
        if (Array.isArray(mixRoute)) {
            giAllBModRoutes = giAllBModRoutes.concat(mixRoute) // 为数组则合并
            return
        }
        giAllBModRoutes.push(mixRoute) // 不为数组则为单个则添加
    },
    getAllBModRoutes(): RouteRecordRaw[] {
        return giAllBModRoutes
    }
}
const app = {
    ...routeBModRoute, // 解构路由 绑定在全局对象上
    // 接受换类型
    getConfig<T>(key: keyof ISysCfg): T{
        return sysCfg[key] as unknown as T
    },
    // 判断是否启用指定模块
    checkBModIsEnable(stModuleName:string) {
        const bModName: ISysCfgBModItem[] = app.getConfig<ISysCfgBModItem[]>("bModeName")
        return !!bModName.find(item => item.name === stModuleName && item.enable);
    },
    getAppCtl() {
        return appCtl
    }
}
// const result:boolean = app.checkBModIsEnable("blog")
export type IApp = typeof app
export default app

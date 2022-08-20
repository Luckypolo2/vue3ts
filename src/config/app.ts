import sysCfg, {ISysCfg, ISysCfgBModItem} from "@/config/syscfg"
const app = {
    // 接受换类型
    getConfig<T>(key: keyof ISysCfg): T{
        return sysCfg[key] as unknown as T
    },
    // 判断是否启用指定模块
    checkBModIsEnable(stModuleName:string) {
        const bModName: ISysCfgBModItem[] = app.getConfig<ISysCfgBModItem[]>("bModeName")
        return !!bModName.find(item => item.name === stModuleName && item.enable);

    }
}
// const result:boolean = app.checkBModIsEnable("blog")
export type IApp = typeof app
export default app

import app from "@/config/app";
import Tools from "@/utils/tools";
import {lpk, initLpk } from "@/config/lpk";
import {initLoginUserInfo} from "@/controller/AppCtl";

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
    initLpk()
}

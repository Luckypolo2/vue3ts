import {get} from 'lodash';
import {LOCALE_OPTIONS} from "@/utils/Constans";
import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

const stLocaleStorageName = 'locale' // 存储语言环境字段名称
const tblLpk:Record<string, string | string[]> = {} // 缓存语言包内容索引表
export const initLpk = () => {
    // 加载本地语言包内容
    // vite 自带方法
    mergeLpk(import.meta.glob('@/locales/*',{eager:true}))
    initThirdUIpk()
}
// 初始化第三方语言包
const initThirdUIpk = () => {
    const tblThirdLpk:GlobalType.IRecord = {
        'en-US': enUS
    }
    const stLocale = getLocale()
    tblThirdLpk[stLocale] && (Locale.use(stLocale, tblThirdLpk[stLocale]))

}
// 返回当前语言包
export const getLocale: ()=> string = () => {
    const stDefaultLocale = 'zh-CN'
    let stLanguage = stDefaultLocale
    // 优先从用户自定义提取
    stLanguage = get(app.getAppCtl().getLoginUser(), 'cust.locale')
    // 从本地存储读取
    stLanguage = stLanguage || Tools.LocalStorage.getItem(stLocaleStorageName)
    // 继续默认语言包
    stLanguage = stLanguage || stDefaultLocale
    return stLanguage
}
// 合并
type ILpkFile = {
    [path:string]: {
        default: Record<string, string | string[]>
    }
}
export const mergeLpk = (importLpkFiles:ILpkFile) => {
    const stLocaleLanguage = getLocale()
    for (const path in importLpkFiles) {
        if (-1 == path.indexOf(stLocaleLanguage)) {
            continue // 退出循环 强制进行新语言包的加载
        }
        const { default:iLpkFileItem } = importLpkFiles[path]
        for (const stLpkKey in iLpkFileItem) {
            tblLpk[stLpkKey] = iLpkFileItem[stLpkKey]
        }
    }
}
export type IFnLpk = (key:string, option?:{index?:number, default?:string}) => string
export const lpk:IFnLpk = (key, option = {}) => {
    const mixValue = tblLpk[key]
    if(Array.isArray(mixValue)) {
        return mixValue[option.index || 0] || option.default || key
    }
    return mixValue || option.default || key
}
export const changeLocale = (stLocale:string) => {
    if (!LOCALE_OPTIONS.find(stLocaleItem => stLocaleItem === stLocale)){
        return
    }
    // 用户登录，调用api更新语言环境
    // 本地缓存最新语言包
    Tools.LocalStorage.setItem(stLocaleStorageName, stLocale)
    // 更新页面语言包,重新加载页面
    document.location.reload()
}

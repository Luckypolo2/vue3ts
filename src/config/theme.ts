import {THEME_OPTIONS} from "@/utils/Constans";
import {get} from "lodash";
// 系统主题定义
const stThemeStorageName:string = 'theme' // 主题存储名称
const stDefaultTheme:string = THEME_OPTIONS[0] // 默认主题
let stCurUseTheme:string = '' // 当前使用主题
// 初始化系统主题
export const initTheme = () => {
    changeTheme(getTheme())
}
// 切换主题
export const changeTheme = (stArgTheme:string,bIsNeedSave:boolean=true) => {
    if (!THEME_OPTIONS.find(stThemeItem => stThemeItem == stArgTheme)) {
        return
    }
    document.documentElement.setAttribute('data-theme', stArgTheme)
    if (!bIsNeedSave || stArgTheme == stCurUseTheme) {
        return // 不保存则结束函数
    }
    stCurUseTheme = stArgTheme
    // 用户登录，api更新主题自定义
    // 本地保存主题
    Tools.LocalStorage.setItem(stThemeStorageName, stCurUseTheme)
}
// 获取当前使用主题
export const getTheme = () => {
    if (stCurUseTheme) {
        return stCurUseTheme
    }
    const iLoginUser = app.getAppCtl().getLoginUser()
    // 优先从登陆者自定义信息获取
    stCurUseTheme = get(iLoginUser, 'cust.theme')
    // 从本地存储获取
    stCurUseTheme = stCurUseTheme || Tools.LocalStorage.getItem(stThemeStorageName)
    // 使用默认主图
    stCurUseTheme = stCurUseTheme || stDefaultTheme
    return stCurUseTheme
}

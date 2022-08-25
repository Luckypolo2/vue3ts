import mdUserApi ,{IUser} from "@/api/UserApi";
import {mergeLpk,changeLocale} from "@/config/lpk";
import {LOGIN_TOKEN} from "@/utils/Constans";

let iLoginUser:IUser = {} as IUser

export const initLoginUserInfo = async () => {
    if (Tools.Cookie.getItem(LOGIN_TOKEN)) {
        iLoginUser = await mdUserApi.getSelfInfo()
        console.log('iLoginUser', iLoginUser)
    }
}
export default {
    getLoginUser():IUser {
        return iLoginUser
    },
    changeLocale,
    mergeLpk
}

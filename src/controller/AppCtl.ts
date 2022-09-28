import mdUserApi ,{IUser} from "@/api/UserApi";
import {mergeLpk,changeLocale} from "@/config/lpk";
import {LOGIN_PATH, LOGIN_TOKEN} from "@/utils/Constans";
import {changeTheme} from "@/config/theme";

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
    redirectToLogin() {
        document.location.href = LOGIN_PATH
    },
    changeLocale,
    mergeLpk,
    changeTheme
}

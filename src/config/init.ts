import app from "@/config/app";
import Tools from "@/utils/tools";

type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
type IGlobalVars = {
    [key in IGlobalVarsKey]?: any
}
const isGlobalVars: IGlobalVars = {
    app,
    Tools
}
Object.keys(isGlobalVars).forEach(key => {
    (window as any)[key as IGlobalVarsKey] = isGlobalVars[key as IGlobalVarsKey]
})
export const initApp = async () => {

}

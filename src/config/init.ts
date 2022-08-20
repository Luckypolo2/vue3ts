import app from "@/config/app";

type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
type IGlobalVars = {
    [key in IGlobalVarsKey]?: any
}
const isGlobalVars: IGlobalVars = {
    app
}
Object.keys(isGlobalVars).forEach(key => {
    (window as any)[key as IGlobalVarsKey] = isGlobalVars[key as IGlobalVarsKey]
})
export const initApp = async () => {

}

import cookies from 'js-cookie'
import {Dialog} from "vant";
import alert = Dialog.alert;
const fCachePreventRandom = Math.random() // 防止api缓存随机数
let nCachePreventNum = 0
const iTools = {
    showLoadMask() {},
    hideLoadMask() {},
    // 防止api请求命中缓存
    addCachePrevent(url:string=''):string {
        const nQueryStringFlagIndex = url.indexOf('?')
        url += (nQueryStringFlagIndex === -1 ? '?' : '&') + 'cp=' + (nCachePreventNum++) + fCachePreventRandom
        return url
    },
    // 显示错误提示
    showError(title:string = '', msg: string = '') {
        // @ts-ignore
        alert(`${title}:${msg}`).then()
    },
    // 处理api调用错误
    processApiError(title:string, res:(string | {msg: string}) = {msg: ''}, options: {bIsShowInfo:boolean} = {bIsShowInfo: true}) {
        if ('string' === typeof res) {
            res = {msg: res}
        }
        title = lpk(title)
        const stContent = lpk(res.msg) || ''
        if (options.bIsShowInfo) {
            this.showError(title, stContent)
        }
        window.console && window.console.log && window.console.log(res)
        throw (`${title}: ${stContent}`)
    },
    Router: {},
    Store: {},
    LocalStorage: {
        // 写入本地存储
        setItem(key: string, value: any) {
            localStorage.setItem(key, JSON.stringify(value))
        },
        // 使用本地存储
        getItem(key: string) {
          const stValue = localStorage.getItem(key)
            try {
                return JSON.parse(stValue as string)
            }catch (e) {
              return stValue
            }
        },
        // 删除存储
        removeItem(key: string) {
          localStorage.removeItem(key)
        }
    },
    Cookie: {
        setItem(key: string, value: any) {
            cookies.set(key, value, {expires:30}) // expires:30天  失效时间
        },
        getItem(key: string, defaultValue?:any) {
            const stValue =  cookies.get(key) || defaultValue
            try {
                return JSON.parse(stValue)
            } catch (e) {
                return stValue
            }
        },
        removeItem(key: string) {
            cookies.remove(key)
        }
    },
    Time: {},
    Dom: {}
}
export type ITools = typeof iTools
export default iTools

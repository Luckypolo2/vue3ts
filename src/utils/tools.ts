import cookies from 'js-cookie'
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

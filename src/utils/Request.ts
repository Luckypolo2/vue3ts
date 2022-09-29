import axios, {AxiosResponse} from "axios"
import qs from "qs"
import type {AxiosRequestConfig,AxiosInstance} from 'axios'
import {API_PATH, LOGIN_TOKEN} from "@/utils/Constans";
import {get} from "lodash";
import app from "@/config/app"
// 定义类型
export interface AxiosRequestConfigExt extends AxiosRequestConfig {
    reqParams?: AxiosRequestConfigExt
    showLoading?: boolean // 是否显示loading
    bIsNeedCachePrevent?: boolean // 是否需要防止缓存的随机数
    bIsNeedJsonStringify?: boolean // 是否需要将data转换为json字符串
    bIsNeedQSStringify?: boolean // 是否需要将params转换为qs字符串
    force401ToLogin?: boolean // 是否需要将401强制跳转到登录页
}
export interface IResponse<T=any>{
    code: number
    data: T
    msg: string
}

// 设置axios默认配置选项
axios.defaults.headers.head['Content-Type'] = 'application/json;charset=utf-8'
// 定义全局变量
let timerLoading: ITimeout
const axiosInstance:AxiosInstance = axios.create({
    baseURL: API_PATH,
    timeout: 10000
})


// 响应拦截器
axiosInstance.interceptors.response.use((res:AxiosResponse<IResponse>)=> {
    // 请求未出异常
    // 清楚loading计数器 并且隐藏loading
    clearTimeout(timerLoading)
    Tools.hideLoadMask()
    // 获取响应内容,以及外界传入的请求参数
    const { status, data, config } = res
    const { reqParams = {} } = config as AxiosRequestConfigExt
    const { force401ToLogin = false } = reqParams
    if (200 === status) {
        if (data) {
            if (401 == data.code && force401ToLogin) {
                // 401强制跳转到登录页
                app.getAppCtl().redirectToLogin()
                return
            } else if (data.code >= 400 && data.code <= 404 || 500 == data.code){
                return Promise.reject(data)
            }
        }
        return data
    } else {
        return Promise.reject(data)
    }

}, (error)=> {
    // 请求出现异常
    clearTimeout(timerLoading)
    Tools.hideLoadMask()
    let { message = 'Request Error', response } = error
    const stErrMsg = get(response, 'data.msg', message)
    return Promise.reject(stErrMsg)
})

// 定义常用请求方法
type IAjaxMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'
type IFnAjaxMethodHandler = <T = any>(reqParams: AxiosRequestConfigExt) => Promise<IResponse<T>>
const gstMethods:string[] = ['GET','POST','PATCH','PUT','DELETE']
// 绑定多种请求
const iAllMethods:{[key in IAjaxMethod]:IFnAjaxMethodHandler} = {} as any
gstMethods.map(method => {
    const fnHandler:IFnAjaxMethodHandler =<T = any>(reqParams: AxiosRequestConfigExt | string):Promise<IResponse> => {
        if ('GET' === method) {
            if ('string' === typeof reqParams){
                reqParams = { url: reqParams, params: {} }
            }
        }
        return Ajax.request<T>(method, reqParams as AxiosRequestConfigExt)
    }
    iAllMethods[method.toLocaleLowerCase() as IAjaxMethod] = fnHandler
})

const Ajax = {
    ...iAllMethods,
    request<T = any>(method:string, reqParams:AxiosRequestConfigExt):Promise<IResponse<T>> {
        // 获取请求参数
        let {
            url,
            params,
            headers = {},
            timeout,
            showLoading = true,
            bIsNeedCachePrevent,
            bIsNeedJsonStringify,
            bIsNeedQSStringify,
            force401ToLogin,
        } = reqParams
        // 是否需要显示loading
        if(showLoading) {
            clearTimeout(timerLoading)
            timerLoading = setTimeout(() => {
                Tools.showLoadMask()
            },200)
        }
        // 是否需要防缓存
        (false !== bIsNeedCachePrevent) && (url = Tools.addCachePrevent(url))
        // 是否需要json处理
        bIsNeedJsonStringify && (params = JSON.stringify(params))
        // 是否需要qs处理
        bIsNeedQSStringify && (params = qs.stringify(params))
        // 设置登录token
        const stLoginToken = Tools.Cookie.getItem(LOGIN_TOKEN)
        stLoginToken && (headers.Authorization = `Bearer ${stLoginToken}`)

        const iSendReqParams:AxiosRequestConfigExt = {
            reqParams,
            url,
            method:(gstMethods.indexOf(method) > -1 ? method : 'GET'),
            [method === 'GET' ? 'params' : 'data']:params,
            headers: Object.assign({},headers),
        }
        // timeout如果存在则覆盖默认值
        timeout && (iSendReqParams.timeout = timeout)

        return axiosInstance.request(iSendReqParams)
    }
}

export type IAjax = typeof Ajax
export default Ajax

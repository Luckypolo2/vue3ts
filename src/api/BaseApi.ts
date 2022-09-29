import Ajax, {IResponse} from "@/utils/Request";
import {get} from "lodash";

type IFnUrlAndParamsTransfer = (type:string, uriItem:BaseAPIType.IURIItem, params:GlobalType.IRecord) => {url:string, params:GlobalType.IRecord}
const transferUrlAndParams:IFnUrlAndParamsTransfer = (type, uriItem, params={}) => {
    let url = uriItem.path

    if('get' === type || 'delete' === type){
        const stIdName = 'id'
        url = url.replace(`:${stIdName}`, get(params, stIdName))
    }
    uriItem.fnUrlTransfer && (url = uriItem.fnUrlTransfer(url, params))
    uriItem.fnParamsTransfer && (params = uriItem.fnParamsTransfer(url, params))

    return {
        url,
        params
    }
}

export default {
    initApi: function <T = any, R = BaseAPIType.IMethods<T>>(initParams: BaseAPIType.IInitParams<T>):R {
        return {
            get(params: GlobalType.IRecord): Promise<T> {
                return Ajax.get<T>({
                    ...transferUrlAndParams('get', get(initParams, 'uri.get'), params),
                    // url: get(initParams, 'uri.get.path').replace(`:${stIdName}`, get(params, stIdName)),
                    // params,
                }).then(res => {
                    console.log(res)
                    return initParams.mapper ? initParams.mapper(res.data) : res.data as T
                }).catch(err => {
                    Tools.processApiError(get(initParams, 'uri.get.errMsg', ''), err)
                    return {} as T
                })
            },
            list(params: GlobalType.IRecord): Promise<BaseAPIType.IListResult<T>> {
                const iResult: BaseAPIType.IListResult<T> = {
                    total: 0,
                    items: []
                }
                return Ajax.get<T>({
                    ...transferUrlAndParams('list', get(initParams, 'uri.list'), params),
                }).then(res => {
                    const {total, items = []} = res.data as unknown as BaseAPIType.IListResult<T>
                    iResult.total = total
                    iResult.items = items.map(item => initParams.mapper ? initParams.mapper(item) : item as T)
                    return iResult
                }).catch(err => {
                    Tools.processApiError(get(initParams, 'uri.list.errMsg', ''), err)
                    return iResult
                })
            },
            post(params: GlobalType.IRecord): Promise<IResponse> {
                return Ajax.post({
                    ...transferUrlAndParams('post', get(initParams, 'uri.post'), params),
                }).catch(err => {
                    Tools.processApiError(get(initParams, 'uri.post.errMsg', ''), err)
                    return {} as IResponse
                })
            },
            put(params: GlobalType.IRecord): Promise<IResponse> {
                return Ajax.put({
                    ...transferUrlAndParams('put', get(initParams, 'uri.put'), params),
                }).catch(err => {
                    Tools.processApiError(get(initParams, 'uri.put.errMsg', ''), err)
                    return {} as IResponse
                })
            },
            delete(params: GlobalType.IRecord): Promise<IResponse> {
                return Ajax.delete<T>({
                    ...transferUrlAndParams('delete', get(initParams, 'uri.delete'), params),
                }).catch(err => {
                    Tools.processApiError(get(initParams, 'uri.delete.errMsg', ''), err)
                    return {} as IResponse
                })
            },
        } as unknown as  R
    }
}

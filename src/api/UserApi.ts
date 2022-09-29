import mdlBaseApi from './BaseApi';
import {get} from "lodash";
export interface IUser {
    id: number,
    name: string,
}


const initBaseAPIParams:BaseAPIType.IInitParams = {
    uri: {
        get: {path: '/data_get.json', errMsg: 'err.user.load',
            fnUrlTransfer(url:string, params:IRecord) {
                return 'data_get_detail.json'
            },
            fnParamsTransfer(url:string, params:IRecord) {
                return {}
            },},
        list: {path: '/data.json', errMsg: 'err.user.load'},
    },
    mapper(item:GlobalType.IRecord):IUser {
        return {
            id: get(item, 'id'),
            name: get(item, 'name'),
        }
    }
}
export default {
    ...mdlBaseApi.initApi<IUser, Pick<BaseAPIType.IMethods<IUser>, 'get' | 'list'>>(initBaseAPIParams),
    getSelfInfo():Promise<IUser> {
        return Promise.resolve({
            id: 1,
            name: '张三'
        })
    }
}

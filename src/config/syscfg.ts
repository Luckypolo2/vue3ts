export interface ISysCfgBModItem {
    name: string; //启用的模块名称
    enable: boolean; //是否启用
}
export interface ISysCfg {
    baseUrl: string; //主机地址 监听端口
    bModeName:ISysCfgBModItem[];
}
const iSysCfg: ISysCfg = {
    baseUrl: "http://127.0.0.1:9999",
    bModeName: [
        { name: "blog", enable: true },
    ]
}
export default iSysCfg

import type {Router, RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHistory} from "vue-router";
import Index from '@/views/Index/Index.vue'
import {get} from "lodash";
import {ROUTER_VIEW_KEY} from "@/utils/Constans";

type RouteRecordRawExt = RouteRecordRaw & {children?: RouteRecordRawExt[]}
let giAllRoutes:RouteRecordRawExt[] = []
export const initRoute:() => Router = () => {
    let routes:RouteRecordRawExt[] = [
        { path:'/', redirect: '/index' },
        {
            path: '/index',
            name: 'index',
            component: Index,
            meta: {
                title: lpk('page.index.Title'),
                requireAuth: false,
                hostRouteViewKey: ROUTER_VIEW_KEY.Index,
            },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/views/Index/Home.vue'),
                    meta: {
                        requireAuth: false,
                    }
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('@/views/Index/My.vue'),
                    meta: {
                        title: lpk('page.my.Title'),
                    }
                }
            ]
        },
        {path: '/login', name: 'login', component: () => import('@/views/Login/Login.vue'), meta: {requireAuth: false, title: lpk('page.login.Title')}},
        {path: '/register', name: 'register', component: () => import('@/views/Login/Register.vue'), meta: {requireAuth: false, title: lpk('page.register.Title')}},
    ]
    // 聚合所有路由
    routes = routes.concat(app.getAllBModRoutes())
    routes.push( {path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue'), meta: {requireAuth: false}})
    giAllRoutes = routes
    console.log(routes)
    // 收集所有宿主RouteView对应业务模块所属子路由
    const gatherBelongToRoute = () => {
        const _Do = (hostRoute:RouteRecordRawExt,giRoutes:RouteRecordRawExt[]) => {
            const stHoldRouterViewKey = get(hostRoute,'meta.hostRouteViewKey')
            if (!stHoldRouterViewKey || !giRoutes.length) return
            for (let i = 0; i < giRoutes.length;) {
                const iFindItem = giRoutes[i]
                // 宿主路由为将要查找路由数组中的一员则停止查找
                if (hostRoute === iFindItem){
                    i++
                    continue
                }
                if (stHoldRouterViewKey === get(iFindItem,'meta.belongToRouteViewKey')){
                    hostRoute.children = hostRoute.children || []
                    hostRoute.children.push(iFindItem)
                    giRoutes.splice(i,1)
                } else {
                    // 递归查找
                    iFindItem.children && _Do(hostRoute,iFindItem.children)
                    i++
                }
            }
        }
        giAllRoutes.map(item=>_Do(item,giAllRoutes))
    }
    gatherBelongToRoute()
    // 创建路由
    const iRouter = createRouter({
        history: createWebHistory(),
        routes
    })
    // 导航守卫
    iRouter.afterEach((to, from) => {
        const title = get(to, 'meta.title', '')
        title && (document.title = title) // 设置页面标题
    })
    return iRouter
}

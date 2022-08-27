import type {Router, RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHistory} from "vue-router";
import Index from '@/views/Index/Index.vue'
import {get} from "lodash";

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
        {path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue'), meta: {requireAuth: false}},
    ]
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

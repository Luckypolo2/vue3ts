import syscfg from "@/bmod/blog/config/syscfg";
import {RouteRecordRaw} from "vue-router";
import {ROUTER_VIEW_KEY} from "@/utils/Constans";
export const initRoutes = () => {
    const stPath = `/${syscfg.module}`
    const giRoutes:RouteRecordRaw[] = [{
        name:`${syscfg.module}Index`,
        path:stPath,
        meta:{
            title:lpk('Blog'),
            requireAuth:false,
            belongToRouteViewKey: ROUTER_VIEW_KEY.Index,
        },
        component: ()=> import('../views/Index/Index.vue')
    },{
        name: 'articleDetail',
        path: `${stPath}/article/detail/:id`,
        meta: {
            requireAuth: false
        },
        component: () => import('../views/Article/Detail/ArticleDetail.vue')
    },{
        name: 'editArticle',
        path: `${stPath}/article/edit`,
        meta: {
            title: lpk('page.blog.article.edit'),
        },
        component: () => import('../views/Article/Edit/EditArticle.vue')
    }]
    app.registerBMModRoute(giRoutes)
}
export {}

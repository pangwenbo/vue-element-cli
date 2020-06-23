import router from './router'
import store from './store'
import { constantRoutes } from "./router";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { generateIndexRouter } from '@/utils/util'      //动态获取路由

router.beforeEach(async (to, from, next) => {
        NProgress.start()
        if (to.path === '/login') {
                //清除token和store
                window.localStorage.clear()
                store.commit('clearOwnInfo')
                //先跳转
                next()
                // 判断路由表中需要动态生成的地方是否是空的
                if (constantRoutes[1].children.length > 2) {
                        //如果路由没有重置，需要在跳转login的时候进行刷新页面
                        location.reload()
                }
                NProgress.done()
        }
        if (to.path !== '/login') {
                if (store.getters.name) {
                        next()
                }
                if (!store.getters.name) {
                        try {
                                //动态获取路由
                                store.dispatch('getSysUserInfo').then(res => {
                                        let constRoutes = generateIndexRouter(JSON.parse(JSON.stringify(res.body.data.menus)));
                                        //最后添加404，防止刷新页面路由丢失直接去404
                                        constRoutes.push({
                                                path: '*',
                                                name: '/404',
                                                component: resolve => (require(['@/views/404.vue'], resolve)),
                                        })
                                        router.addRoutes(constRoutes);
                                        console.log(to)
                                        // 跳转到目的路由
                                        next({ ...to, replace: true })
                                })
                        } catch (error) {
                                next(`/login?redirect=${to.path}`)
                                NProgress.done()
                        }
                }
        }
})

router.afterEach(() => {
        NProgress.done()
})

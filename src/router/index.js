import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
        return originalReplace.call(this, location).catch(err => err);
};
export const constantRoutes =
        [{
                path: '/',
                redirect: {
                        name: 'home'
                }
        }, {
                path: '/index',
                component: resolve => (require(['@/views/index.vue'], resolve)),
                children: [
                        {
                                path: '',
                                name: 'home',
                                component: resolve => (require(['@/views/home.vue'], resolve)),
                        },
                        {
                                path: '/home',
                                name: 'home',
                                component: resolve => (require(['@/views/home.vue'], resolve)),
                        },


                        // ...systemSetting,
                        // ...integratedManage
                ]

        },
        {
                path: '/login',
                name: 'login',
                component: resolve => (require(['@/views/login.vue'], resolve)),
        }
        ]

const createRouter = () => new Router({
        mode: 'history',
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
        const newRouter = createRouter()

        router.matcher = newRouter.matcher // 重置路由
}

export default router

import { constantRoutes } from "../router";

let routerList = []

export function generateIndexRouter(data) {
        generateChildRouters(data)
        // 返回处理好的路由表
        return constantRoutes;
}

//处理后端数据
function generateChildRouters(data) {
        if (routerList.length > 0) {
                //vue=>router没有清空路由的方法，所以每次生成动态路由都需要确保路由中=>constantRoutes[1]>2
                return
        }
        for (let item in data) {
                //获取所需左侧菜单下的路由，准备好数据
                if (data[item].children) {
                        let children = data[item].children
                        for (let childrenItem in children) {
                                routerList.push(children[childrenItem])
                        }
                }
        }
        data = f_mapTree(routerList)
        for (var k in data) {
                //添加路由=>router=>index=>constantRoutes
                constantRoutes[1].children.push(data[k])
        }
}
//递归处理好的的list<map>
function f_mapTree(data) {
        console.log(data)
        for (let j in data) {
                //去除html配置，一面webpack加载导入路由对应vue页面地址报错
                data[j].component != undefined && data[j].component.indexOf('html') > 0 && data.splice(j, 1)
                //先定义一个变量保存children
                let children = data[j].children
                //下面重新给当前下标复制
                data[j] = {
                        path: data[j].route,
                        name: data[j].route,
                        component: f_loadView(data[j].component),
                        meta: {
                                title: data[j].menuName
                        },
                }
                //判断children有没有
                if (children && children.length > 0) {
                        data[j].children = children
                        //第一个下标如果是button类型的直接删掉
                        if (data[j].children[0].menuType == "Button") {
                                //去除Button
                                delete data[j].children
                        } else {
                                //上左右菜单默认打开首个选项卡
                                data[j].redirect = {
                                        name: data[j].children[0].route
                                }
                                //继续递归
                                f_mapTree(data[j].children)
                        }
                }
        }
        return data
}

function f_loadView(view) {
        // 路由懒加载
        return resolve => (require([`@/views/${view}/index.vue`], resolve))
}
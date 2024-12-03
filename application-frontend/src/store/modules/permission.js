import { defineStore } from "pinia";
import { getRouters } from "@/api/menu";
import { constantRoutes } from "@/utils/router";
import Layout from '@/layout/index.vue'

export const usePermissionStore = defineStore(
    'permission', {
    state: () => ({
        sidebarRouters: [],
    }),
    actions: {
        generateRoutes() {
            return new Promise((resolve, reject) => {
                // 生成路由
                getRouters().then((res) => {
                    const rdata = JSON.parse(JSON.stringify(res.data));
                    const sdata = JSON.parse(JSON.stringify(res.data));
                    const sidebarRoutes = filterAsyncRouter(sdata);
                    const rewriteRoutes = filterAsyncRouter(rdata);
                    this.sidebarRouters = constantRoutes.concat(sidebarRoutes);
                    resolve(rewriteRoutes);
                })
            })
        }
    }
})
function filterAsyncRouter(asyncRouterMap) {
    return asyncRouterMap.filter(route => {
        if (route.component) {
            if (route.component === 'Layout') {
                route.component = Layout
            } else {
                route.component = loadView(route.component)
            }
        }
        if (route.children !== null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
}

function loadView(view) {
    return (resolve) => require([`@/views/${view}`], resolve)
}
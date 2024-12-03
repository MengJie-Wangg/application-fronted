import router from '@/utils/router';
import { getToken } from '@/utils/token';
import { useUserStore } from '@/store/modules/user.js';
import { usePermissionStore } from '@/store/modules/permission';


const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
    const token = getToken();
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (useUserStore().roles.length === 0) {
                useUserStore().getInfo().then(res =>{
                    usePermissionStore().generateRoutes().then(accessRouter =>{
                        accessRouter.filter(item =>{
                            router.addRoute(item);
                        })
                        
                    })
                }).catch(err => {
                    console.log(err);
                })
                next();
            } else {
                next();
            }
        }
        next();
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.fullPath}`);
        }
    }
})
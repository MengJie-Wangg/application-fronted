import router from '@/utils/router';
import { getToken } from '@/utils/token';
import { useUserStore } from '@/store/modules/user.js';

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
    const token = getToken();
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            console.log("123123123",useUserStore().roles.length);
            if (useUserStore().roles.length === 0) {
                console.log("走这里");
                useUserStore().getInfo().then(res =>{
                    console.log(res);
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
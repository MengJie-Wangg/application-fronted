import { defineStore } from "pinia";
import { login, getInfo } from "@/api/login";
import { getToken, setToken } from "@/utils/token";

export const useUserStore = defineStore(
    'user', {
    state: () => ({
        token: getToken(),
        roles: [],
        permissions: []
    }),
    actions: {
        login(userInfo) {
            //登录请求
            const data = {
                username: userInfo.username,
                password: userInfo.password,
                code: userInfo.code,
                uuid: userInfo.uuid,
            }
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    resolve(res);
                    this.token = res.token;
                    setToken(res.token);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getInfo() {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    resolve(res);
                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        this.roles = res.roles;
                        this.permissions = res.permissions;
                    } else {
                        this.roles = ['ROLE_DEFAULT'];
                    }
                }).catch(err => {
                    reject(err);
                })
            })
        },

    }
})

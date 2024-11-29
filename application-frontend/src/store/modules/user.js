import { defineStore } from "pinia";
import { login } from "@/api/login";
export const useUserStore = defineStore(
    'user',
    {
        state: () => {
            token: ''
        },
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
                    }).catch(err => {
                        reject(err);
                    })
                })
            }
        }
    }
)

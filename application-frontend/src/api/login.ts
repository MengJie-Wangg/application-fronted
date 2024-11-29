import request from '@/utils/request'

export function getCodeImg(): any {
    return request({
        url: '/captchaImage',
        method: 'get'
    });
}


export function login(data: any): any {
    return request({
        url: '/login',
        method: 'post',
        data: data
    });
}
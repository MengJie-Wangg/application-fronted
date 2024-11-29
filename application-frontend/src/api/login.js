import request from '@/utils/request'
import { isToken } from 'typescript';

export function getCodeImg() {
    return request({
        url: '/captchaImage',
        headers : {
            isToken : false
        },
        method: 'get'
    });
}


export function login(data) {
    return request({
        url: '/login',
        headers : {
            isToken : false
        },
        method: 'post',
        data: data
    });
}

export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    });
}
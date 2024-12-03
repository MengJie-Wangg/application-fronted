import request from '@/utils/request'

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

// 退出方法
export function logout() {
    return request({
      url: '/auth/logout',
      method: 'delete'
    })
  }
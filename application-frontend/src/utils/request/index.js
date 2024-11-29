import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from '../token';
// 创建 Axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});


//请求拦截器
service.interceptors.request.use(config => {
  const notToken = (config.headers || {}).isToken === false;
  // 添加token到请求头
  if (getToken() && !notToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken();
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code;
  const msg = res.data.msg;
  if (code === 401) {
    return Promise.reject("无效的会话或会话已过期，请重新登录！");
  } else if (code === 500) {
    ElMessage({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg));
  } else if (code !== 200) {
    return Promise.reject(msg);
  } else {
    return res.data;
  }
})



export default service;

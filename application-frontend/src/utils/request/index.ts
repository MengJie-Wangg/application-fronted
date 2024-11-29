import axios from 'axios';
import { ElMessage } from 'element-plus';
// 创建 Axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 设置基础URL
  timeout: 5000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json', // 设置默认请求头
  },
});


service.interceptors.response.use(res => {
  const code = res.data.code;
  const msg = res.data.msg;
  if (code === 500) {
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

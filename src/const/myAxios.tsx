import axios from 'axios';

// TODO: Bearer認証
// TODO: interceptors
// 参考：https://azukiazusa.dev/blog/axios/
export const myAxios = axios.create({
    baseURL: '/index.php',
    timeout: 5000
  })
import axios from 'axios';

// TODO: Bearer認証
// TODO: interceptors
// 参考：https://azukiazusa.dev/blog/axios/
export const myAxios = axios.create({
    baseURL: '/index.php',
    timeout: 5000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
    /* if HTTP Basic auth */
    // ,auth: {
    //   username: 'janedoe',
    //   password: 's00pers3cret'
    // },
    /* if proxy */
    // ,proxy: {
    //   protocol: 'https',
    //   host: '127.0.0.1',
    //   port: 9000,
    //   auth: {
    //     username: 'mikeymike',
    //     password: 'rapunz3l'
    // }
  })
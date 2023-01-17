// 引入axios
import axios from "axios";
// 引入进度条nprogress
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
// 传入配置项，创建一个axios实例
const requests = axios.create({
  // 基本路径,发请求的时候,路径当中会出现api
  baseURL: "/mock",
  //设置请求时超时的时间为5s
  timeout: 5000,
});
// 设置请求拦截器
requests.interceptors.request.use((config) => {
  // 开始进度条
  nprogress.start();
  return config;
});
// 设置响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 结束进度条
    nprogress.done();
    return res.data;
  },
  (err) => {
    return Promise.reject(new Error("fail"));
  }
);
// 对外暴露接口
export default requests;

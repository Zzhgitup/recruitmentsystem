import axios from 'axios';
import type { AxiosInstance } from 'axios';
// AxiosRequestConfig进行扩展 拦截器接口  可选
import { AxiosRequestConfig2 } from './type';
class HYrequest {
  instance: AxiosInstance;
  interceptor?: AxiosRequestConfig2;
  //request实例=》axios的实例
  constructor(config: AxiosRequestConfig2) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (config) => {
        //请求拦截器
        return config;
      },
      (err) => err
    );
    this.instance.interceptors.response.use(
      //响应拦截器
      (res) => {
        //省去 没必要的部分
        return res.data;
      },
      (err) => err
    );
    //拓展拦截器
    if (config.interceptor) {
      this.instance.interceptors.request.use(
        config.interceptor?.requestSuccessFn,
        config.interceptor?.requestFailFn
      );
      this.instance.interceptors.response.use(
        config.interceptor?.responseSuccessFn,
        config.interceptor?.responseFailFn
      );
    }
  }
  //封装网络请求的方法  精细化处理，单个请求也能加拦截器
  myrequest<T = any>(config: AxiosRequestConfig2<T>) {
    if (config.interceptor?.requestSuccessFn) {
      //手动回调请求成功拦截器
      config = config.interceptor.requestSuccessFn(config);
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptor?.responseSuccessFn) {
            res = config.interceptor.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get<T = any>(config: AxiosRequestConfig2<T>) {
    return this.myrequest({ ...config, method: 'get' });
  }
  post<T = any>(config: AxiosRequestConfig2<T>) {
    return this.myrequest({ ...config, method: 'post' });
  }
  put<T = any>(config: AxiosRequestConfig2<T>) {
    return this.myrequest({ ...config, method: 'put' });
  }
  delete<T = any>(config: AxiosRequestConfig2<T>) {
    return this.myrequest({ ...config, method: 'delete' });
  }
}
export default HYrequest;

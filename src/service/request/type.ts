import type { AxiosRequestConfig, AxiosResponse } from 'axios';
// 定义 AxiosRequestConfig2 接口，它继承了 AxiosRequestConfig 接口，并新增了一个 interceptor 属性
export interface AxiosRequestConfig2<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: {
    requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestFailFn?: (err: any) => any;
    responseSuccessFn?: (res: T) => T;
    responseFailFn?: (err: any) => any;
  };
}

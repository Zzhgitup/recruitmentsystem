import { BASE_URL, TIMEOUT } from './config';
import HYrequest from './request';
const Hyrequire = new HYrequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});
const Hyrequire2 = new HYrequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptor: {
    requestSuccessFn(config) {
      console.log('InternalAxiosRequestConfig拦截器');
      return config;
    },
    requestFailFn: (err) => {
      return err;
    },
    responseSuccessFn: (res) => {
      return res;
    },
    responseFailFn(err) {
      return err;
    }
  }
});

export { Hyrequire, Hyrequire2 };

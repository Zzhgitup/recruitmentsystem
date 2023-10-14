import { BASE_URL, TIMEOUT } from './config';
import HYrequest from './request';
import nProgress from 'nprogress';
const Hyrequire = new HYrequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptor: {
    requestSuccessFn(config) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.headers!.token = localStorage.getItem('ZXtoken');
      nProgress.start();
      return config;
    },
    requestFailFn: (err) => {
      return err;
    },
    responseSuccessFn: (res) => {
      nProgress.done();
      return res;
    },
    responseFailFn(err) {
      nProgress.done();
      return err;
    }
  }
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

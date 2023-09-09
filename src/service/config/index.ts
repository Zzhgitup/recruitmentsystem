//http://152.136.185.210:4000
//http://152.136.185.210:5000
//2 依赖于 开发环境
/* let BASE_URL = 'http://47.116.41.66:9527';
const TIMEOUT = 10000;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
  BASE_URL = 'http://47.116.41.66:9527';
} else {
  //生产环境
  BASE_URL = 'http://47.116.41.66:9527';
}
export { BASE_URL, TIMEOUT }; */
export const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
export const TIMEOUT = 20000;

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api', // 设置需要代理的请求前缀
    createProxyMiddleware({
      target: 'http://47.116.41.66:9527', // 设置代理目标地址
      changeOrigin: true, // 修改请求头中的 Origin 属性
      pathRewrite: {
        '^/api': '' // 可选配置，将请求前缀替换为空字符串
      }
    })
  );
};

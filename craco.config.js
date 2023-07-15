const path = require('path');
const CracolessPlugin = require('craco-less');
//处理less资源
module.exports = {
  webpack: {
    //webpack配置
    // 配置别名
    alias: {
      //设置别名是为了让后续引用的地方减少路径的复杂度
      '@': path.resolve('src')
    }
  },
  plugins: [{ plugin: CracolessPlugin }],
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            [
              'postcss-pxtorem',
              {
                rootValue: 375 / 10, // 根元素字体大小
                // propList: ['width', 'height']
                include: path.resolve(__dirname, 'src/views/studentApply/'),
                propList: ['*']
              }
            ]
          ]
        }
      }
    }
  }
};

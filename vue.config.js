const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      ///api:请求路径当中需要携带/api,代理服务器才会工作
      '/api': {
        target: 'http://sph-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' }, 
      },
    },
  }
})

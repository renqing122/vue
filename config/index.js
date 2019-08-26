<<<<<<< HEAD
module.exports = {
    devTest: { //部署到测试服务器上
        remotePath: '/app/', //部署到服务器的路径
        host: '111.11.111.111', //ip地址
        user: 'root', //帐号
        pass: '88888888', //密码
        port: 22 //端口
    },
    devDist: { //部署正式服务器上
        remotePath: '/app/', //部署到服务器的路径
        host: '111.11.111.111', //ip地址
        user: 'root', //帐号
        pass: '88888888', //密码
        port: 22 //端口
    },
    publicPath: '/app/', //程序在网站根路径地址
    target: 'https://cnodejs.org/' //连接的服务器地址
=======
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/3rd': {
        target: 'http://www.tuling123.com/openapi/api',
        changeOrigin: true,
        pathRewrite: {
          '^/3rd': ''
        }
      },
      '/api': {
        target: 'http://114.116.9.214:8666',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
>>>>>>> dd51dfdd598d0f9566b6aac9dd4aba30924dd5b3
}

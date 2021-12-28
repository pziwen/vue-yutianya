'use strict'

const path = require('path'); // Node.js path 模块提供了一些用于处理文件路径的小工具 https://www.runoob.com/nodejs/nodejs-path-module.html

function resolve(dir) {
  return path.join(__dirname, dir) // 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"
}

module.exports = {
  outputDir: './vue-yutianya',
  assetsDir: 'static',

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      mainFiles: ['index'],
      alias: {
        '@': resolve('src'),
        'api': resolve('src/api'),
        'assets': resolve('src/assets'),
        'components': resolve('src/components'),
        'layout': resolve('src/layout'),
        'router': resolve('src/router'),
        'store': resolve('src/store'),
        'style': resolve('src/style'),
        'utils': resolve('src/utils'),
        'views': resolve('src/views')
      }
    }
  }
}
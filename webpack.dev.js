const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = merge(common, {
  mode: 'development',
  // 追踪源代码 错误的原始位置
  devtool: 'inline-source-map',

  // 使用webpack --watch  当webpack检测到文件改动的时候   自动编译  但是浏览器并不会自动刷新
  // 使用webpack-dev-server --open    当webpack检测到文件改动的时候  自动编译 
  // devServer 选项则是 将contentBase目录下的文件serve到localhost:port下
  // webpack-dev-server并不会写入到任何输出文件（dist目录下没有内容） 而是将编译之后的文件保存在内存中， 然后将他们serve到server中
  // localhost:9000/ 下可以查看编译之后的文件   localhost:9000/app.bundle.js
  devServer: {
    contentBase: './dist',
    port: 9000,
    hot: true
  },
  plugins: [
    //  用于定义全局变量  一般用于区分 production 和 development
    new webpack.DefinePlugin({
      'env': "'development'"
    }),
    // 引入全局插件  一般用于非npm 包   即不能import 或者 require 的js
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jquery': 'jquery'
    }),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: true, //不需要格式化
          comments: true //不保留注释
        },
        compress: {
          // warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: false, // 删除所有的 `console` 语句，可以兼容ie浏览器
          // collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          // reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": './src'
    },
    // 引入时不用加后缀名
    // require("demo.js")   require("demo")
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm',
      '.ts',
      '.tsx'
    ],
  },
  // optimization: {
  //   minimizer: [new UglifyJsPlugin(
  //     {
  //       uglifyOptions: {
  //         output: {
  //           comments: false,
  //         },
  //       },
  //     }
  //   )],
  // }
});
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const opn = require("opn")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


//  webpack-dev-middleware webpack-hot-middleware 实现webpack-dev-server -hot 功能
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware")


const app = express();

const config = {
  mode: 'development',
  //// 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
  entry:['webpack-hot-middleware/client?noInfo=true&reload=true', './src/index.js'],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '热重载',
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'env': "'development'"
    }),
    // 引入全局插件  一般用于非npm 包   即不能import 或者 require 的js
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jquery': 'jquery'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
}
// const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置

var devMiddleWare = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quite: false
})

var hotMiddleware = webpackHotMiddleware(compiler, {
  heartbeat: 2000,
  log: false
})
app.use(hotMiddleware)

// // force page reload when html-webpack-plugin template changes

//  
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    console.log('force page reload when html-webpack-plugin template changes')
    hotMiddleware.publish({ action: 'reload' });
    // window.location.reload() 
    console.log(cb, data)
  })
})


compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => { 
  console.log('force page reload when html-webpack-plugin template changes') 
  hotMiddleware.publish({  
    action: 'reload'  
  });  
});

// 编译成功之后的回掉
devMiddleWare.waitUntilValid(() => {
  console.log('编译成功');
  // 编译成功之后 浏览器打开页面
  opn('http://localhost:3000')
})
app.use(devMiddleWare)
// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
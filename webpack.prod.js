const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack")

module.exports = merge(common, {
  // 生产环境会默认使用 TerserPlugin 将代码压缩

  // 从webpack 4开始   指定mode 会默认分别配置definePlugin
  mode: 'production',
  // 在生产环境下使用inline-source-map会加大打包后代码的体积
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'env':"'production'"
    })
  ]
});
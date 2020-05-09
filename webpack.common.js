const path = require('path');
const webpack = require("webpack")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const demo = "'this is demo'"
module.exports = {
  entry: {
    // 多入口文件 会有多个代码块   打包之后会生成两个bundle
    // app: ['./src/index.js', './src/entry.js']
    // pageOne: './src/index.js',
    // pageTwo: './src/entry.js',
    // app: ['./src/index.js', './src/entry.js'],
    app: './src/index.js'
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  plugins: [
    //打包之前  先清理dist文件夹
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: "cacheing",
      template: './public/index.html'
    })
    // 如果没有这个htmlwebpackPlugin  那么每次打包js之后  需要手动改动index.html
    // 这个插件用于自动生成打包之后的html
    // 这个html会根据js之间的引入的关系  生成有顺序的script标签
    // template 制定生成的html的模板  （如果模板内需要引入manifest 或者自己定义的其他标签）
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   filename: 'page1.html',
    //   chunks: ['pageOne']
    // }),
    // 制定chunks   默认会把打包之后的多个入口文件都引入
    // new HtmlWebpackPlugin({
    //   title: 'page2.html',
    //   filename: 'page2.html',
    //   chunks: ['pageTwo']
    // })
// 用于定义一个全局变量
    
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    // 打包之后非入口文件 name
    chunkFilename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
};





// const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');
// // 如果webpack.config.js存在 那么webpack会默认选择使用它
// module.exports = {
//   mode: 'production',
//   // optimization: {
//   //   usedExports: true
//   // },
//   //  要打包的入口文件
//   // entry: './src/index',
//   entry: {
//     app: './src/index.js'
//   },
//   // 追踪源代码 错误的原始位置
//   devtool: 'inline-source-map',


//   // 使用webpack --watch  当webpack检测到文件改动的时候   自动编译  但是浏览器并不会自动刷新
//   // 使用webpack-dev-server --open    当webpack检测到文件改动的时候  自动编译 
//   // devServer 选项则是 将contentBase目录下的文件serve到localhost:port下
//   // webpack-dev-server并不会写入到任何输出文件（dist目录下没有内容） 而是将编译之后的文件保存在内存中， 然后将他们serve到server中
//   // localhost:9000/ 下可以查看编译之后的文件   localhost:9000/app.bundle.js
//   devServer: {
//     contentBase: "./dist",
//     port: '9000',
//     hot: true
//   },

//   plugins: [
//     //打包之前  先清理dist文件夹
//     new CleanWebpackPlugin(),


//     // 如果没有这个htmlwebpackPlugin  那么每次打包js之后  需要手动改动index.html
//     // 这个插件用于自动生成打包之后的html
//     // 这个html会根据js之间的引入的关系  生成有顺序的script标签
//     new HtmlWebpackPlugin({
//       title: '模块热替换'
//     }),


//     // 模块热替换   webpack-dev-server会改动的同时刷新页面  但是用模块热替换  浏览器不会刷新 但是代码会替换
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   output: {
//     // 打包之后的文件名
//     filename: '[name].bundle.js',
//     // 打包之后的文件放置的路径
//     path: path.resolve(__dirname, 'dist'),
//     // publicPath: '/',

//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       }
//     ]
//   },

// }


// // package.json 中的sideEffects: false代表webpack 可以安全的删除没有引用的export  缩小打包后的体积


// "test": "echo \"Error: no test specified\" && exit 1",
//     "watch": "webpack --watch --config webpack.dev.js", // 检测到文件改动会自动打包
//     "start": "webpack-dev-server --open --config webpack.dev.js",
//     "build": "webpack --config webpack.prod.js",
//     "dev": "webpack --config webpack.dev.js", // 基本的打包命令
//     "server": "node server.js" // 用webpack-dev-middleware webpack-hot-middleware是实现webpack-dev-server
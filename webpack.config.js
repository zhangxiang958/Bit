/**
 * waterflow - webpack.config.js
 * Created by zhangxiang on 17/5/1.
 */

'use strict';
var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
          devtool: 'eval-source-map',  //配置生成 Source Maps, 选择合适的选项
          watch: true,
          entry: {
                "index": "./src/app.js"
          },
          output: {
            path: __dirname + '/static/js/dest',
            filename: "app.js",
            chunkFilename: "[name].js",
            publicPath:  './lib/'
          },

          

          //module 添加 loader
          /**
          *  @test   匹配 loader 处理文件的拓展名正则表达式
          *  @loader loader名称 
          *  @include/exclude  手动添加必须处理的文件(夹)或屏蔽不需要处理的文件(夹)
          *  @query  为 laoders 提供额外设置选项
          */
         module: {
            loaders: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'react']
                }
              },
              {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules!postcss-loader'  //从右到左
              }
            ]
          },

          // postcss: [
          //     require('autoprefixer')//调用autoprefixer插件
          // ],
          // vue: {
          // 	loaders: {
          // 		css: ExtractTextPlugin.extract('css')
          // 	}
          // },
          resolve: {
              alias: {vue: 'vue/dist/vue.js'}
          },
          // babel: {
          //     presets: ['es2015'],
          //     plugins: ['transform-runtime']
          // },
          plugins: [
              new webpack.LoaderOptionsPlugin({
                options: {
                  //
                  postcss: [
                    require('autoprefixer')
                  ],
                  //开发服务器
                  devServer: {
                    contentBase: './src',        //本地服务器加载页面所在目录
                    colors: true,               //终端为彩色
                    historyApiFallback: true,  //不跳转
                    inline: true,
                    hot: true
                  },
                }
              }),
              new webpack.HotModuleReplacementPlugin()   //热加载插件
            	//new ExtractTextPlugin('style.css'),
              //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
          ]
        };

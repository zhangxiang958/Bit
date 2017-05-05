/**
 * waterflow - webpack.config.js
 * Created by zhangxiang on 17/5/1.
 */

'use strict';

var path                = require('path');
var fs                  = require('fs');
var webpack             = require('webpack');
//var ExtractTextPlugin   = require('extract-text-webpack-plugin');  //将文件中的样式另外打包出来
var CommonsChunkPlugin  = require("webpack/lib/optimize/CommonsChunkPlugin");

var srcDir = path.resolve(process.cwd(), 'src/static');


//获取多页面每个入口文件, 用于配置 entry
function getEntry(){

  var jsPath  = path.resolve(srcDir, 'js');
  var dirs    = fs.readdirSync(jsPath);

  var matchs  = [], files = {};
  
  dirs.forEach(function(item){
    matchs = item.match(/(.+)\.js$/);
    if(matchs) {
      files[matchs[1]] = path.resolve(srcDir, 'js', item);
    }
  });

  return files;
}

module.exports = {
          //页面入口文件配置
          entry: getEntry(),
          //入口文件配置
          output: {
              path: path.join(__dirname, '/src/static/dest'),
              publicPath: 'bulid/js',
              filename: "[name].js",
              chunkFilename: '[chunkhash].js'
          },
           module: {
              loaders: [
                  {
                      test: /\.js$/,
                      exclude: /node_modules/,
                      loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                      query: {
                          presets: ['es2015']
                      }
                  }
              ]
          },
          resolve: {
              alias: {

                // vue: 'vue/dist/vue.js'
              }
          },
          //插件项
          plugins: [
              new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery'
              }),
              new webpack.optimize.CommonsChunkPlugin('common')
          ]
        };

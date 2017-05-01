/**
 * learning-gulp - webpack.config.js
 * Created by mengdesen on 15/4/14.
 */

'use strict';
var path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
          entry: {
                "index": "./src/app.js"
            },
            output: {
              path: __dirname + '/lib',
                filename: "app.js",
                chunkFilename: "[name].js",
                publicPath:  './lib/'
            },
          module: {
            loaders: [{
              test: /\.vue$/,
              loader: 'vue'
            }, {
                  test: /\.js$/,
                  loader: 'babel',
                  exclude: /node_modules/,
                  query: {
                        presets: ['es2015']
                    }
                },{
              test: /\.(png|jpg)$/,
              loader: 'url'
            }]
          },
          vue: {
          	loaders: {
          		css: ExtractTextPlugin.extract('css')
          	}
          },
          resolve: {
              alias: {vue: 'vue/dist/vue.js'}
            },
            babel: {
              presets: ['es2015'],
              plugins: ['transform-runtime']
            },
            plugins: [
            	new ExtractTextPlugin('style.css'),
              	new Webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
            ],
          watch: true
        };

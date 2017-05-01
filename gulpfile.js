/**
 * WaterFlow - gulpfile.js
 * Created by zhangxiang on 17/5/1.
 */


/**
1.如果是 react 项目就打包 React, 如果是 Vue 项目就打包 Vue, 项目结构类似 done
2.将静态资源上传到七牛 CDN done
3.将 CSS, JS 文件压缩  js done
4.合并雪碧图
5.文件使用 md5
6.mock done
**/


'use strict';

var gulp              = require('gulp');
var concat            = require('gulp-concat');
var minifyCSS         = require('gulp-minify-css');
// var uglify        = require('gulp-uglify');
var connect           = require('gulp-connect');
// var mockServer    = require('gulp-mock-server');
// var webpack       = require('gulp-webpack');

//CSS 编译
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

const autoprefixerConfig = {
  browers: ['last 2 versions', 'Android >= 4.0', 'IOS'],
  cascade: true,   //对齐属性(美化)
  remove: true
};

// 上传七牛 cdn
// var qn = require('gulp-qn');

// MD5戳
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
// var runSequence = require('run-sequence');


//源文件路径
const sourcePath    = 'src';
const devStaticPath = 'src/static';
const outputPath    = './build';

//webpack 配置
// var webpackConfig = require('./webpack.config.js');

//创建 本地服务器
gulp.task('server', function(){
  connect.server({
    root: sourcePath,
    port: 8080,
    livereload: true
  });
});

//监听文件
gulp.task('devWatch', function(){
  gulp.watch('src/static/sass/*.scss', ['devCSS']);
  gulp.watch('src/*.html', ['devHTML']);
});

//编译 html
gulp.task('devHTML', function(){
  gulp.src('./src/*.html')
      .pipe(connect.reload());
});

//编译 CSS
gulp.task('devCSS', function(){
  gulp.src('src/static/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer(autoprefixerConfig))
      .pipe(gulp.dest(devStaticPath + '/css'))
      .pipe(connect.reload());
});


//打包 SPA(app.js, router.js)
var appList = ['app', 'router'];

gulp.task('bundle', function(){
  return gulp.src(mapFiles(appList, 'js'))
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('src/lib/'))
        .pipe(connect.reload());
});

function mapFiles(list, extname) {
  return list.map(function (app){
    return 'src/' + app + '.' + extname;
  });
};

//使用 mock 模拟 API
gulp.task('mock', function(){

  gulp.src(sourcePath)
      .pipe(mockServer({
        mockDir: sourcePath + '/mock',
        livereload: false,
        directoryListing: false,
        port: 8090
      }));
});

// gulp.task('default', ['server', 'mock']);
gulp.task('dev', ['server', 'devWatch', 'devHTML', 'devCSS']);
gulp.task('devWEBPage', ['server', 'devWatch', 'devHTML', 'devCSS']);

//=============================================================
var qiniu = {
    accessKey: '6sBCo463jJOCnBIYX__uy9avZ7C2hj_MHb-ffKAr',
    secretKey: '3vPk7fB0HcwL5V9E2AErHuR19HM389eYqdvQcncL',
    bucket: 'xdemo',
    domain: 'http://7xik9a.com1.z0.glb.clouddn.com'
};

//===============================================================
gulp.task('publish-js', function () {
  return gulp.src(mapFiles(appList, 'js'))
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(uglify())
        .pipe(gulp.dest(outputPath))
        .pipe(connect.reload());
});

gulp.task('publish-css', function () {
  return gulp.src(mapFiles(cssList, 'css'))
    .pipe(concat('app.css'))
    .pipe(shrink())
    .pipe(rev())
    .pipe(gulp.dest(outputPath))
    // .pipe(qn({
    //   qiniu: qiniu,
    //   prefix: 'gmap'
    // }))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/rev/css'));
});


gulp.task('puclishCSS', function(){
  gulp.src('./src/static/less/*.less')
      .pipe(less())
      .pipe(autoprefixer(autoprefixerConfig))
      .pipe(concat('main.css'))
      .pipe(minifyCSS())
      // .pipe(rev())
      .pipe(gulp.dest(devStaticPath + '/css'));
});

gulp.task('publish-html', function () {
  return gulp.src(['./build/rev/**/*.json', sourcePath + '/index.html'])
    .pipe(revCollector({
      dirReplacements: {
        'build/': ''
      }
    }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('publish', function (callback) {
  runSequence(
    ['publish-css', 'publish-js'],
    'publish-html',
    callback);
});
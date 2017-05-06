/**
 * WaterFlow - gulpfile.js
 * Created by zhangxiang on 17/5/1.
 */

'use strict';

var gulp              = require('gulp');
var concat            = require('gulp-concat');
var minifyCSS         = require('gulp-minify-css');
var uglify            = require('gulp-uglify');
var connect           = require('gulp-connect');
var gutil             = require('gulp-util'); 
var webpack           = require('webpack');

//源文件路径
const sourcePath    = 'src';
const devStaticPath = 'src/static';
const outputPath    = './build';

//webpack 配置
var webpackConfig = require('./webpack.mutipart.config.js');
var devCompiler   = webpack(webpackConfig);

//CSS 编译配置
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

const autoprefixerConfig = {
    browers: ['>1%'],
    cascade: true,   //对齐属性(美化)
    remove: true
};


//图片压缩配置
var imgmin    = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');  //深度压缩

const imgminConfig = {
  progressive: true, // 无损压缩JPG图片
  svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
  use: [pngquant()] // 使用pngquant插件进行深度压缩
}

// 上传七牛 cdn
var qn          = require('gulp-qn');
var qiniuConfig = require('./qiniu.config.js');

// MD5戳
var rev           = require('gulp-rev');
var revCollector  = require('gulp-rev-collector');
var runSequence   = require('run-sequence');

//===================  dev =============================
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
  gulp.watch('src/*.html', ['devHTML']);
  gulp.watch('src/static/sass/*.scss', ['devCSS']);
  gulp.watch('src/static/js/*.js', ['devScript']);
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

//编译 JS
gulp.task('devScript',['bundle'],function(){

  gulp.src('src/static/**/*.js')
      .pipe(connect.reload());
});

gulp.task('bundle', function(){

  devCompiler.run(function(err, stats){
    if(err) throw new gutil.PluginError('webpack:bulid-js', err);
    gutil.log('[webpack:bulid-js]', stats.toString({
      colors: true
    }));
  });
});

//压缩图片
gulp.task('tinyImg', function(){
   gulp.src(devStaticPath + '/img/*.{png,jpg,gif,ico}')
       .pipe(imgmin(imgminConfig))
       .pipe(gulp.dest(outputPath + '/img'));
});

gulp.task('devPage', ['server', 'devWatch', 'devHTML', 'devCSS', 'devScript']);

//===================== dev task end =========================

//====================== Deploy ==============================
gulp.task('publish-js', ['bundle'], function () {
  return gulp.src(devStaticPath + '/dest/*.js')
             .pipe(uglify())
             .pipe(rev())
             .pipe(gulp.dest(outputPath + '/js'))
             .pipe(rev.manifest());
});

gulp.task('publish-css', function(){
  return gulp.src('./src/static/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer(autoprefixerConfig))
      .pipe(concat('main.css'))
      .pipe(minifyCSS())
      .pipe(rev())
      .pipe(gulp.dest(outputPath + '/css'))
      .pipe(rev.manifest());
});

gulp.task('publish-html', function () {
  return gulp.src(['build/**/*.json', sourcePath + '/*.html'])
    .pipe(revCollector({
      dirReplacements: {
        './static/css': './css',
        './static/dest/': './js'
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

gulp.task('publish2qiniu', function(){
      gulp.src(outputPath + '/**/*.*')
          .pipe(qn(qiniuConfig));
});
# WaterFlow 

## 解决前端工作流

这个套路解决以下问题
* MD5使用的rev
* 静态文件打包使用webpack
* JS压缩使用uglify
* CSS压缩使用cssshrink
* *(可选)*CDN使用七牛，所以有个可选的负责上传的gulp插件
* concat是Gulp标配，不解释
## Usage
### WebPage


### Vue


### React


### 移动端
```
$baseFontSize: 75px;  //设计稿


@function pxToRem($px){
	@return $px / $baseFontSize * 1rem;
}
```

## 附录
### 为什么使用 sass 而不是 less
相比于 less, sass 更像是一个编程语言, 可以自定义函数, 使用更加灵活





开发与构建可以分开(构建用 gulp, 开发用 webpack)


图片压缩  base64(限制多大以下使用 base64)
js  webpack(vue, React)
Babel es6
rev gulp-rev-all  md5 hash 自动替换 html 中的引用

vue, react 等使用 vendor






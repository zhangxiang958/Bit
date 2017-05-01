# WaterFlow 

## 解决前端工作流

开发与构建可以分开(构建用 gulp, 开发用 webpack)
这个套路解决以下问题
* MD5使用的rev
* 静态文件打包使用webpack
* JS压缩使用uglify
* CSS压缩使用 gulp-minify-css
* *(可选)*CDN使用七牛，所以有个可选的负责上传的gulp插件
* concat是Gulp标配，不解释

## Solution
### CSS
* CSS 使用 sass, 提升编写 CSS 的灵活度
* 使用 autoprefixer, 自动添加浏览器兼容前缀, 解决你的兼容烦恼
* CSS 合并, 减少 CSS 文件数量, 减少 HTTP 请求数量, 优化页面性能
* CSS 压缩, 减少 CSS 文件大小, 减少 HTTP 请求大小, 加快首屏时间

### Javascript
* 使用 Javascript 模块化
* 使用 ESLint, 规范团队协作, 减少 Javascript 错误
* 压缩 Javascript 文件大小,  减少 HTTP 请求大小, 加快首屏时间
* 合并 Javascript 文件, 减少 HTTP 请求数, 优化页面首屏时间

js  webpack(vue, React)
Babel es6

### 图片


## Usage
### WebPage


### Vue
使用 .vue 后缀文件的组件化开发, 使用 webpack 进行打包构建开发
vue, react 等使用 vendor

### React
使用 
vue, react 等使用 vendor

### 移动端布局
在移动端使用 rem 布局, 但是如果全局使用 rem 单位, 这样的单位并不直观, 并且比较难维护, 当项目设计迭代
比较多的时候, 后来者可能会不知道原本元素尺寸, 所以在移动端中设计稿一般使用 iPhone 6 的 750 px 作为
宽度, 然后设置 baseFontSize 为 1/10 的设计稿宽度, 使用 sass 中的函数进行 rem 转换.

```
$baseFontSize: 75px;  //设计稿


@function pxToRem($px){
	@return $px / $baseFontSize * 1rem;
}
```

## Deploy
### 静态文件部署
对于 HTML 不进行缓存, 使用 304 条件 GET 请求进行使用
对于 CSS, Javascript, 等使用 MD5 + 时间戳的方法使用高效缓存部署

## 附录
### 为什么使用 sass 而不是 less
相比于 less, sass 更像是一个编程语言, 可以自定义函数, 使用更加灵活













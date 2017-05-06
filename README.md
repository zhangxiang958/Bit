# WaterFlow 

一个基于 gulp 和 webpack 的适合小团队前端工作流开发工具
## 解决你的前端工作流

webp????
* 静态文件打包使用webpack
* JS压缩使用uglify

## Solution
### CSS
* CSS 使用 sass, 提升编写 CSS 的灵活度
* 使用 autoprefixer, 自动添加浏览器兼容前缀, 解决你的兼容烦恼
* CSS 合并, 减少 CSS 文件数量, 减少 HTTP 请求数量, 优化页面性能
* CSS 压缩, 减少 CSS 文件大小, 减少 HTTP 请求大小, 加快首屏时间
* CSS 雪碧图合并, 优化页面性能

对于多人协作, css 的命名全局污染一直是 CSS 的痛点, 所以可以使用 webpack 的 css-loader 来实现
css module 来消除痛点. 而在 webpage 中, 考虑到小团队中参与开发人员不多, 项目规模较小的情况下, 建议
使用 BEM 等命名规范这种弱约束来达到模块化 CSS.

### Javascript
* 使用 Javascript 模块化
* 使用 ESLint, 规范团队协作, 减少 Javascript 错误
* 压缩 Javascript 文件大小,  减少 HTTP 请求大小, 加快首屏时间
* 合并 Javascript 文件, 减少 HTTP 请求数, 优化页面首屏时间

js  
webpack(vue, React)
Babel es6

### 图片
当我们在本地开发的时候, 切图的时候可以不关注图片的大小, 可以只关注效果的呈现, 但是当我们部署静态资源的时候
就需要关注页面性能了, 所以这时候会将图片进行压缩处理, 以便达到图片不失真但是文件大小减少的期望.
使用命令进行压缩: 
```
~$ gulp tinyImg
```
输出路径

## 项目目录结构
```
project/
|---gulpfile.js
|
|---src
|    |---API   存放关于后端请求相关操作的 js 文件
|    |
|    |---mock  mock 服务器与 mock 文件
|    |
|    |---components  存放公用组件
|    |
|    |---views   存放页面
|    |
|    |---static  存放静态资源（img，css，js）
|    |     |---img
|	 |     |	|---page
|	 |	   |	|---slice
|    |     |
|	 |	   |---css  //打包后的 css 文件
|    |     |
|    |	   |---sass //编写的 scss 文件
|    |     |
|    |     |---js
|    |          |---lib      第三方 js 库
|    |          |---scripts  编写的 js 脚本
|    |          |---dest     打包完成的 js 文件
|    |
|    |---index.html  默认页面
|    |---
|
```


## Usage
### WebPage
zepto/jQuery

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

对于 CSS, Javascript, 等使用 MD5 + 时间戳的方法实现去缓存文件

静态文件可以部署到七牛 CDN 上, 我们只需要做一个 CNAME DNS 解析就可以达到文件服务器的效果

## 附录
### 为什么使用 sass 而不是 less
相比于 less, sass 更像是一个编程语言, 可以自定义函数, 使用更加灵活

## History
### 17.05.06
初步完成重构页面的构建, js 模块化直接使用 ES6 的模块化方案, CSS 使用 sass 使用高效灵活的 css 编写方案
实现图片压缩功能, 应该添加雪碧图功能与 base64 方案
下一步完成重构的构建
下一步是完成单页面应用(vue, react)的打包














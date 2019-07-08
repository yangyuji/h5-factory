
# h5-factory
h5专题页面可视化编辑工具，拖拽编辑，灵活切换，一键生成html文件

## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9999
npm run dev

# build for production with minification
npm run build

# build report
npm run build:report
```

### 组件
* 文本
* 图片
* 表单
* 轮播图
* 底部导航
* 楼层导航
* 倒计时
* 横向滚动
* 滚动新闻
* 金刚位
* ...

### todo
1、一个配置生成小程序

### 功能特点
* 图片懒加载
``` bash
<img data-src="" class="lazyload">
```
* 按需加载组件代码和样式（‘,’方式需配置nginx支持）
``` bash
// 按需生成script标签
<script src="lib/swiper.min.js,base/timeout.min.js,base/form.min.js"><script>
// 根据用到的组件添加style
<link ref="stylesheet" href="/css/swiper.min.css,form.min.css"/>
```
* 微信分享配置
``` bash
window.pageConfig = {
  shareInfo: {
    api: '',
    url: '',
    title: '',
    desc: '',
    thumb: ''
  }
}
```
* 页面标题和seo配置
``` bash
<meta name="keywords" content="<!--keywords-->">
<meta name="description" content="<!--description-->">
```
```
* 页面背景色/图片配置
```bash
<style>
  body {
    background-color: #fff;
    background-image:url();
    background-repeat: no-repeat;
  }
</style>
```

自定义跳转链接，一键生成纯静态html文件，SEO友好，页面秒开，随时随地部署使用。还可以在此基础上开发业务相关的组件，例如商品列表，文章列表等。

## 文档
系统架构设计和组件拆分原则可阅读我的掘金文章：[《搭建一个简单易用的专题页面制作平台》](https://juejin.im/post/5cf328706fb9a07f042030f0)

[在线体验地址](https://yangyuji.github.io/h5-factory/)

## 许可证
[MIT](https://github.com/yangyuji/h5-factory/blob/master/LICENSE)

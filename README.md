
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

### 消费使用
我的消费端页面模板例子，仅供参考：
``` bash
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta content="telephone=no,email=no" name="format-detection">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="keywords" content="<!--shareTitle-->">
    <meta name="description" content="<!--shareDesc-->">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="dns-prefetch" href="//域名">
    <title><!--pageName--></title>
    // 页面配置信息里的样式
    <style>
      body {
        background-color: #fff;
        background-image: url();
        background-repeat: no-repeat;
      }
    </style>
	  // 根据用到的组件添加style
    <link ref="stylesheet" href="/css/swiper.min.css,form.min.css"/>
    // 优先执行的js
	  <script type="text/javascript">
	      // 页面全局配置参数
        window.pageConfig = {
          shareInfo: {
            api: '',
            url: '',
            title: '',
            desc: '',
            thumb: ''
          }
        }
        <!--headJs-->
    </script>
</head>
<body>
    // 异常或错误显示的dom
    <div class="err-panel"></div>
    
    <div id="app" class="app">
        <!--pageContent-->
    </div>
    
    // 回到顶部等预置的dom
    <div class="goto-top" style="display:none;">goTop</div>
    
    // 按需生成script标签
    <script src="common/body.min.js,lib/swiper.min.js,base/timeout.min.js,base/form.min.js"><script>
    
    <script type="text/javascript">
       // 底部代码，比如统计代码等
    </script>
</body>
</html>

```

根据模板由后端生成纯静态html文件，SEO友好，页面秒开，随时随地部署使用。还可以在此基础上开发业务相关的组件，例如商品列表，文章列表等。

### 发散使用
1、APP和M站首页的可视化制作；
2、一键配置生成小程序页面；
3、配置即生成dom串存到数据库，后端渲染出页面；

## 文档
系统架构设计和组件拆分原则可阅读我的掘金文章：[《搭建一个简单易用的专题页面制作平台》](https://juejin.im/post/5cf328706fb9a07f042030f0)

[在线体验地址](https://yangyuji.github.io/h5-factory/)

## 打赏作者
![reward](https://yangyuji.github.io/h5-factory/static/img/reward.jpeg)

## 许可证
[MIT](https://github.com/yangyuji/h5-factory/blob/master/LICENSE)

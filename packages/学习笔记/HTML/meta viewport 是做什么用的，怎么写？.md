# meta viewport 是做什么用的，怎么写？

用法

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
```

| 属性            | 值示例                  | 作用                                             |
| ------------- | -------------------- | ---------------------------------------------- |
| width         | device-width 或 600px | 设置视口的宽度。device-width 表示完美适配当前设备的屏幕宽度（最重要）。     |
| initial-scale | 1.0                  | 页面首次加载时的初始缩放比例。1.0 表示不缩放（1:1 显示）。              |
| minimum-scale | 1.0                  | 允许用户的最小缩放比例。                                   |
| maximum-scale | 1.0                  | 允许用户的最大缩放比例。                                   |
| user-scalable | yes 或 no             | 是否允许用户手动缩放（no 表示禁止）                            |
| viewport-fit  | cover 或 contain      | 设置视口的适应模式。cover 表示视口会完全覆盖页面，contain 表示视口会包含页面。 |

---

“meta viewport 是移动端适配的‘基石’，它的核心作用是告诉浏览器，当前页面的宽度应该以设备的物理宽度为基准，而不是以桌面端的 980px 默认宽度为基准。”

“在没有这个标签的时候，移动端浏览器会默认在一个虚拟的‘布局视口’（通常 980px）下渲染页面，然后把页面缩小塞进手机屏幕里，所以文字会变得特别小。

加上这个标签后，浏览器会采用‘理想视口’，让 CSS 像素与设备宽度匹配，这样 1px 在手机上显示的大小就正常了，我们才能顺利地写 rem、vw 等响应式布局。”


## 追问 viewport 和 CSS 像素、DPR 的关系


## 追问其他关键的 <meta> 标签
1. 字符编码（必备）
<meta charset="UTF-8">
确保页面不出现乱码，必须放在 <head> 的最顶部（在 <title> 之前）。

2. SEO 优化（针对 C 端项目）
<meta name="description" content="页面描述"> 和 <meta name="keywords" content="关键词">
虽然百度权重降低，但在社交媒体分享时，配合 OG 协议（Open Graph）可以控制分享出去的标题、描述和缩略图，这对运营非常重要。”

## 移动端 1px 边框问题

###  方案一：rem + 动态根字体
  1. 动态根字体：根据根字体大小
  2. rem 单位：根据根字体大小，计算元素的 rem 值
缺点
  问题： 边框问题：在移动端，1px 边框在手机上显示的大小是 1px，而不是 2px
  影响其他UI元素的显示效果

###  方案二：vw/vh 纯 CSS 方案（无 JS，更优雅）
直接写基于750px 设计稿的像素值，postcss 会自动将 px 转 vw。（375px->50vw;）

默认使用vw 单位, 将750 默认为设计稿宽度，计算元素的 vw 值
```css
..box {
  width: 375px;    /* 构建后自动转成 50vw */
  height: 200px;   /* 构建后自动转成 26.67vw */
  border: 1px solid #ccc; /* 构建后自动转成 0.133vw，自动适配 DPR */
}
```

在项目中配置 postcss-px-to-viewport，写 CSS 时直接写 px，构建工具自动转成 vw：
```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 750,   // 设计稿宽度
      unitPrecision: 5,     // 转换精度
      viewportUnit: 'vw',
      minPixelValue: 1,     // 小于 1px 不转换
    }
  }
}
```

### 方案三：基于 DPR 的缩放方案（适用于活动页/大屏展示）

原理：用 JS 获取 window.devicePixelRatio，动态缩放整个页面容器。

```js
 const designWidth = 750;
  const deviceWidth = document.documentElement.clientWidth;
  const scale = deviceWidth / designWidth;
  
  const app = document.getElementById('app');
  app.style.transform = `scale(${scale})`;
  app.style.transformOrigin = 'top left';
```


缺点： 整页缩放，滚动有问题

## canvas 中的dpr问题

1. 获取canvas 的 css 逻辑像素 以及dpr
2. 设置canvas 中的 canvas 容器尺寸为 css 逻辑像素 * dpr
3. 设置canvas 的scale 为 dpr(方便绘制的时候设置)
# HTML

## HTML 语义化

语义化是使用能够表达内容含义的 HTML 标签来组织页面，例如用 `h1`-`h6` 表示标题、`p` 表示段落、`article` 表示文章、`main` 表示主要内容、`aside` 表示边栏、`nav` 表示导航。

语义化有两个主要作用：有利于搜索引擎理解页面内容，也便于人阅读和团队维护。

## HTML5 新增标签

- 文章结构：`header`、`main`、`footer`、`nav`、`section`、`article`、`figure`、`mark`。
- 多媒体和图形：`video`、`audio`、`svg`、`canvas`。
- 表单类型：`email`、`tel` 等。

## Canvas 与 SVG

Canvas 主要通过绘图上下文使用笔刷绘制二维图形；SVG 主要通过标签描述不规则的矢量图形。两者都可用于二维绘图。

SVG 的节点支持分层和事件处理，但节点过多时渲染可能变慢；Canvas 通常有更好的绘制性能，但代码组织更复杂，事件和分层能力需要额外处理或借助库实现。

## DOM 事件模型

事件传播先经过从上到下的捕获阶段，再经过从下到上的冒泡阶段。`addEventListener` 的第三个参数可以选择监听阶段，`event.stopPropagation()` 可以阻止事件继续捕获或冒泡。

## SEO

页面内部优化包括：设置合理的 `title`、`description`、`keywords`，使用语义化 HTML，为非装饰图片添加 `alt`，谨慎使用 `display: none` 隐藏重要内容，将重要内容放在 HTML 前部，并减少使用 `iframe`，因为搜索引擎通常无法直接抓取其中的内容。外部优化包括向各个搜索网站提交网站。

原笔记中的建议是：标题一般不超过 80 个字符，描述一般不超过 150 个字，关键词一般设置 3 个左右。

## 微格式

微格式是在已有、广泛采用的标准上建立的一组开放数据格式。它把语义嵌入 HTML，例如给链接增加 `rel="home page"` 等语义属性，使标签具备更明确的结构和含义。

## 替换元素与页面可见性

替换元素的内容不由 CSS 直接控制，原笔记列举了 `iframe`、`img`、`audio`、`video`。

页面可见性可以通过 `document.hidden` 和 `document.visibilityState` 判断。`visible` 表示页面处于当前激活标签且窗口未最小化；`hidden` 表示标签未激活或窗口被最小化；`prerender` 表示页面正在重新生成、用户暂时不可见。`visibilitychange` 事件用于监听状态变化。

---
title: "微前端应用"
date: "2025-05-13"
category: "学习笔记"
tags: ["JavaScript", "微前端"]
description: "微前端应用。"
---

# 微前端应用

## 微前端目前的流行库

| 框架 | single-spa | qiankun | wujie | micro-app |
|----|----|----|----|---|
| 简介 | 开源社区，微前端鼻祖 | 蚂蚁金服，基于single-spa | 腾讯，基于webcomponents和iframe | 京东，基于webcomponents |
| 应用加载 | 核心是一种运行时协议，定义了主应用如何配置微应用，从何感知微应用的加载和卸载时机 | 基于但是区别于spa加载应用的方式，他通过import-html-entry方式来加载微应用 | 基于webcomponents和iframe沙箱来实现微前端组件式加载 | 借鉴了webcomponent的思想，通过customElement 结合自定义shadowdom ，将微前端封装成一个组件，来加载微应用 |
| DOM 隔离 | 无 | 基于shandow-dom | iframe 通过proxy 的方式将DOM 劫持到shadow-dom 中 | 基于shadow-dom实现 |
| CSS 隔离 | 无 | 支持shadow dom 和scoped css | 基于 iframe 劫持和shadow-dom 实现css 隔离 | 默认scoped css 也支持shadow-dom,但是官方提示对React 支持不好，慎用 |
| 状态管理通信| 无｜ 提供了actions 全局状态管理与基于props的注入通信 | props注入基于iframe同域下的window去中心化的eventBus | window.microApp上挂载了dispatch,getData,setData等丰富的api用于通信 |



## 微前端改造遇到的技术问题

1. 对于微前端的理解
2. 资源加载机制
3. JS 沙箱隔离
4. CSS 沙箱隔离
5. 应用通信
6. 预加载
7. 其他场景问题
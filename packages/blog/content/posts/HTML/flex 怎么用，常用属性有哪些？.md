---
title: "Flex 怎么用：常用属性详解"
date: "2024-05-24"
category: "CSS学习笔记"
tags: ["CSS", "Flexbox", "布局"]
description: "通过示例梳理 Flex 容器与子元素的常用属性及布局方式。"
---

### 父容器属性（6 个，必掌握）

| 属性 | 描述 | 值 |
| --- | --- | --- |
| display | 开启 Flex 布局 | flex; |
| flex-direction| 水平方向布局 | row, row-reverse, column, column-reverse |
| align-items | 交叉轴对齐 | center, flex-start, flex-end, stretch |
| align-content | 侧轴对齐 (控制多行子元素在交叉轴上的整体对齐方式（只有 flex-wrap: wrap 且有多行时才生效）。) | center, flex-start, flex-end, space-between, space-around, space-evenly |
| justify-content | 主轴对齐 | center, flex-start, flex-end, space-between, space-around, space-evenly |
| flex-wrap | 换行 | nowrap, wrap |


### 子元素属性

| 属性 | 描述 | 值 |
| --- | --- | --- |
| flex-grow | 子元素放大比例(占剩余空间的 N 倍数) | 0, 1, 2, ... |
| flex-shrink | 子元素缩小比例(占已占空间的 N 倍数) | 0, 1, 2, ... |
| flex-basis | 子元素初始大小 | auto(根据 width/height 决定), 100px, 200px, ... |
| flex | 子元素总属性(flex-grow、flex-shrink、flex-basis 的简写) | 0 1 auto, 1 1 200px, 2 0 100px, ... |
| align-self | 单独设置子元素的交叉轴对齐方式 | center, flex-start, flex-end, stretch |
| order | 子元素排序(改变元素的布局顺序) | 0, 1, 2, ... |

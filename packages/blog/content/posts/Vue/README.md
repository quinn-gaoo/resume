---
title: "Vue 2 与 Vue 3 原理笔记"
date: "2024-03-01"
category: "Vue学习笔记"
tags: ["Vue", "Vue 2", "Vue 3", "响应式"]
description: "梳理 Vue 2/3 响应式、Computed、Watch、Diff、生命周期和组件通信等原理。"
---

# Vue

## Vue 2 响应式

Vue 2 主要通过 `Object.defineProperty` 拦截对象属性的读取和赋值。创建 Vue 实例时，会对 `data` 中的属性进行响应式处理；读取属性时通过 `Dep` 收集当前 `Watcher`，修改属性后由 `Dep` 通知相关 `Watcher` 更新。

原笔记将依赖关系概括为：每个响应式属性对应一个 `Dep`，其中保存订阅该属性的 `Watcher`；属性变化后，`Dep` 通知 `Watcher` 执行更新。

## Vue 3 响应式

Vue 3 使用 `Proxy` 拦截对象级别的读取、赋值、增加和删除操作，并使用 `Reflect` 完成默认行为。创建响应式数据的方式由 Vue 2 的 `data` 为主，扩展为 Vue 3 的 `ref` 和 `reactive`。

Vue 3 的依赖关系使用 `WeakMap + Map + Set`：`WeakMap` 的键是响应式对象，值是 `Map`；`Map` 的键是对象属性，值是 `Set`；`Set` 中保存依赖该属性的 effect 函数。

原笔记给出的 Vue 3 改动动机包括：更好的 TypeScript 支持、支持 `Tree Shaking`、使用 Composition API 提高逻辑复用能力，并通过多个应用实例避免 Vue 2 全局构造函数带来的配置污染。

## Computed 与 Watch

响应式系统通过 `track` 收集依赖、建立数据与函数的映射关系，再通过 `trigger` 在数据变化后执行关联函数。

`computed` 缓存的是上一次 getter 计算得到的值。原笔记将其不支持异步归因于设计理念和使用场景，但没有继续展开原因，因此本整理不作额外推断。

`watch` 用于监听一个或多个数据的变化，并在变化时执行用户操作。监听回调可以发送网络请求或操作 DOM 等副作用，也支持异步逻辑。

## nextTick

原笔记记录：Vue 的更新不是立刻同步到 DOM，而是先放入异步更新队列；`nextTick` 用于在 DOM 更新完成后执行回调。其实现会根据环境选择 Promise、MutationObserver、setImmediate 或 setTimeout 等异步方式。

## Vue 2 与 Vue 3 的 Diff

Diff 用于比较新旧虚拟 DOM，找出差异并尽量以最少的 DOM 操作更新页面。

Vue 2 的双端比较依次尝试：旧头与新头、旧尾与新尾、旧头与新尾、旧尾与新头；这些情况都不匹配时，再查找新头在旧节点中的位置。最后删除剩余旧节点，或创建剩余新节点。

Vue 3 先进行头头比较和尾尾比较。简单场景下，一方遍历结束后直接新增或删除剩余节点；新旧两方都有剩余时，会建立 `keyToNewIndexMap` 和 `newIndexToOldIndexMap`，判断节点的新增、复用和移动，并使用最长递增子序列减少移动操作。

## 模板与 UI 描述

Vue 使用模板描述 UI。其思路与后端模板引擎相似，在 HTML 中扩展逻辑语法，再动态填充数据。原笔记将 Vue 归为组件级框架，并与使用 JSX 描述 UI 的 React 进行了对比。

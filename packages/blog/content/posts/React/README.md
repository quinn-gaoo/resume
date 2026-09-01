---
title: "React 核心原理笔记"
date: "2024-03-15"
category: "React学习笔记"
tags: ["React", "Fiber", "虚拟DOM", "Hooks"]
description: "整理 React JSX、虚拟 DOM、Fiber、渲染流程、事件系统和 Hooks 等核心原理。"
---

# React

## JSX 与 UI 描述

React 使用 JSX 描述 UI。JSX 是类似 XML 的 JavaScript 语法扩展，经过 Babel 编译后，在 React 17 之前通常转换为 `React.createElement` 调用，React 17 之后可转换为 `react/jsx-runtime` 中的 `jsx` 调用。代码执行后得到的对象就是 React 元素。

React 的设计观点是 UI 与逻辑存在耦合，使用 JavaScript 同时表达 UI 和逻辑，可以让二者保持紧密关联。原笔记将 React 归为应用级框架。

## 虚拟 DOM

虚拟 DOM 是一种编程概念，在 JavaScript 中用对象描述 UI 层级。React 中 JSX 会生成 React 元素，原笔记也将其称为虚拟 DOM。

虚拟 DOM 的价值包括：在 JavaScript 层计算差异并尽量减少真实 DOM 修改，以及为不同宿主环境提供抽象。浏览器可使用 React DOM，原生环境可使用 React Native，Canvas、SVG 或 VML 宿主环境可使用 React ART，测试环境则可以渲染为 JavaScript 对象。

## 从 Stack 到 Fiber

React 15 之前的 Stack 架构包含协调器和渲染器。协调器通过递归执行挂载和更新，一旦开始便无法中断。大量差异计算可能长期占用 JavaScript 线程，导致页面卡顿；更新任务也没有优先级，输入等紧急任务可能被延迟。

React 16 引入 Fiber。Fiber 同时表示一种架构、一种数据结构和一个动态工作单元。每个 FiberNode 本质上是 JavaScript 对象，保存 React 元素类型、相邻 FiberNode、DOM 信息、本次更新数据、待执行工作和增删改等副作用信息。FiberNode 通过链表关联，使任务能够被拆分和调度。

## 双缓冲

React 同时维护两棵 Fiber 树：一棵对应当前真实 UI，另一棵在内存中构建下一次更新。新树构建完成后，二者交换角色，这一机制与显卡的前后缓冲区类似。

## 渲染流程

React 更新分为 Render 和 Commit 两个阶段。

Render 阶段可以中断，包含调度器和协调器：调度器为任务分配优先级，使紧急任务可以优先执行；协调器使用深度优先遍历创建并串联 FiberNode。向下的“递”阶段执行 `beginWork` 创建子 FiberNode，向上的“归”阶段执行 `completeWork` 并收集副作用。

Commit 阶段不可中断，由渲染器将副作用应用到宿主环境，分为三个子阶段：

- Before Mutation：执行 DOM 变更前的操作，类组件中包含 `getSnapshotBeforeUpdate`。
- Mutation：执行 DOM 插入、移动、更新和删除，同时处理卸载、ref 和 effect 清理。
- Layout：类组件中执行 `componentDidMount/componentDidUpdate`，函数组件中执行 `useLayoutEffect` 回调。

## Diff 与 key

协调过程中，单节点场景主要比较 `key` 和元素类型；两者相同可以复用，只匹配其一时可能删除旧节点并创建新 Fiber。多节点场景先按顺序遍历：`key` 和类型相同则复用，`key` 相同但类型不同则创建新 Fiber 并记录删除，二者都不同则结束第一轮。剩余节点再根据新旧列表情况执行删除、新增或通过 Map 查找可复用节点并移动。

原笔记中“React 和 Vue 的 key 区别”只有占位标题，没有有效内容，本整理不扩写。

## 事件系统

React 有自己的事件系统。`SyntheticEvent` 对浏览器原生事件进行封装，提供相近的 API 并兼容主流浏览器。React 还基于事件委托和 Fiber 树模拟捕获、冒泡过程，为不同事件设置优先级，并统一使用 `onXxx` 驼峰形式绑定事件。

## Hooks

原笔记记录了三种 Hooks dispatcher：`HooksDispatcherOnMount` 负责初始化并把信息挂到 FiberNode；`HooksDispatcherOnUpdate` 负责更新；`ContextOnlyDispatcher` 用于阻止开发者在函数组件外调用 Hook。

同一函数组件的 Hooks 通过链表保存。Hook 节点包含 `memoizedState`、`baseState`、`baseQueue`、`queue` 和 `next`。`useState`、`useReducer` 保存状态，`useRef` 保存 `{ current }`，`useEffect`、`useMemo`、`useCallback` 保存回调和依赖；`useContext` 不需要通过 `memoizedState` 保存数据。

原笔记列出的触发更新入口包括 `createRoot`、`setState`、`forceUpdate`、`useState` dispatcher 和 `useReducer` dispatcher。更新数据带有优先级，高优先级更新可以中断低优先级更新。

## 组件能力

原笔记列出了生命周期、父子组件通信、Redux、高阶组件和 Hooks 相对 Class 组件的优势等主题。Redux 被描述为集中管理状态，由 action 描述变化，reducer 根据旧状态和 action 生成新状态，store 负责保存状态并通知订阅者。高阶组件是接收组件并返回增强组件的函数，用于复用横切逻辑。

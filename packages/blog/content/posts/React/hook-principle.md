---
title: React Hook 原理以及实现
date: "2024-05-01"
category: React学习笔记
tags: ["React", "前端", "JavaScript"]
description: 了解 React Hook 的原理以及实现机制
---

# Hook 的原理以及实现

## hook 内部介绍
不同状态下对应的hook 函数调用也是不同的

- HookDispatcherOnMount 负责 初始化阶段
mount 阶段： 函数组件进行初始化，调用的是 mountXXX对应的函数

```javascript
const HookDispatcherOnMount = DisPatcher = {
  rendContext,
  useCallback:mountCallback,
  useEffect:mountEffect,
  useMemo:mountMemo,
  useReducer:mountReducer,
  useRef:mountRef,
  useState:mountState,
};
```

- HooksDispatcherOnUpdate 负责更新阶段
update 阶段： 函数组件进行更新，调用的是 updateXXX对应的函数

```javascript
const HookDispatcherOnMount = DisPatcher = {
  rendContext,
  useCallback:mountCallback,
  useEffect:mountEffect,
  useMemo:mountMemo,
  useReducer:mountReducer,
  useRef:mountRef,
  useState:mountState,
};
```

- ContextOnlyDispatcher 负责上下文只读操作
  - 其他情况（报错）： 调用的是 throwXXX

```javascript
const HookDispatcherOnMount = DisPatcher = {
  rendContext,
  useCallback:throwCallback,
  useEffect:throwEffect,
  useMemo:throwMemo,
  useReducer:throwReducer,
  useRef:throwRef,
  useState:throwState,
};
```

当FC 进入render 流程的时候会判断出是渲染还是更新

```javascript
  if(current !== null && current.memoizedState !== null) {
    // 更新阶段
    ReactCurrentDIspatcher.current = HooksDispatcherOnUpdate;
  } else {
    // 初始化阶段
    ReactCurrentDIspatcher.current = HookDispatcherOnMount;
  }
```

hook 的数据结构

````javascript
const hook = {
  memoizedState: null,
  baseState: null,
  baseQueue: null,
  queue: null,
  next: null,
}
```


> 注意 memoizedState 字段 ， 在fiberNode 上也有这个阶段，与Hook 对象上存储的东西不一样
>
> - FiberNode.memoizedState 保存的时候Hook 链表中第一个链表
> - Hook 对象上存储的是某个hook 的状态







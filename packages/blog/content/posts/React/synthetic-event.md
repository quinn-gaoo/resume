---
title: React 合成事件原理以及实现
date: "2024-05-01"
category: React学习笔记
tags: ["React", "前端", "JavaScript"]
description: 了解 React 合成事件的原理以及实现机制
---

# 合成事件原理以及实现

合成事件是 React 中用于处理事件的机制，它在组件之间共享事件对象，避免了事件对象的频繁创建和销毁，提高了性能。

## 为什么需要合成事件

合成事件的主要原因是性能优化。在 React 中，每个事件对象都是一个独立的实例，每次触发事件时都需要创建一个新的对象。这会导致内存泄漏和性能问题。

通过合成事件，React 能够在组件之间共享事件对象，避免了频繁创建和销毁，提高了性能。

React 通过事件委托的方式，将事件处理函数绑定到根元素上，而不是每个组件上。当事件触发时，React 会根据事件类型和目标元素，将事件处理函数调用到对应的组件上。在 fiber 可以查询到对应的绑定的事件处理函数，从而实现事件的分发。

## 事件委托流程

1. 真实 DOM 触发事件
2. 根元素通过事件委托，拿到这个事件对象
3. 根据 fiber 节点收集事件处理函数
4. 模拟捕获和冒泡流程

## 合成事件实现

### 1. SyntheticEvent 类

合成事件对象需要包装原生事件，并提供统一的 API：

```javascript
class SyntheticEvent {
  constructor(e) {
    // 保存原生事件对象
    this.nativeEvent = e;
  }

  // 合成事件对象需要提供一个和原生事件类型同名的方法阻止冒泡
  stopPropagation() {
    this._stopPropagation = true;

    if (this.nativeEvent.stopPropagation) {
      this.nativeEvent.stopPropagation();
    }
  }

  test() {}
}
```

**关键点**：
- `nativeEvent` 保存原生事件对象，方便后续访问
- `stopPropagation` 方法标记 `_stopPropagation` 为 `true`，用于控制事件流
- 同时调用原生事件的 `stopPropagation`，确保原生事件也被阻止

### 2. 事件类型名称转换

```javascript
const getTypeName = (type) => "bind" + type[0].toUpperCase() + type.slice(1);
```

这个函数将事件类型转换为自定义名称，例如：
- `click` → `bindClick`
- `change` → `bindChange`

### 3. 触发事件流

```javascript
const triggerEventFlow = (paths, type, se) => {
  for (let index = paths.length - 1; index >= 0; index--) {
    const pathNode = paths[index];
    if (!pathNode) {
      return;
    }
    const callback = pathNode[type];
    if (callback) {
      callback.call(null, se);
    }
    if (se._stopPropagation) {
      return;
    }
  }
};
```

**流程解析**：
- 从后往前遍历路径数组（模拟冒泡）
- 找到对应类型的事件处理函数并执行
- 如果检测到 `_stopPropagation` 标记，立即停止事件流

### 4. 收集事件路径

```javascript
const collectPaths = (type, beginFiber) => {
  const paths = [];

  while (beginFiber.tag !== 3) {
    const { memoizedProps, tag } = beginFiber;
    if (tag === 5) {
      // DOM 元素
      const eventHandle = memoizedProps[type];
      paths.push({
        [type]: eventHandle,
      });
    }
    beginFiber = beginFiber.return;
  }
  return paths;
};
```

**关键点**：
- `tag === 5` 表示 DOM 元素节点
- `tag === 3` 表示根节点（HostRoot）
- 从目标 fiber 向上遍历，收集所有绑定的事件处理函数
- `memoizedProps` 中存储了组件的 props，包括事件处理函数

### 5. 事件分发

```javascript
const dispatchEvent = (e, type) => {
  // 实例化合成事件对象
  const se = new SyntheticEvent(e);
  const ele = e.target;

  // 找到目标元素的 fiber 节点
  let fiber;
  for (const prop in ele) {
    if (prop.toLocaleLowerCase().includes("fiber")) {
      fiber = ele[prop];
    }
  }

  // 收集事件路径
  const paths = collectPaths(type, fiber);

  // 模拟捕获
  triggerEventFlow(paths, type + "Capture", se);

  // 模拟冒泡
  if (!se._stopPropagation) {
    triggerEventFlow(paths.reverse(), se);
  }
};
```

**流程解析**：
1. 创建合成事件对象 `se`
2. 从 `e.target` 找到对应的 fiber 节点（DOM 元素上会有 `__reactFiber$xxx` 属性）
3. 收集从目标到根的事件处理函数路径
4. 先执行捕获阶段（`type + "Capture"`）
5. 如果没有阻止冒泡，再执行冒泡阶段（`paths.reverse()`）

### 6. 添加事件监听

```javascript
// 用于根元素绑定事件，自定义事件以 bindClick 为例
export const addEvent = (container, type) => {
  container.addEventListener(type, (e) => {
    // 事件收集
    dispatchEvent(e, getTypeName(type));
  });
};
```

**使用示例**：

```javascript
// 在根元素上绑定点击事件委托
addEvent(document.getElementById('root'), 'click');
```

## 完整流程图

```
用户点击按钮
    ↓
原生事件触发 (click)
    ↓
根元素事件委托捕获
    ↓
dispatchEvent 处理
    ↓
创建 SyntheticEvent
    ↓
找到目标 fiber 节点
    ↓
collectPaths 收集事件路径
    ↓
triggerEventFlow (捕获阶段)
    ↓
triggerEventFlow (冒泡阶段)
    ↓
执行用户定义的事件处理函数
```

## Fiber Tag 类型说明

| Tag | 类型 | 说明 |
|-----|------|------|
| 3 | HostRoot | 根节点 |
| 5 | HostComponent | DOM 元素 |
| 1 | FunctionComponent | 函数组件 |
| 2 | ClassComponent | 类组件 |

## 总结

React 合成事件的核心思想是：

1. **事件委托**：将所有事件绑定到根元素，减少内存占用
2. **事件收集**：通过 fiber 树向上遍历，收集所有事件处理函数
3. **模拟事件流**：按照捕获 → 冒泡的顺序执行事件处理函数
4. **合成事件对象**：包装原生事件，提供统一的 API

这种设计使得 React 能够高效地管理事件，同时保持与原生事件行为的兼容性。

---

> **参考**：React 源码中的事件系统实现，理解 fiber 树结构和事件委托机制是掌握 React 事件处理的关键。
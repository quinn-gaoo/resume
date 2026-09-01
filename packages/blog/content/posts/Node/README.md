---
title: "Node.js Event Loop"
date: "2024-03-29"
category: "Node.js"
tags: ["Node.js", "Event Loop", "异步编程"]
description: "梳理 Node.js Event Loop 的阶段划分，以及 process.nextTick 与微任务执行时机。"
---

# Node.js Event Loop

## Event Loop 阶段

原笔记将 Node.js Event Loop 分为六个阶段：

1. Timers：执行 `setTimeout` 和 `setInterval` 回调。
2. I/O callbacks：处理上一轮循环中少量未执行的 I/O 回调。
3. Idle、prepare：仅供 Node.js 内部使用。
4. Poll：轮询并处理文件、网络等 I/O 事件；如果定时器即将到期或存在 `setImmediate` 任务，会离开该阶段。
5. Check：执行 `setImmediate` 回调。
6. Close callbacks：执行 socket 等对象的 `close` 事件回调。

Event Loop 就是持续循环处理这些阶段和任务。

## process.nextTick 与微任务

原笔记记录：Node.js 11 之前，`process.nextTick` 回调在每个阶段末尾集中执行；Node.js 11 之后，会在阶段内的任务间隙执行，以接近浏览器的行为。

浏览器中的任务包括脚本和 `setTimeout`，微任务包括 `Promise.then`、`queueMicrotask` 和 `MutationObserver`。原笔记也把 `Proxy` 列入了微任务，但没有给出说明，因此本整理不沿用这一条。

关于 `Promise.resolve().then(fn)` 的执行，原笔记只说明需要结合 Promise 的具体实现和 `process.nextTick` 理解，没有继续展开结论。

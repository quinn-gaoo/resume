---
title: "Promise详解"
date: "2023-05-11"
category: "学习笔记"
tags: \["javascript", "Promise"]
description: "深入理解Promise的原理、实现和应用场景。"
---

# Promise 详解

## Promise 规范

_规范_： Promise 是一套专门处理异步场景的规范，它能有效的避免回调地狱的产生，使用异步代码更加清晰，简洁，统一。

这套规范最早诞生于前端社区， 规范名称为 **[Promise A+](https://promisesaplus.com/)**

Promise A+ 规定

1. 所有的异步场景，都可以看做一个异步任务，每个异步任务，在JS中应该表现为一个*对象*
2. 每个任务对象都应该有两个阶段和三个状态
   - 阶段：未决状态（unsettled）、已决状态（settled）
   - 状态：挂起状态（pending）、成功状态（fulfilled）、失败状态（rejected）
3. 状态流转
   - 挂起->成功 称为resolve;可能有一个相关的数据
   - 挂起->失败 称为reject; 可能有一个失败的原因
4. 可以针对任务进行后续处理，针对完成的后续处理称之为 onFulfilled ，针对失败的后续处理称之为 onRejected

## Promise API

ES6 提供了一套API, 实现了 Promise A+ 规范

### catch方法

`.catch(onRejected)` === `.then(null,onRejected)`

`.then(onFulfilled,onRejected)` === `.then(onFulfilled).catch(onRejected)`

### 链式调用

1. then方法 必定会返回一个新的Promise对象，也可以理解后续处理也是一个任务
2. 新任务的状态取决于后续处理的结果
   - 没有相关的后续处理， 新任务的状态和前任务的状态一致，数据为前任务的数据
   - 如果有后续处理，但是后续处理还没有执行，则新任务挂在状态
     - 后续处理执行完成后，新任务的状态和数据会根据后续处理的结果而改变
     - 后续处理失败，新任务的状态为失败状态，数据为后续处理的失败原因
     - 后续执行返回一个新的Promise对象，新任务的状态和数据会根据后续处理的结果而改变

### 静态方法

<br />

| 方法                         | 描述                                                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise.resolve(data)        | 将一个成功状态的Promise对象返回                                                                                                                    |
| Promise.reject(reason)       | 将一个失败状态的Promise对象返回                                                                                                                    |
| Promise.all(任务数组)        | 返回一个任务，任务数组全部成功则成功,数据为数组，任何一个失败则失败                                                                                |
| Promise.any(任务数组)        | 返回一个任务，任务数组任意一个成功则成功,数据为成功的任务数据，全部失败则失败                                                                      |
| Promise.allSettled(任务数组) | 将多个Promise对象包装成一个新的Promise对象，当所有Promise对象都成功时，新的Promise对象也成功，当任意一个Promise对象失败时，新的Promise对象也失败   |
| Promise.race(任务数组)       | 将多个Promise对象包装成一个新的Promise对象，当任意一个Promise对象成功时，新的Promise对象也成功，当任意一个Promise对象失败时，新的Promise对象也失败 |

<br />

<br />

<br />

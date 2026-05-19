---
title: "Promise详解"
date: "2023-05-11"
category: "学习笔记"
tags: ["javascript", "Promise"]
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

| 方法                   | 描述                                                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Promise.resolve(data)  | 将一个成功状态的Promise对象返回                                                                                                     |
| Promise.reject(reason) | 将一个失败状态的Promise对象返回                                                                                                     |
| Promise.all([])        | 返回一个任务数组，<br>全部成功则成功,数据为数组<br>任何一个失败则失败,数据为失败的任务数据                                          |
| Promise.any([])        | 任一成功 → 该成功值 <br> 全部失败报错提示 `AggregateError: All promises were rejected`                                              |
| Promise.allSettled([]) | 全部完成（不论成功/失败） 返回数据格式 <br> `[{"status": "rejected","reason": 1},{"status": "fulfilled","value": 2}]` ,没有失败情况 |
| Promise.race([])       | 返回最先处理好的任务，状态为最先                                                                                                    |

### 消除回调

有了Promise 异步任务有了统一的处理方式
有了统一的处理方式，ES官方就可以对其进一步优化
ES7 提供了 async/await 语法糖，进一步简化了异步代码的编写
`async` 函数的返回值是一个 Promise 对象，`await` 关键字 后面的表达式，必须是一个 Promise 对象，否则会报错

## 练习题

1. 练习1

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```

> 1 2 3 4

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    resolve();
    console.log(3);
  }, 0);
});

promise.then(() => {
  console.log(4);
});
console.log(5);
```

> 1 5 2 3 4

2. 练习2

```javascript
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => console.log(res));

Promise.resolve()
  .then(() => console.log(1))
  .then(() => console.log(2))
  .then(() => console.log(3))

  .then(() => console.log(5))
  .then(() => console.log(6));
```

> 0, 1, 2, 3, 4, 5, 6

```javascript
async function m() {
  const n = await 1;
  console.log(n);
}
m();
console.log(2);
```

> 2, 1

```javascript
async function m() {
  console.log(0);
  const n = await 1;
  console.log(n);
}
(async () => {
  await m();
  console.log(2);
})();
console.log(3);
```

> 0, 3, 1, 2

```javascript
async function m1() {
  return 1;
}
async function m2() {
  const n = await m1();
  console.log(n);
  return 2;
}
async function m3() {
  const n = m2();
  console.log(n);
  return 3;
}
m3().then((n) => console.log(n));
m3();
console.log(4);
```

> promise:pending, promise:pending, 4, 1, 3, 1

```javascript
var a;
var b = new Promise((resolve) => {
  console.log("promise1");
  setTimeout(() => {
    resolve();
  }, 1000);
})
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  })
  .then(() => {
    console.log("promise4");
  });

a = new Promise(async (resolve) => {
  console.log(a);
  await b;
  console.log(a);
  console.log("after1");
  await a;
  resolve(true);
  console.log("after2");
});
console.log("end");
```

> promise1, undefined, end, promise2, promise3, promise4, promise:pending

```javascript
async function m1() {
  return 1;
}
async function m2() {
  const n = await m1();
  console.log(n);
  return 2;
}
async function m3() {
  const n = await m2();
  console.log(n);
  return 3;
}
m3().then((n) => console.log(n));
m3();
console.log(4);
```

> 4,1, 1, 2, 2, 3

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
async1();
new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});
console.log("script end");
```

> script start , async1 start , async2 , promise1 script end, async1 end, promise2 setTimeout

---
title: "JavaScript闭包深入理解"
date: "2025-05-13"
category: "学习笔记"
tags: ["JavaScript", "闭包", "作用域"]
description: "深入理解JavaScript闭包的概念、原理和应用场景。"
---

# JavaScript闭包深入理解

## 什么是闭包

**闭包（Closure）** 是指函数能够记住并访问其词法作用域，即使该函数在其词法作用域之外执行。

## 闭包的形成条件

1. 函数嵌套
2. 内部函数引用外部函数的变量
3. 内部函数被外部引用

```javascript
function outer() {
  const outerVar = '外部变量';
  
  function inner() {
    console.log(outerVar); // inner函数可以访问outerVar
  }
  
  return inner;
}

const innerFunc = outer();
innerFunc(); // 输出: 外部变量
```

## 闭包的应用场景

### 1. 数据私有化

```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
```

### 2. 函数柯里化

```javascript
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 3. 模块化

```javascript
const module = (function() {
  const privateVar = '私有变量';
  
  function privateMethod() {
    return privateVar;
  }
  
  return {
    publicMethod() {
      return privateMethod();
    }
  };
})();

console.log(module.publicMethod()); // 私有变量
console.log(module.privateVar); // undefined
```

## 闭包与内存管理

闭包会导致外部函数的作用域不会被垃圾回收，因为内部函数仍然引用着它。

```javascript
function createHeavyObject() {
  const heavyData = new Array(1000000).fill('data');
  
  return function() {
    return heavyData.length;
  };
}

const getLength = createHeavyObject();
// heavyData 仍然被引用，不会被回收
```

**注意**：合理使用闭包，避免不必要的内存泄漏。

## 总结

闭包是JavaScript中非常重要的概念，掌握它对于理解作用域、模块化和函数式编程都非常有帮助。
---
title: "TypeScript 类型系统详解"
date: "2024-10-04"
category: "TypeScript"
tags: ["TypeScript", "类型系统", "泛型", "类型安全"]
description: "从类型分类、类型操作到类型安全和编译流程，记录 TypeScript 学习要点。"
---

# TypeScript

## 类型理解

### 类型的分类

  - JS 已有的类型

    - 原始类型

      - number

      - string

      - boolean

      - null / undefined

      - bigint

    - 复合类型

      - object

        - 数组

        - 普通对象

        - 函数

        - 内置对象

          - Date

          - Regexp

          - Error object

          - 集合

          - promise

          - proxy

  - TS 新增的类型

    - any

    - void

    - unknown

    - never

    - 类型别名 （Type Aliases）

    - 元组（Tuples）

    - 联合类型（Union types）

      - 使用操作符号｜
const x : string|number = 1

    - 交叉类型（IntersectionTypes）

    - 字面量类型

      - const b = "Hello'
let d: "hello"

    - 对象字面量类型

    - 接口（Interface）

    - 泛型（Generices）

    - 枚举（Enums）

    - Unique symbol

    - 模版字符串类型

    - 索引签名（index signatures）

    - 映射类型 （mapped Types）

    - 条件类型

### 类型的操作关键字

  - typeof

  - instanceof

  - 类型断言

    - <Type> 和an Type

  - readonly

  - keyof

  - in

  - 方括号[]

  - 条件运算符

    - extends z ? y:x

  - is

  - infer

  - ?

  - &

  - |

### 类型安全

  - 概念： 借助类型避免程序做出无效的事情

    - 无效是可以指运行时异常，也可以是更严重的程序崩溃，也可以是是无异常，但是做事情没有意义

### 编译器

  - 编译器解析步骤

    - 1. 把程序解析成AST

    - 2. 把AST 编译成字节码

    - 3. 运行时计算字节码

  - TS 不直接编译成字节吗， 而是编译成javascript

### 类型检查

  - 类型检查时为了保证类型安全

  - 类型检查器

    - 概念： 检查代码是否符合类型安全要求的特殊程序

  - TS 编译过程

    - 1. Typescript 源码  -> Typescript AST

    - 2. 类型检查器检查AST

    - 3. Typescript AST -> Javascript 源码

    - 4. JS 源码 -> JS AST

    - 5. JS AST -> 字节码

    - 6. 运行时计算字节码

  - 类型只会在类型检查中使用

    - 程序中的类型对程序生成的输出没有任何影响

    - 这个特性确保我们可以随便的改进程序中的类型，而无需担心会破坏应用的逻辑功能

## 函数与泛型

## 类型编程

## 类和接口

## 装饰器

## 工程化

## 注意点

### 全局变量问题

  - TS 在默认情况下做出如下假设

    - 默认当前环境时DOM环境中

    - 如果代码中没有模块化，默认代码是全局执行的，所以变量都是全局变量

## tsconfig.json

### compilerOptions

  - 生成Emit

    - outDir

      - 指定输出目录，如果没配置，默认和对应ts文件同目录

    - noEmit

      - 不输入文件，即编译后不会生成任何js文件

    - declaration

      - 生成类型声明文件.d.ts

    - emitDeclarationOnly

      - 只生成.d.ts文件，不生成.js 文件

    - removeComments

      - 在编译后的。js文件中删除注释

### 其他

  - include

    - 指定需要编译的文件或者目录

    - 默认： **/*

  - exclude

    - 指定编译器需要排出的文件，文件夹

    - 默认会排出
node_modules

  - files

  - extends

  - references

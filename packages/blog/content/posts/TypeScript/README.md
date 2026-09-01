---
title: "TypeScript 类型系统笔记"
date: "2024-02-16"
category: "TypeScript"
tags: ["TypeScript", "类型系统", "类型安全"]
description: "整理 TypeScript 类型分类、类型操作、类型安全、编译流程和配置相关知识。"
---

# TypeScript

## 类型分类

TypeScript 包含 JavaScript 已有的原始类型（`number`、`string`、`boolean`、`null`、`undefined`、`bigint`）和复合类型（对象、数组、函数、内置对象等），还增加了 `any`、`void`、`unknown`、`never`、元组、联合类型、交叉类型、字面量类型、接口、泛型、枚举、`unique symbol`、模板字符串类型、索引签名、映射类型和条件类型。

## 类型操作与类型安全

常见类型操作关键字和语法包括 `typeof`、`instanceof`、类型断言、`readonly`、`keyof`、`in`、索引访问 `[]`、条件类型 `extends ? :`、类型谓词 `is`、`infer`、可选属性 `?`、交叉类型 `&` 和联合类型 `|`。

类型安全是借助类型系统避免程序执行无效操作。无效操作可能导致运行时异常、程序崩溃，或虽然没有异常但结果没有意义。

## 编译与类型检查

编译器通常先把程序解析为 AST，再编译为字节码，最后由运行时执行。TypeScript 不直接生成字节码，而是先生成 JavaScript。

TypeScript 的处理过程是：TypeScript 源码生成 TypeScript AST；类型检查器检查 AST；AST 生成 JavaScript 源码；JavaScript 再经过 JavaScript AST 和字节码阶段执行。类型只用于类型检查，不会影响生成的 JavaScript，因此可以改进类型而不改变运行时逻辑。

## 工程配置

原笔记中 `tsconfig.json` 的 `compilerOptions` 包括：

- `outDir`：指定输出目录，未配置时通常与源文件同目录。
- `noEmit`：只检查不生成文件。
- `declaration`：生成 `.d.ts` 类型声明文件。
- `emitDeclarationOnly`：只生成声明文件，不生成 `.js`。
- `removeComments`：删除编译后 JavaScript 中的注释。

其他常见配置有 `include`（指定编译文件或目录，默认匹配 `**/*`）、`exclude`（指定排除文件，默认排除 `node_modules`）、`files`、`extends` 和 `references`。

## 注意点

TypeScript 默认假设代码运行在 DOM 环境中。如果代码没有模块化，编译器会按全局脚本理解，变量可能进入全局作用域。

原始笔记还预留了函数与泛型、类型编程、类和接口、装饰器、工程化等标题，但没有提供具体内容，本整理不对这些标题进行扩写。

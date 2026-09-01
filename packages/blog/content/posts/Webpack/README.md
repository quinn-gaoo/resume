---
title: "Webpack 构建工具笔记"
date: "2024-06-21"
category: "Webpack"
tags: ["Webpack", "构建工具", "Loader", "Plugin"]
description: "整理 Webpack 配置、Source Map、编译流程、Loader、Plugin 和模块打包知识。"
---

# Webpack

## 基础配置

Webpack 参数可以放在命令行，也可以写入默认的 `webpack.config.js`，并通过 `--config` 指定其他配置文件。配置文件使用 CommonJS 导出对象；原笔记指出，命令行与配置文件冲突时以命令行为准。

常见配置包括：

- `mode`：`development` 或 `production`。
- `entry`：指定入口文件和 chunk 名称。
- `output`：通过 `path`、`filename` 等配置输出；文件名可使用 chunk 名和 Hash。
- `target`：指定 `web` 或 `node` 等构建目标。
- `module.noParse`：通过正则指定不解析的模块。
- `devtool`：配置 Source Map，例如 `eval`、`source-map`。
- `resolve.modules`：指定模块查找目录。
- `resolve.extensions`：指定默认扩展名。
- `resolve.alias`：配置别名。
- `externals`：排除不需要打包的外部依赖。

## Source Map

工程化代码通常会经过合并、压缩和转换，实际运行代码不便直接调试。Source Map 记录转换后代码与源代码之间的映射关系。打包文件末尾通过 `sourceMappingURL` 指向 `.map` 文件，浏览器可据此显示源代码中的错误位置。

原笔记建议在开发环境把 Source Map 作为调试手段，生产环境谨慎公开，因为 Map 文件可能体积较大，也可能暴露源代码。

## 编译过程

Webpack 先合并 CLI 参数、配置文件和默认配置，生成最终配置。随后为入口创建 chunk。Chunk 表示从某个入口找到的所有依赖集合，具有名称和唯一 ID。

构建依赖时，Webpack 读取模块内容、匹配 Loader、生成 AST、记录依赖、替换依赖引用并保存转换后的模块代码。每个 chunk 最终生成资产列表，并根据内容生成 chunk Hash；多个 chunk 资产合并后生成总体构建结果。

## Loader

Loader 本质上是函数，接收源码内容并返回转换后的源码。Loader 在 `module.rules` 中通过 `test` 匹配文件，通过 `use` 指定 Loader 和 `options`。原笔记还记录了查询参数传参，以及通过导出函数的 `raw` 属性表示是否接收原始数据。

## Plugin

Loader 主要负责代码转换，而生成额外文件、监听编译启动等需要嵌入编译流程的功能由 Plugin 完成。Plugin 通常定义一个带 `apply(compiler)` 方法的类，在初始化创建 `compiler` 后执行，并通过 `compiler.hooks` 注册对应编译阶段的逻辑。配置时把 Plugin 实例放入 `plugins` 数组。

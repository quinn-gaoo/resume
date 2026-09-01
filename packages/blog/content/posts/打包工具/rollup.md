---
title: "Rollup 常见插件与配置"
date: "2024-06-28"
category: "打包工具"
tags: ["Rollup", "JavaScript", "构建工具", "插件"]
description: "记录 Rollup 常见插件的作用及其在模块解析、CommonJS 和 Babel 转换中的使用。"
---

## 常见插件

### @rollup/plugin-node-resolve

rollup 是不认识 node_modules 目录下的模块的，需要使用这个插件来识别。

### @rollup/plugin-commonjs
rollup 是不认识 commonjs 模块的，需要使用这个插件来识别。

### @rollup/plugin-babel
 使用babel 将 es6 语法转换为 es5 语法

```js
{
  plugins: [
    babel({babelHelpers:"bundled"})
  ]
}
```

还需要增加babel 的预设
安装 babel-core 和 env
```shell
pnpm add @babel/core @babel/preset-env -D
```
然后在babel 配置文件中增加预设

```js
<!-- .babelrc.json -->
{
  "presets": [
    "@babel/preset-env"
  ]
}
```
babel 只是做一些语法的转换，将let const 转为var
但是还需要对一些内置对象实例方法api 进行转换, 需要一些polyfill 来支持.所以需要接下里的babel/runtime来处理

`@babel/runtime` 是一个核心，一种实现方式，但是在实现polyfill 时，可能会产生很多重复代码，所以需要 `@babel/plugin-transform-runtime` 防止全局污染。抽离共工的helper function， 防止冗余，当然在处理polyfill 时，我们还需要借助 babel-js 的辅助，基于babel,我们可以使用 `@babel/runtime-corejs3` 

###  

```js
// rollup.config.js
{
  plugins: [
    babel({
      babelHelpers:"runtime",
      include:"src/**",
      exclude:"node_modules/**",
      extensions:['.js',"ts"]
      })
  ]
}
```

```js
<!-- .babelrc.json -->
{
  "presets": [
    "@babel/preset-env",
    {
      targets:"> 0.25%, not dead",
      useBuiltIns: "usage",
      corejs: 3
    }
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    {
      corejs: 3
    }
  ]
}


### 支持 typescript

```shell
pnpm add typescript tslib @rollup/plugin-typescript -D

```

```js
// ts.config.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "lib": ["dom","dom.iterable","esnext"],
    "skipLibCheck": true,
    "nodeResolutionMode": "bundler",
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "isolatedModules": true
  },
  include: ["src/**/*"]
 }
```

  // include: ["src/**/*", "rollup.config.ts"]
如果rollup 使用ts文件的话，运行时需要在命令中增加配置

```shell
rollup -c --config rollup.config.ts --configPlugin typescript
```



react 常见项目配置安装
```shell
#  react 依赖
pnpm add react react-dom

# rollup
pnpm add rollup -D

# rollup 常规插件
pnpm add -D @rollup/plugin-node-resolve @rollup/plugin-commonjs 

# typescript 相关
pnpm add typescript tslib @rollup/plugin-typescript -D

#  types 
pnpm add -D @types/react @types/react-dom

# rollup/plugin-babel
pnpm add @rollup/plugin-babel @babel/core @babel/preset-env -D

#babel/runtime 语法兼容
pnpm add @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs3 -D

#  react 的babel 预设
pnpm add @babel/preset-react -D

# html 模版
pnpm add rollup-plugin-generate-html-template -D

# 替换字符串
pnpm add @rollup/plugin-replace -D

# 开发服务/live server
pnpm add rollup-plugin-serve rollup-plugin-livereload -D

# clear 插件
pnpm add rollup-plugin-clear -D

# scss 插件
pnpm add sass rollup-plugin-scss -D

# postcss 插件
pnpm add postcss rollup-plugin-postcss -D

# 图片处理
pnpm add @rollup/plugin-image -D

# node types
pnpm add @types/node -D

# 别名
pnpm add @rollup/plugin-alias -D


```

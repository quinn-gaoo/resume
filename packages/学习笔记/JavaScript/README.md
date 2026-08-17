# JavaScript

## 变量、类型与作用域

`var` 没有块级作用域，存在变量提升，未初始化时为 `undefined`，同一作用域可以重复声明；全局 `var` 变量会挂载到 `window`。`let` 和 `const` 有块级作用域，不允许同一作用域重复声明，并存在暂时性死区；`const` 还要求声明时初始化且不能重新赋值。

JavaScript 数据类型包括 `null`、`undefined`、`boolean`、`string`、`number`、`object`、`bigint` 和 `symbol`。`number` 使用双精度浮点数表示。常见判断方式是 `typeof`、`instanceof` 和 `Object.prototype.toString.call(value)`。

JavaScript 数字遵循 IEEE 754 浮点数表示，由符号位、指数位和尾数组成，因此可能出现 `0.1 + 0.2` 的精度问题。原笔记列出的处理库有 `math.js`、`decimal.js` 和 `big.js`。

作用域包括全局作用域、模块作用域、函数作用域和 ES6 的块级作用域。`async` 脚本加载完成后立即执行，`defer` 脚本在 DOM 准备好后、`DOMContentLoaded` 之前执行。

## 原型、this、new 与继承

每个函数都有 `prototype` 对象，其 `constructor` 指向函数自身，实例可以通过原型链访问共享属性和方法。原型链在 ES6 `class` 出现之前用于实现继承，但原笔记指出它不支持真正的私有属性。

`this` 可以理解为调用 `call` 时传入的第一个参数。例如 `a.fn()` 的调用效果可类比为 `a.fn.call(a)`。`new` 的过程包括：创建临时对象、绑定构造函数原型、将 `this` 指向临时对象、执行构造函数，并根据构造函数返回值决定最终返回临时对象还是显式返回的对象。`Object.create` 主要负责创建对象并绑定原型。

JavaScript 可以用构造函数加 `prototype` 定义类，也可以使用 `class`。继承可以通过构造函数组合原型链实现，也可以通过 `extends` 和 `super` 实现。

`instanceof` 会沿左侧对象的原型链查找右侧构造函数的 `prototype`，直到找到或到达 `null`。相等运算的隐式转换中，字符串和数字会转为数字，布尔值会转为数字，对象会先尝试 `valueOf()`，再尝试 `toString()` 转为原始值。

## 函数与闭包

立即执行函数是声明匿名函数并立即调用，主要用于创建局部作用域。闭包可以概括为“函数加自由变量”，可避免污染全局、提供局部变量访问器并延长变量生命周期；使用不当可能造成内存泄漏。

箭头函数没有自己的 `this` 和 `arguments`，不能作为构造函数使用，`this` 继承自外层作用域。纯函数的返回值只依赖参数，执行时不产生改变外部状态的副作用。

## 浏览器线程、尺寸与事件

浏览器内核涉及 GUI 渲染线程、JavaScript 引擎线程、定时器触发线程、事件触发线程和异步 HTTP 请求线程。GUI 线程与 JS 引擎线程互斥，长时间执行 JavaScript 会阻塞页面渲染。

DOM 尺寸和位置属性包括：`clientWidth/clientHeight`（内容加内边距）、`offsetWidth/offsetHeight`（内容、内边距和边框）、`clientTop/clientLeft`（边框宽度）、`offsetTop/offsetLeft`（相对最近定位祖先的位置）、`scrollWidth/scrollHeight`（滚动区域尺寸）以及可读写的 `scrollTop/scrollLeft`。事件对象中，`clientX/Y` 相对浏览器可视区，`screenX/Y` 相对整个屏幕，`offsetX/Y` 相对目标元素，`pageX/Y` 相对页面。

事件委托利用冒泡机制在父元素上统一监听，可以减少监听器并支持动态元素；`target` 是实际触发事件的元素，`currentTarget` 是注册监听器的元素。

## 常见手写题

### 防抖与节流

节流是在触发后的一段时间内不再执行，适合限制连续事件的执行频率。防抖是在触发后延迟执行，如果延迟期间再次触发就重新计时，适合搜索输入等场景。

### 深拷贝与数组去重

`JSON.parse(JSON.stringify(obj))` 可以实现简单深拷贝，但不支持 `Date`、正则、`undefined` 和函数。递归实现需要区分数组、日期、正则和函数，并使用 `WeakMap` 处理循环引用。数组去重可以使用 `Set` 配合展开运算符或 `Array.from`。

### AJAX、Promise 与发布订阅

原笔记使用 `XMLHttpRequest` 的 `readyState` 和状态码判断 AJAX 成功或失败。手写 Promise 时需要维护 pending、fulfilled、rejected 状态，异步执行处理函数，并实现 `then`、`catch`、`finally`、`resolve`、`reject`、`all`、`allSettled` 和 `race` 等方法；`Promise.all` 在全部成功时按输入顺序返回结果，任意一个失败则失败。

发布订阅模式通过事件名维护回调队列，提供 `on`、`emit` 和 `off` 操作。

### 拖拽

拖拽需要记录鼠标按下时的位置，在移动时计算偏移量，并更新元素位置。原笔记建议监听范围不要局限于元素本身，不使用较难控制的原生 `drag` 事件，并优先使用 `transform`，避免频繁修改 `top` 引起回流。

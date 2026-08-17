# HTTP 基础

## GET 与 POST

GET 通常用于读取资源，具有幂等语义；POST 通常用于提交数据并产生写操作。GET 参数一般放在 URL 中，POST 数据一般放在请求体中。浏览器和服务器会限制 URL 长度，而这一限制不是 HTTP 协议本身规定的。

GET 参数直接出现在 URL 中，不适合传递敏感信息；POST 也不等于安全，真正的传输安全仍依赖 HTTPS。GET 响应更容易被缓存、保存为书签，使用 POST 打开的页面在刷新时通常会提示重新提交。

## 常见请求方法

- `GET`：获取资源，业务数据通常放在请求行。
- `POST`：提交资源，业务数据通常放在请求体。
- `PUT`：修改服务器数据，业务数据通常放在请求体。
- `DELETE`：删除服务器数据。
- `OPTIONS`：可用于跨域预检。
- `TRACE`：用于测试和诊断。

原笔记列出了 `CONNECT`，但没有记录其具体含义，本整理不作扩写。

## HTTP 缓存

强缓存命中后，浏览器直接使用本地缓存，不向服务器发送请求。HTTP/1.1 常用 `Cache-Control: max-age`；HTTP/1.0 常用 `Expires`，它依赖本地时间，修改系统时间可能影响判断。

协商缓存会向服务器确认资源是否变化。HTTP/1.1 常通过 `ETag` 和 `If-None-Match`；HTTP/1.0 常通过 `Last-Modified` 和 `If-Modified-Since`。资源未变化时服务器可返回 `304`，变化时返回新内容。时间方式还存在一秒内多次修改难以区分的问题。

## HTTP/1 与 HTTP/2

原笔记记录的 HTTP/2 变化包括：使用二进制分帧、多路复用、头部压缩和服务器推送。HTTP/1 中浏览器通常通过多个 TCP 连接并行请求；HTTP/2 可在一个 TCP 连接上并行传输多个流，减少连接开销，并通过头部压缩降低重复头信息的体积。

## HTTP 与 HTTPS

HTTP 以明文传输，HTTPS 在 HTTP 与 TCP 之间增加 SSL/TLS 加密。SSL 是 Secure Sockets Layer，TLS 是 Transport Layer Security，TLS 是 SSL 的升级版本；HTTPS 是建立在 SSL/TLS 安全通道上的 HTTP。

原笔记记录：HTTPS 可以通过证书验证服务器身份，并使用加密信道传输数据；在 SSL/TLS 握手期间还会协商是否使用 HTTP/2。

## TCP 三次握手与四次挥手

三次握手用于建立可靠的 TCP 连接：客户端发起连接，服务器确认并回应，客户端再次确认。四次挥手用于双方分别关闭发送方向，因此通常需要四次报文交互。

## 浏览器存储

原笔记比较了 Cookie、LocalStorage、SessionStorage 和 IndexedDB：Cookie 会随请求发送给服务器，容量较小；LocalStorage 持久保存在本地；SessionStorage 以页面会话为范围；IndexedDB 用于保存更大量的结构化数据。

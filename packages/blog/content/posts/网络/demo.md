---
title: "网络和协议"
date: "2025-05-06"
category: "网络"
tags: ["网络分层", "应用协议"]
description: "这是一个网络协议的文章。"
---

# 网络协议

理解网络分层和应用协议。

## 网络分层模型

### TCP/IP四层模型

| 层         | 协议                   | 功能             |
| ---------- | ---------------------- | ---------------- |
| 应用层     | HTTP, HTTPS            | 提供应用服务     |
| 传输层     | TCP, UDP               | 提供数据传输     |
| 网络层     | IP, ICMP,路由器        | 提供路由选择     |
| 物理链路层 | Ethernet, Wi-Fi,交换机 | 提供数据链路服务 |

### TCP/IP五层模型

| 层         | 协议                   | 功能             |
| ---------- | ---------------------- | ---------------- |
| 应用层     | HTTP, HTTPS            | 提供应用服务     |
| 传输层     | TCP, UDP               | 提供数据传输     |
| 网络层     | IP, ICMP,路由器        | 提供路由选择     |
| 数据链路层 | Ethernet, Wi-Fi,交换机 | 提供数据链路服务 |
| 物理层     | 以太网, Wi-Fi          | 提供物理传输     |

### OSI七层模型（参考）

| 层         | 协议                                           | 功能             |
| ---------- | ---------------------------------------------- | ---------------- |
| 应用层     | 应用程序, 会话, 表示, 解密, 加密, 压缩, 解压缩 | 提供应用服务     |
| 表示层     | 数据, 文本, 图像, 音频, 视频                   | 提供数据表示     |
| 会话层     | 会话管理, 协议转换, 数据压缩                   | 提供会话管理     |
| 传输层     | TCP, UDP                                       | 提供数据传输     |
| 网络层     | IP, ICMP,路由器                                | 提供路由选择     |
| 数据链路层 | Ethernet, Wi-Fi,交换机                         | 提供数据链路服务 |
| 物理层     | 以太网, Wi-Fi                                  | 提供物理传输     |

## 应用协议

### HTTP

### URL

统一资源定位符，用于定位网络服务

http://a.com:80/news/detail?id=1234567890#h1

http: schema
a.com: domain
80: port
news/detail: path
id=1234567890: query
#h1: hash

包含一些细节：

> - 当协议是http时，默认端口号是80
> - 当协议是https时，默认端口号是443
> - schema,domain,path 是必填项

### HTTP

#### 传递消息的模式

请求-响应模式

#### 传递消息的格式

HTTP的消息格式是纯文本，文本分为三个部分

> - 请求行
> - 请求头
> - 空行
> - 请求体

```
GET /news/detail?id=1234567890 HTTP/1.1
Host: a.com:80
Content-Type: application/x-www-form-urlencoded


```

##### 请求行

> - 请求方法
> - 请求方法的取值有GET, POST, PUT, DELETE, OPTIONS, TRACE, CONNECT

> - 请求路径
> - 请求路径的取值是资源的路径，例如/news/detail?id=1234567890

> - HTTP版本
> - HTTP版本的取值有HTTP/1.0, HTTP/1.1, HTTP/2.0

##### 请求头

> - Host(request header)
> - Content-Type
>   请求体的媒体类型，例如`application/x-www-form-urlencoded`, `application/json`，`multipart/form-data; boundary=aaa`等

---
title: "Web3 钱包连接与生态"
date: "2024-09-06"
category: "Web3"
tags: ["Web3", "DApp", "钱包", "以太坊"]
description: "记录 DApp 钱包连接方式，以及 EIP-1193、EIP-6963 和常见 Web3 生态概念。"
---

# Web3

## 钱包连接方式

DApp 连接钱包的方式包括：浏览器钱包插件、在钱包 App 内访问 DApp，以及通过 WalletConnect 协议建立连接。原笔记将 WalletConnect 描述为通过服务端中转实现连接，并提到了 EIP-1328。

浏览器插件钱包会向运行环境注入接口，DApp 再通过约定接口调用钱包。原笔记重点记录了 EIP-1193 和 EIP-6963 两种规范。

## EIP-1193

EIP-1193 约定了浏览器中 JavaScript 与钱包交互的方式，定义 `window.ethereum` 对象的方法和事件。其限制是全局只有一个 `window.ethereum`，安装多个钱包时可能出现钱包争抢对象的问题，DApp 也需要适配不同钱包。

## EIP-6963

EIP-6963 是对 EIP-1193 发现机制的改进。它不再只依赖单一的 `window.ethereum`，而是通过 `window` 事件与钱包交互，使多个钱包能够同时被 DApp 发现，避免争抢同一个全局对象。

## 生态

原笔记将 Web3 生态分为链、应用和服务。

- 链：Ethereum、Polygon、Optimism、Arbitrum、Solana、Avalanche、Sui。
- 应用：DEX、去中心化借贷、NFT 项目和市场、治理、GameFi、预言机、跨链桥。
- DEX 示例：Uniswap、SushiSwap、Curve、PancakeSwap。
- 借贷示例：Aave、Compound、MakerDAO。
- NFT 项目和市场：BAYC、Azuki、胖企鹅、OpenSea、Blur。
- 治理示例：Snapshot。
- 服务：中心化交易所、安全审计、区块链浏览器、钱包和新闻发布。
- 钱包示例：MetaMask、Phantom、Martian、imToken、Safe、Ledger。

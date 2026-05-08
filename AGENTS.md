<!-- BEGIN:nextjs-agent-rules -->

# 项目名称

使用Nextjs 的是一个SSG 项目，项目名称为："Resume", 构建的一个个人博客网站

## 常用命令

- 启动项目：`pnpm dev`
- 构建项目：`pnpm build`
- 启动项目：`pnpm start`
- 预览项目：`pnpm preview`
- 安装依赖：`pnpm install`
- 安装项目依赖：`pnpm install:all`
- 启动worker项目：`pnpm worker:dev`
- 部署worker项目：`pnpm worker:deploy`
- 创建worker项目：`pnpm worker:kv:create`

## 项目结构

- `src`：项目源代码目录
- `public`：项目静态资源目录
- `content`：项目内容目录
- `worker`：项目worker目录

## 项目配置

```bash
pnpm worker:dev
```

## 边界与权限

### 始终允许（不需要确认）

- 读取文件、列出目录
- 运行单文件的类型检查、lint、格式化
- 运行单个测试文件

### 执行前询问

- 新增依赖 (`npm install xxx`)
- 删除文件
- 运行完整构建或全部测试套件

### 绝对禁止

- 直接 push 到 main/master
- 修改环境变量文件 (.env\*)
- 修改 `generated/` 目录下的任何文件

<!-- END:nextjs-agent-rules -->

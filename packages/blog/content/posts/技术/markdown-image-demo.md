---
title: "Markdown 图片使用演示"
date: "2025-05-06"
category: "技术"
tags: ["Markdown", "图片", "demo"]
description: "演示在博客文章中如何使用图片"
---

# Markdown 图片使用演示

本文展示在博客文章中插入图片的几种方式。

## 方式一：本地图片

将图片放在 `public/images/` 目录下，然后使用相对路径引用：

```markdown
![我的图片](/images/example.png)
```

**示例：**

![示例图片占位符](https://via.placeholder.com/800x400/667eea/ffffff?text=Local+Image+Example)

## 方式二：外部图片 URL

直接使用完整的图片 URL：

```markdown
![图片描述](https://example.com/image.jpg)
```

**示例：**

![Unsplash 图片](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80)

## 图片对齐和大小控制

你可以通过 HTML 语法来控制图片的对齐和大小：

### 居中对齐

<center>

![居中图片](https://via.placeholder.com/600x300/764ba2/ffffff?text=Centered+Image)

</center>

### 带标题的图片

> **提示：** 使用 `<center>` 标签可以让图片居中显示。

## 代码中的图片引用

在代码块中引用图片路径时不会被解析为图片：

```markdown
这里不是图片: /images/logo.png
这里才是图片: ![logo](/images/logo.png)
```

## 最佳实践

1. **使用本地图片** - 将博客相关的图片放在 `public/images/` 目录
2. **优化图片大小** - 上传前压缩图片，建议单张不超过 500KB
3. **使用 CDN** - 外部图片建议使用可靠的 CDN 服务
4. **添加 alt 文本** - 记得为图片添加描述性 alt 文本，利于 SEO 和无障碍访问

## 图片文件夹结构

建议的文件夹结构：

```
public/
├── images/
│   ├── posts/
│   │   ├── demo-image-1.png
│   │   └── demo-image-2.jpg
│   └── avatar.png
```

在文章中引用：

- `/images/posts/demo-image-1.png`
- `/images/avatar.png`

这样就可以在文章中方便地使用图片了！

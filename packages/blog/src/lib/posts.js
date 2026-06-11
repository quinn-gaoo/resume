import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import rehypeCodeBlock from "./rehype-code-block";
import { extractHeadings, addHeadingIds } from "./headings";

const postsDirectory = path.join(process.cwd(), "content/posts");

function collectPosts(dir, parentPath = "") {
  let posts = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = parentPath
      ? `${parentPath}/${entry.name}`
      : entry.name;

    if (entry.isDirectory()) {
      posts = posts.concat(collectPosts(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      // 使用 @ 替换路径中的 /，避免 URL 路由冲突
      const slug = relativePath.replace(/\.md$/, "").replace(/\//g, "@");
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // 从目录路径推断 category（去掉文件名）
      const dirPath = relativePath.replace(/\/[^/]+$/, "");
      const inferredCategory = dirPath || "未分类";

      // 将 Date 对象转换为字符串，以便 JSON 序列化
      const postData = {
        slug,
        content,
        category: data.category || inferredCategory,
        ...data,
      };
      
      // 统一日期格式为 YYYY-MM-DD
      if (postData.date) {
        const date = new Date(postData.date);
        if (!isNaN(date.getTime())) {
          postData.date = date.toISOString().split('T')[0]; // "2026-06-09"
        }
      }
      
      posts.push(postData);
    }
  }

  return posts;
}

export function getAllPosts() {
  const allPostsData = collectPosts(postsDirectory);

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug) {
  // 将 slug 中的 @ 还原为 / 以找到实际文件
  const actualPath = slug.replace(/@/g, "/");
  const fullPath = path.join(postsDirectory, `${actualPath}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // 从实际路径推断 category
  const dirPath = actualPath.replace(/\/[^/]+$/, "");
  const inferredCategory = dirPath || "未分类";

  // 将 Date 对象转换为字符串，以便 JSON 序列化
  const result = {
    slug,
    content,
    category: data.category || inferredCategory,
    ...data,
  };
  
  // 统一日期格式为 YYYY-MM-DD
  if (result.date) {
    const date = new Date(result.date);
    if (!isNaN(date.getTime())) {
      result.date = date.toISOString().split('T')[0];
    }
  }
  
  return result;
}

export async function getPostData(slug) {
  const post = getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const processedContent = await remark()
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight, { ignoreMissing: true })
    .use(rehypeCodeBlock)
    .use(rehypeStringify)
    .process(post.content);
  const contentHtml = addHeadingIds(processedContent.toString());
  const headings = extractHeadings(post.content);

  return {
    ...post,
    contentHtml,
    headings,
  };
}

function collectSlugs(dir, parentPath = "") {
  let slugs = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = parentPath
      ? `${parentPath}/${entry.name}`
      : entry.name;

    if (entry.isDirectory()) {
      slugs = slugs.concat(collectSlugs(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      // 使用 @ 替换路径中的 /，避免 URL 路由冲突
      slugs.push(relativePath.replace(/\.md$/, "").replace(/\//g, "@"));
    }
  }

  return slugs;
}

export function getAllSlugs() {
  return collectSlugs(postsDirectory);
}

export function getAllCategories() {
  const posts = getAllPosts();
  const categories = new Set();

  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });

  return Array.from(categories);
}

export function getPostsByCategory(category) {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}

export function getAllTags() {
  const posts = getAllPosts();
  const tags = new Set();

  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });

  return Array.from(tags);
}

export function getPostsByTag(tag) {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags && post.tags.includes(tag));
}

export function groupPostsByYear() {
  const posts = getAllPosts();
  const grouped = {};

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear();
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(post);
  });

  return Object.keys(grouped)
    .sort((a, b) => b - a)
    .map((year) => ({
      year,
      posts: grouped[year],
    }));
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import gfm from "remark-gfm";
import rehypeCodeBlock from "./rehype-code-block";
import { extractHeadings, addHeadingIds } from "./headings";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...data,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data,
  };
}

export async function getPostData(slug) {
  const post = getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const processedContent = await remark()
    .use(gfm)
    .use(remarkRehype)
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

export function getAllSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
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

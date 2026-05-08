import Link from "next/link";
import Head from "next/head";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import { Calendar, FolderOpen, ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { ViewProvider } from "@/context/ViewContext";
import ViewCountItem from "@/components/ViewCountItem";

export async function getStaticPaths() {
  const categories = getAllCategories();

  return {
    paths: categories.map((category) => ({
      params: { slug: category },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = getPostsByCategory(params.slug);
  const categories = getAllCategories();

  return {
    props: {
      category: params.slug,
      posts,
      categories,
    },
  };
}

export default function CategoryPage({ category, posts, categories }) {
  return (
    <>
      <Head>
        <title>{`分类: ${category} | 学习笔记`}</title>
        <meta
          name="description"
          content={`查看分类 "${category}" 下的所有文章`}
        />
      </Head>

      <Layout>
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              返回首页
            </span>
          </Link>
        </div>

        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {category}
              </h1>
              <p className="text-muted-foreground">
                分门别类，各有所长 · 该分类下共有 {posts.length} 篇文章
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ViewProvider slugs={posts.map((p) => p.slug)}>
            <div className="lg:col-span-2 space-y-6">
              {posts.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                    <FolderOpen className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">该分类下暂无文章</p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <article
                    key={post.slug}
                    className="group bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-xl hover:border-primary/20 hover-lift animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <ViewCountItem slug={post.slug} />
                        </div>

                        <Link href={`/posts/${post.slug}/`}>
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-muted-foreground line-clamp-2 mb-4">
                          {post.description || post.content.slice(0, 150)}...
                        </p>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            <aside className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    所有分类
                  </h3>
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${cat}/`}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                        cat === category
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/50 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <span className="font-medium">{cat}</span>
                      {cat === category && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  导航
                </h3>
                <nav className="space-y-2">
                  <Link
                    href="/"
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all group"
                  >
                    <span className="font-medium">首页</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                  <Link
                    href="/archive/"
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all group"
                  >
                    <span className="font-medium">归档</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </nav>
              </div>
            </aside>
          </ViewProvider>
        </div>
      </Layout>
    </>
  );
}

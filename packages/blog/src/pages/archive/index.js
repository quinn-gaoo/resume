import Link from "next/link";
import Head from "next/head";
import { groupPostsByYear, getAllCategories } from "@/lib/posts";
import { Calendar, ArrowLeft, Archive, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { ViewProvider } from "@/context/ViewContext";
import ViewCountItem from "@/components/ViewCountItem";

export async function getStaticProps() {
  const groupedPosts = groupPostsByYear();
  const categories = getAllCategories();

  return {
    props: {
      groupedPosts,
      categories,
    },
  };
}

export default function ArchivePage({ groupedPosts, categories }) {
  const totalPosts = groupedPosts.reduce(
    (sum, group) => sum + group.posts.length,
    0,
  );

  return (
    <>
      <Head>
        <title>{`归档 | 学习笔记`}</title>
        <meta name="description" content="按时间查看所有文章归档" />
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

        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Archive className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                文章归档
              </h1>
              <p className="text-muted-foreground">
                时间的痕迹，知识的积累 · 共 {totalPosts} 篇文章
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ViewProvider
            slugs={groupedPosts.flatMap((g) => g.posts.map((p) => p.slug))}
          >
            <div className="lg:col-span-2 space-y-8">
              {groupedPosts.map(({ year, posts }, yearIndex) => (
                <section
                  key={year}
                  className="animate-slide-up"
                  style={{ animationDelay: `${yearIndex * 150}ms` }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      {year} 年
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {posts.length} 篇
                    </span>
                  </div>

                  <div className="space-y-3">
                    {posts.map((post, postIndex) => (
                      <article
                        key={post.slug}
                        className="group bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-lg hover:border-primary/20 hover-lift"
                        style={{
                          animationDelay: `${yearIndex * 150 + postIndex * 50}ms`,
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <Link href={`/posts/${post.slug}/`}>
                              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                                {post.title}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.date}
                              </span>
                              {post.category && (
                                <Link
                                  href={`/category/${post.category}/`}
                                  className="px-2 py-0.5 rounded-md bg-secondary text-xs hover:bg-primary/10 hover:text-primary transition-colors"
                                >
                                  {post.category}
                                </Link>
                              )}
                              <ViewCountItem slug={post.slug} />
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}

              {groupedPosts.length === 0 && (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Archive className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">暂无文章</p>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  统计
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">文章总数</span>
                    <span className="text-2xl font-bold text-foreground">
                      {totalPosts}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">分类数量</span>
                    <span className="text-xl font-bold text-primary">
                      {categories.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">年份跨度</span>
                    <span className="font-semibold text-foreground">
                      {groupedPosts.length > 0
                        ? `${groupedPosts[groupedPosts.length - 1].year} - ${groupedPosts[0].year}`
                        : "-"}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">今日访问</span>
                      <span className="font-medium text-foreground">
                        <span id="busuanzi_today_pv">-</span> 次
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">总访问量</span>
                      <span className="font-medium text-foreground">
                        <span id="busuanzi_site_pv">-</span> 次
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Archive className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    分类
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category}/`}
                      className="px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    导航
                  </h3>
                </div>
                <nav className="space-y-2">
                  <Link
                    href="/"
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all group"
                  >
                    <span className="font-medium">首页</span>
                  </Link>
                  <Link
                    href="/archive/"
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-primary/10 text-primary"
                  >
                    <span className="font-medium">归档</span>
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

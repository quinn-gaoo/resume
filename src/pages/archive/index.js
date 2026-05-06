import Link from "next/link";
import Head from "next/head";
import { groupPostsByYear, getAllCategories } from "@/lib/posts";
import { Calendar, ArrowLeft, Archive, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

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

      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 glass-effect border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                  <span className="text-white font-bold">Q</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  我的博客
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                <nav className="flex items-center gap-6">
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    首页
                  </Link>
                  <Link href="/archive/" className="text-primary font-medium">
                    归档
                  </Link>
                </nav>
                <ThemeToggle />
              </div>

              <div className="md:hidden">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                <p className="text-muted-foreground">时间的痕迹，知识的积累 · 共 {totalPosts} 篇文章</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
          </div>
        </main>

        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold">Q</span>
                </div>
                <span className="font-semibold text-foreground">学习笔记</span>
              </div>
              <p className="text-sm text-muted-foreground">
                持续学习，不断进步。<br />
                © {new Date().getFullYear()} 学习笔记. Built with{" "}
                <span className="text-primary font-medium">Next.js</span>.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

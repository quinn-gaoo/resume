import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { Calendar, FolderOpen, Tag, ArrowRight, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { ViewProvider } from "@/context/ViewContext";
import ViewCountItem from "@/components/ViewCountItem";

export async function getStaticProps() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return {
    props: {
      posts,
      categories,
    },
  };
}

export default function Home({ posts, categories }) {
  return (
    <Layout>
      <section className="mb-12 animate-fade-in">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            学习笔记
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            记录学习，沉淀思考
          </h1>
          <p className="text-lg text-muted-foreground">
            这里是我的技术学习笔记，记录着我在编程道路上的每一步成长。
            <br />
            从基础概念到进阶技巧，从踩坑经历到解决方案，
            <br />
            希望这些笔记既能帮助自己回顾，也能为他人提供参考。
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ViewProvider slugs={posts.map((p) => p.slug)}>
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                最新文章
              </h2>
              <Link
                href="/archive/"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="group bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-xl hover:border-primary/20 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Link
                        href={`/category/${post.category}/`}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                      >
                        {post.category}
                      </Link>
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
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                          >
                            <Tag className="w-3 h-3" />
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
            ))}
          </div>

          <aside className="space-y-6">
            <div
              className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">分类</h3>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category}/`}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all group"
                  >
                    <span className="font-medium">{category}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            <div
              className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  关于博主
                </h3>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <span className="text-2xl font-bold text-white">Q</span>
                </div>
                <p className="text-center text-muted-foreground text-sm">
                  热爱技术的开发者，专注于 Web
                  前端和全栈开发。喜欢分享学习心得和技术干货。
                </p>
              </div>
            </div>

            <div
              className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                统计
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">文章总数</span>
                  <span className="font-bold text-primary">{posts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">分类数量</span>
                  <span className="font-bold text-primary">
                    {categories.length}
                  </span>
                </div>
                <div className="border-t border-border pt-3 mt-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">今日访问</span>
                    <span className="font-medium text-foreground">
                      <span id="busuanzi_today_pv">-</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">总访问量</span>
                    <span className="font-medium text-foreground">
                      <span id="busuanzi_site_pv">-</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </ViewProvider>
      </div>
    </Layout>
  );
}

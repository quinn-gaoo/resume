import Link from "next/link";
import { ArrowLeft, Home, Search, Sparkles, BookOpen } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { getAllPosts } from "@/lib/posts";

export async function getStaticProps() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return {
    props: {
      recentPosts,
    },
  };
}

export default function Custom404({ recentPosts }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                <Sparkles className="w-5 h-5 text-white" />
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
                <Link
                  href="/archive/"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center animate-float">
              <div className="text-6xl font-bold text-primary">404</div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            页面迷路了
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            抱歉，您访问的页面不存在或已被移动。
            <br />
            让我们一起找回正确的方向吧！
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              <Home className="w-5 h-5" />
              返回首页
            </Link>
            <Link
              href="/archive/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              <Search className="w-5 h-5" />
              浏览文章
            </Link>
          </div>

          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-px bg-primary"></div>
              <span className="text-sm font-medium text-muted-foreground">
                或许你想看看这些
              </span>
              <div className="w-12 h-px bg-primary"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}/`}
                  className="group p-4 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {post.date}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">学习笔记</span>
            </div>
            <p className="text-sm text-muted-foreground">
              持续学习，不断进步。
              <br />© {new Date().getFullYear()} 学习笔记. Built with{" "}
              <span className="text-primary font-medium">Next.js</span>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

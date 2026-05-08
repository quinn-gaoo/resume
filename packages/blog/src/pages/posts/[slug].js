import Link from "next/link";
import Head from "next/head";
import { getAllSlugs, getPostData } from "@/lib/posts";
import {
  Calendar,
  FolderOpen,
  Tag,
  ArrowLeft,
  ArrowRight,
  Share2,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import TableOfContents from "@/components/TableOfContents";
import ViewCounter from "@/components/ViewCounter";

export async function getStaticPaths() {
  const slugs = getAllSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{`${post.title} | 学习笔记`}</title>
        <meta name="description" content={post.description || post.title} />
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
            {post.category && (
              <Link
                href={`/category/${post.category}/`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                {post.category}
              </Link>
            )}
          </div>

          <div className="flex gap-8">
            <article className="flex-1 min-w-0 bg-card rounded-2xl shadow-sm border border-border overflow-hidden animate-fade-in">
              <div className="p-8 sm:p-12">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>

                  <span className="text-muted-foreground">|</span>

                  <ViewCounter slug={post.slug} />

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                        >
                          <Tag className="w-3.5 h-3.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                {post.description && (
                  <p className="text-lg text-muted-foreground mb-8 italic border-l-4 border-primary pl-4">
                    {post.description}
                  </p>
                )}
              </div>

              <div className="border-t border-border">
                <div
                  className="prose p-8 sm:p-12"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              </div>
            </article>

            <aside className="hidden lg:block w-64 shrink-0">
              <TableOfContents headings={post.headings || []} />
            </aside>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all group"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  返回首页
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors group">
                <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  分享
                </span>
              </button>
            </div>
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
                持续学习，不断进步。
                <br />© {new Date().getFullYear()} 学习笔记. Built with{" "}
                <span className="text-primary font-medium">Next.js</span>.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

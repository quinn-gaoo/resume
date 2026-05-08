import Link from "next/link";
import Head from "next/head";
import { getAllSlugs, getPostData } from "@/lib/posts";
import {
  Calendar,
  FolderOpen,
  Tag,
  ArrowLeft,
  Share2,
} from "lucide-react";
import Layout from "@/components/Layout";
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
      </Layout>
    </>
  );
}

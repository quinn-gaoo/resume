import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// 根据环境选择 Worker URL
// 开发环境使用本地 Worker，生产环境使用 Cloudflare Worker
const WORKER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : "https://blog-counter-prod.quinnn-gao.workers.dev";

export default function ViewCounter({ slug }) {
  const [views, setViews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // 调用 Cloudflare Worker API
    fetch(`${WORKER_URL}/api/counter/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setViews(data.views);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch views:", err);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
        <Eye className="w-4 h-4" />
        <span>加载中...</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
      <Eye className="w-4 h-4" />
      <span>{views?.toLocaleString() || 0} 次阅读</span>
    </span>
  );
}

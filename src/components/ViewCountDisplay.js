import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// 根据环境选择 Worker URL
const WORKER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : "https://blog-counter-prod.quinnn-gao.workers.dev";

// 缓存浏览次数
const viewsCache = {};

export default function ViewCountDisplay({ slug, className = "" }) {
  const cachedViews = viewsCache[slug];
  const [views, setViews] = useState(cachedViews);
  const [isLoading, setIsLoading] = useState(cachedViews === undefined);

  useEffect(() => {
    if (!slug || cachedViews !== undefined) return;

    // 获取浏览次数（不递增）
    fetch(`${WORKER_URL}/api/views/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        viewsCache[slug] = data.views;
        setViews(data.views);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch views:", err);
        setIsLoading(false);
      });
  }, [slug, cachedViews]);

  return (
    <span
      className={`flex items-center gap-1 text-xs text-muted-foreground ${className}`}
    >
      <Eye className="w-3 h-3" />
      <span>{isLoading ? "-" : views?.toLocaleString() || 0}</span>
    </span>
  );
}

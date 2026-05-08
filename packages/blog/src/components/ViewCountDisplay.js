import { useEffect, useState, useRef } from "react";
import { Eye } from "lucide-react";

const WORKER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8888"
    : "https://blog-counter-prod.quinnn-gao.workers.dev";

const viewsCache = {};

export default function ViewCountDisplay({ slug, className = "" }) {
  const [views, setViews] = useState(() => viewsCache[slug]);
  const [isError, setIsError] = useState(false);
  const hasFetched = useRef(viewsCache[slug] !== undefined);

  useEffect(() => {
    if (!slug || hasFetched.current) return;
    hasFetched.current = true;

    fetch(`${WORKER_URL}/api/views/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        viewsCache[slug] = data.views;
        setViews(data.views);
      })
      .catch((err) => {
        console.error("Failed to fetch views:", err);
        setIsError(true);
      });
  }, [slug]);

  if (isError || views === undefined) {
    return null;
  }

  return (
    <span
      className={`flex items-center gap-1 text-xs text-muted-foreground ${className}`}
    >
      <Eye className="w-3 h-3" />
      <span>{views?.toLocaleString() || 0}</span>
    </span>
  );
}

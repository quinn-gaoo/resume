import { createContext, useContext, useEffect, useState, useRef } from "react";

const WORKER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8888"
    : "https://blog-counter-prod.quinnn-gao.workers.dev";

const globalViewsCache = {};
let pendingSlugs = [];
let fetchTimer = null;
let isFetchingRef = { current: false };

const ViewContext = createContext({
  views: {},
  isLoading: true,
});

export function ViewProvider({ children, slugs = [] }) {
  const [views, setViews] = useState(() => ({ ...globalViewsCache }));
  const [isLoading, setIsLoading] = useState(() => {
    const hasAllCached = slugs.every(
      (slug) => globalViewsCache[slug] !== undefined,
    );
    return !hasAllCached;
  });
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const slugsToFetch = slugs.filter(
      (slug) =>
        globalViewsCache[slug] === undefined && !pendingSlugs.includes(slug),
    );

    if (slugsToFetch.length === 0) {
      return;
    }

    pendingSlugs = [...pendingSlugs, ...slugsToFetch];

    const fetchBatch = async () => {
      if (isFetchingRef.current || pendingSlugs.length === 0) return;
      isFetchingRef.current = true;

      const slugsToRequest = [...pendingSlugs];
      pendingSlugs = [];

      try {
        const res = await fetch(`${WORKER_URL}/api/views/batch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slugs: slugsToRequest }),
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        Object.entries(data.views).forEach(([slug, count]) => {
          globalViewsCache[slug] = count;
        });

        setViews((prevViews) => {
          const newViews = { ...prevViews, ...globalViewsCache };
          return newViews;
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch views:", err);
        setIsLoading(false);
      } finally {
        isFetchingRef.current = false;
      }
    };

    if (fetchTimer) clearTimeout(fetchTimer);
    fetchTimer = setTimeout(fetchBatch, 100);

    return () => {
      if (fetchTimer) clearTimeout(fetchTimer);
    };
  }, [slugs]);

  return (
    <ViewContext.Provider value={{ views, isLoading }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useViewCounts(slug) {
  const { views, isLoading } = useContext(ViewContext);

  return {
    views: views[slug] ?? null,
    isLoading,
  };
}

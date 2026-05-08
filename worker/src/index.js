/**
 * Cloudflare Worker for blog view counter
 * 使用 KV 存储文章浏览次数，支持设备指纹识别去重
 */

// 本地开发模式下的内存存储
let localMemoryStore = {};
let localDeviceStore = {}; // 存储设备访问记录

// 生成设备指纹（基于 IP + User-Agent 的简单哈希）
async function generateDeviceId(request) {
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";
  const ua = request.headers.get("user-agent") || "unknown";

  // 创建简单哈希
  const text = `${ip}:${ua}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // 取前16位作为设备ID
  return hashHex.slice(0, 16);
}

// 检查设备是否已访问过
async function hasDeviceVisited(slug, deviceId, env, isLocalDev) {
  const key = `device:${slug}:${deviceId}`;

  if (isLocalDev) {
    const visitedAt = localDeviceStore[key];
    if (!visitedAt) return false;

    // 24小时内重复访问不算
    const now = Date.now();
    const lastVisit = parseInt(visitedAt);
    return now - lastVisit < 24 * 60 * 60 * 1000;
  } else {
    const visitedAt = await env.COUNTER_KV.get(key);
    if (!visitedAt) return false;

    // 24小时内重复访问不算
    const now = Date.now();
    const lastVisit = parseInt(visitedAt);
    return now - lastVisit < 24 * 60 * 60 * 1000;
  }
}

// 记录设备访问
async function recordDeviceVisit(slug, deviceId, env, isLocalDev) {
  const key = `device:${slug}:${deviceId}`;
  const now = Date.now().toString();

  if (isLocalDev) {
    localDeviceStore[key] = now;
  } else {
    await env.COUNTER_KV.put(key, now, { expirationTtl: 7 * 24 * 60 * 60 }); // 7天过期
  }
}

// 获取文章浏览次数
async function getViewCount(slug, env, isLocalDev) {
  const key = `views:${slug}`;

  if (isLocalDev) {
    return parseInt(localMemoryStore[key] || "0");
  } else {
    const count = await env.COUNTER_KV.get(key);
    return parseInt(count || "0");
  }
}

// 增加浏览次数
async function incrementViewCount(slug, env, isLocalDev) {
  const key = `views:${slug}`;

  if (isLocalDev) {
    const current = parseInt(localMemoryStore[key] || "0");
    const newCount = current + 1;
    localMemoryStore[key] = newCount.toString();
    return newCount;
  } else {
    const current = await env.COUNTER_KV.get(key);
    const newCount = parseInt(current || "0") + 1;
    await env.COUNTER_KV.put(key, newCount.toString());
    return newCount;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 判断是否在本地开发环境
    const isLocalDev = !env.COUNTER_KV;

    // CORS 响应头
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
    };

    // 处理预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // 处理计数请求（带设备指纹去重）
    if (path.startsWith("/api/counter/")) {
      const slug = path.replace("/api/counter/", "");

      if (!slug) {
        return new Response(JSON.stringify({ error: "Missing slug" }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      // 生成设备指纹
      const deviceId = await generateDeviceId(request);

      // 检查是否已访问过（24小时内）
      const hasVisited = await hasDeviceVisited(
        slug,
        deviceId,
        env,
        isLocalDev,
      );
      let views;

      if (!hasVisited) {
        // 新访问，增加计数
        views = await incrementViewCount(slug, env, isLocalDev);
        await recordDeviceVisit(slug, deviceId, env, isLocalDev);
      } else {
        // 重复访问，只获取当前计数
        views = await getViewCount(slug, env, isLocalDev);
      }

      return new Response(
        JSON.stringify({
          slug,
          views,
          isNewVisit: !hasVisited,
          mode: isLocalDev ? "local" : "production",
        }),
        {
          headers: corsHeaders,
        },
      );
    }

    // 批量获取计数（用于列表页）
    // 注意：这个判断要在 /api/views/ 之前，因为 /api/views/batch 也会匹配 startsWith("/api/views/")
    if (path === "/api/views/batch" && request.method === "POST") {
      try {
        const body = await request.json();
        const slugs = body.slugs || [];

        const results = await Promise.all(
          slugs.map(async (slug) => ({
            slug,
            views: await getViewCount(slug, env, isLocalDev),
          })),
        );

        const viewsMap = results.reduce((acc, { slug, views }) => {
          acc[slug] = views;
          return acc;
        }, {});

        return new Response(
          JSON.stringify({
            views: viewsMap,
            mode: isLocalDev ? "local" : "production",
          }),
          {
            headers: corsHeaders,
          },
        );
      } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request body" }), {
          status: 400,
          headers: corsHeaders,
        });
      }
    }

    // 处理获取计数请求（不递增，用于列表页）
    if (path.startsWith("/api/views/")) {
      const slug = path.replace("/api/views/", "");
      const views = await getViewCount(slug, env, isLocalDev);

      return new Response(
        JSON.stringify({
          slug,
          views,
          mode: isLocalDev ? "local" : "production",
        }),
        {
          headers: corsHeaders,
        },
      );
    }

    // 健康检查
    if (path === "/health") {
      return new Response(
        JSON.stringify({
          status: "ok",
          mode: isLocalDev ? "local" : "production",
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response("Blog Counter API - Not found", { status: 404 });
  },
};

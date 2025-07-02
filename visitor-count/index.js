const TTL_SECONDS = 60; // How long a user stays "online" in seconds

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const clientIP = request.headers.get("CF-Connecting-IP");

    if (url.pathname !== "/visitor-count") {
      return new Response("Not found", { status: 404 });
    }

    const now = Date.now();
    const key = `visitor:${clientIP}`;

    // Store/refresh this visitor's last seen timestamp
    await env.VISITOR_KV.put(key, now.toString(), {
      expirationTtl: TTL_SECONDS,
    });

    // List all recent visitors
    const keys = await env.VISITOR_KV.list({ prefix: "visitor:" });

    let count = 0;
    const cutoff = now - TTL_SECONDS * 1000;

    for (const { name } of keys.keys) {
      const ts = await env.VISITOR_KV.get(name);
      if (ts && parseInt(ts) > cutoff) {
        count++;
      }
    }

    return new Response(JSON.stringify({ count }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};

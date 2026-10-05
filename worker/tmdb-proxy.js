const TMDB_ORIGIN = "https://api.themoviedb.org/3";
const ALLOWED_PATH = /^\/(?:configuration|search\/(?:movie|tv|multi)|find\/[^/]+|movie\/\d+(?:\/(?:images|external_ids))?|tv\/\d+(?:\/(?:images|external_ids))?)$/;

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });
}

export default {
  async fetch(request, env) {
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, { allow: "GET" });
    if (!env.TMDB_READ_ACCESS_TOKEN) return json({ error: "proxy_not_configured" }, 503);

    const incoming = new URL(request.url);
    const path = incoming.searchParams.get("path") || "";
    if (!ALLOWED_PATH.test(path)) return json({ error: "endpoint_not_allowed" }, 400);

    const target = new URL(`${TMDB_ORIGIN}${path}`);
    incoming.searchParams.forEach((value, key) => {
      if (key !== "path") target.searchParams.append(key, value);
    });

    const cache = caches.default;
    const cacheKey = new Request(target.toString(), { method: "GET" });
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const response = await fetch(target, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${env.TMDB_READ_ACCESS_TOKEN}`,
      },
    });
    const result = new Response(response.body, response);
    result.headers.set("cache-control", path.startsWith("/search/") ? "public, max-age=600" : "public, max-age=21600");
    result.headers.delete("set-cookie");
    if (response.ok) await cache.put(cacheKey, result.clone());
    return result;
  },
};

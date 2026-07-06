import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products.data";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

// Global media deployment: long-lived, immutable CDN caching so images + JSON
// are served from every edge PoP with stale-while-revalidate for freshness.
const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800",
  "CDN-Cache-Control": "public, max-age=86400",
  Vary: "Accept-Encoding",
};

export const Route = createFileRoute("/api/products")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: CORS }),
      GET: async () =>
        new Response(JSON.stringify({ products: PRODUCTS }), {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...CORS,
            ...CACHE_HEADERS,
          },
        }),
    },
  },
});

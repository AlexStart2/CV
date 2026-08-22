import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  // The CV has no loaders and no dynamic data, so the single route is rendered
  // to static HTML at build time. This makes `build/client` deployable to any
  // static host, while `npm start` still works as a normal server.
  prerender: ["/"],
} satisfies Config;

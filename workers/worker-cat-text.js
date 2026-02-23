//@ts-expect-error: Will be resolved by wrangler build
import { handleImageRequest } from "../.open-next/cloudflare/images.js";
//@ts-expect-error: Will be resolved by wrangler build
import { runWithCloudflareRequestContext } from "../.open-next/cloudflare/init.js";
//@ts-expect-error: Will be resolved by wrangler build
import { maybeGetSkewProtectionResponse } from "../.open-next/cloudflare/skew-protection.js";
// @ts-expect-error: Will be resolved by wrangler build
import { handler as middlewareHandler } from "../.open-next/middleware/handler.mjs";

export default {
  async fetch(request, env, ctx) {
    return runWithCloudflareRequestContext(request, env, ctx, async () => {
      const response = maybeGetSkewProtectionResponse(request);
      if (response) {
        return response;
      }
      const url = new URL(request.url);

      // Serve images in development.
      if (url.pathname.startsWith("/cdn-cgi/image/")) {
        const m = url.pathname.match(/\/cdn-cgi\/image\/.+?\/(?<url>.+)$/);
        if (m === null) {
          return new Response("Not Found!", { status: 404 });
        }
        const imageUrl = m.groups.url;
        return imageUrl.match(/^https?:\/\//)
          ? fetch(imageUrl, { cf: { cacheEverything: true } })
          : env.ASSETS?.fetch(new URL(`/${imageUrl}`, url));
      }

      // Fallback for the Next default image loader.
      if (url.pathname ===
          `${globalThis.__NEXT_BASE_PATH__}/_next/image${globalThis.__TRAILING_SLASH__ ? "/" : ""}`) {
        return await handleImageRequest(url, request.headers, env);
      }

      // Handle middleware
      const reqOrResp = await middlewareHandler(request, env, ctx);
      if (reqOrResp instanceof Response) {
        return reqOrResp;
      }

      // Import the dev category server function
      // @ts-expect-error: resolved by wrangler build
      const { handler } = await import("../.open-next/server-functions/cat-text/index.mjs");
      return handler(reqOrResp, env, ctx, request.signal);
    });
  },
};

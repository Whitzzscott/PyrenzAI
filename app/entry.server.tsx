import { PassThrough } from "stream";
import { RemixServer } from "@remix-run/react";
import { type EntryContext } from "@remix-run/node";
import { renderToPipeableStream } from "react-dom/server";
import { URL } from "url";
import { readFileSync } from "fs";
import { join } from "path";

const rateLimitMap = new Map<
  string,
  { count: number; lastReset: number; lockedUntil?: number }
>();

interface CustomEntryContext extends EntryContext {
  additionalHeaders: {
    authorization?: string | null;
  };
}

function createCustomContext(
  context: EntryContext,
  additionalHeaders: CustomEntryContext["additionalHeaders"],
): CustomEntryContext {
  return {
    ...context,
    additionalHeaders,
  };
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const now = Date.now();
    const bucket = rateLimitMap.get(ip) ?? { count: 0, lastReset: now };

    if (bucket.lockedUntil && now < bucket.lockedUntil) {
      resolve(
        new Response("Too many requests. Try again later.", { status: 429 }),
      );
      return;
    }

    if (now - bucket.lastReset >= 1000) {
      bucket.count = 1;
      bucket.lastReset = now;
    } else {
      bucket.count++;
    }

    if (bucket.count > 20) {
      bucket.lockedUntil = now + 2 * 60 * 1000;
      rateLimitMap.set(ip, bucket);
      resolve(
        new Response("Rate limit exceeded. Locked for 2 minutes.", {
          status: 429,
        }),
      );
      return;
    }

    rateLimitMap.set(ip, bucket);

    const stream = new PassThrough();
    const authorization = request.headers.get("authorization");

    const customContext = createCustomContext(remixContext, {
      authorization: authorization,
    });

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={customContext} url={request.url} />,
      {
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("X-Powered-By", "Pyrenz AI");
          responseHeaders.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
          );
          responseHeaders.set("X-Content-Type-Options", "nosniff");
          responseHeaders.set("X-Frame-Options", "DENY");
          responseHeaders.set("X-XSS-Protection", "1; mode=block");
          responseHeaders.set(
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
          );
          responseHeaders.set(
            "Permissions-Policy",
            "geolocation=(self), microphone=()",
          );
          responseHeaders.set("Origin-Agent-Cluster", "?1");
          responseHeaders.set("X-DNS-Prefetch-Control", "off");
          responseHeaders.set("X-Download-Options", "noopen");

          const isHTML = request.url.endsWith(".html");
          if (isHTML) {
            responseHeaders.set(
              "Cache-Control",
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            );
          } else {
            responseHeaders.set(
              "Cache-Control",
              "public, max-age=31536000, immutable",
            );
          }

          const webStream = new ReadableStream({
            start(controller) {
              stream.on("data", (chunk) => controller.enqueue(chunk));
              stream.on("end", () => controller.close());
              stream.on("error", (err) => controller.error(err));
            },
          });

          resolve(
            new Response(webStream, {
              status: responseStatusCode,
              headers: responseHeaders,
            }),
          );
          pipe(stream);
        },
        onError(error) {
          console.error("❌ Server Render Error:", error);
          reject(error);
          abort();
          resolve(
            new Response("<h1>Internal Server Error</h1>", {
              status: 500,
              headers: { "Content-Type": "text/html" },
            }),
          );
        },
      },
    );
  });
}

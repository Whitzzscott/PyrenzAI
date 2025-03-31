import { PassThrough } from 'stream';
import { RemixServer } from '@remix-run/react';
import { type EntryContext } from '@remix-run/node';
import { renderToPipeableStream } from 'react-dom/server';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          responseHeaders.set('Content-Type', 'text/html');
          responseHeaders.set('X-Powered-By', 'Pyrenz AI');

          const webStream = new ReadableStream({
            start(controller) {
              stream.on('data', (chunk) => controller.enqueue(chunk));
              stream.on('end', () => controller.close());
              stream.on('error', (err) => controller.error(err));
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
          console.error('❌ Server Render Error:', error);
          reject(error);
          abort();

          resolve(
            new Response(getErrorHtml(error), {
              status: 500,
              headers: { 'Content-Type': 'text/html' },
            }),
          );
        },
      },
    );
  });
}

function getErrorHtml(error: unknown) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oops! Something went wrong</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; font-family: sans-serif; }
      body { background: #1a1a2e; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; }
      .container { max-width: 600px; }
      h1 { font-size: 3rem; margin-bottom: 10px; }
      p { font-size: 1.2rem; opacity: 0.8; }
      .error-box { animation: fadeIn 0.5s ease-in-out; padding: 20px; border-radius: 10px; background: rgba(255, 255, 255, 0.1); }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="error-box">
        <h1>💥 Boom! Something broke.</h1>
        <p>We're sorry, but an unexpected error occurred.</p>
        <p style="opacity: 0.5; font-size: 0.9rem;">Error: ${String(error)}</p>
      </div>
    </div>
  </body>
  </html>`;
}

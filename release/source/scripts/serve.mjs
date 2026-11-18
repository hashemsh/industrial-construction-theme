import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Minimal static preview server for the release folder.
 * Sends `no-store` so the browser always renders the current build.
 */
const root = path.resolve(process.argv[2] ?? '../release');
const port = Number(process.argv[3] ?? 5173);
const host = '127.0.0.1';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url ?? '/', `http://${host}`).pathname);
  let filePath = path.resolve(root, `.${urlPath}`);

  if (!filePath.startsWith(root)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': types['.html'], 'Cache-Control': 'no-store' });
    res.end(fs.readFileSync(path.join(root, '404.html')));
    return;
  }

  res.writeHead(200, {
    'Content-Type': types[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, host, () => {
  console.log(`preview: http://${host}:${port}`);
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT || 3000);
const buildDir = path.join(__dirname, 'build');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const server = http.createServer((request, response) => {
  const requestedPath = decodeURIComponent(request.url.split('?')[0]);
  const relativePath = requestedPath === '/' ? 'index.html' : requestedPath.slice(1);
  const filePath = path.resolve(buildDir, relativePath);
  const safePath = filePath.startsWith(`${buildDir}${path.sep}`) || filePath === path.join(buildDir, 'index.html');

  if (!safePath) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  const sendFile = (targetPath) => {
    fs.readFile(targetPath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }
      response.writeHead(200, {
        'Content-Type': contentTypes[path.extname(targetPath)] || 'application/octet-stream',
      });
      response.end(data);
    });
  };

  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(filePath);
      return;
    }
    // React Router fallback: unknown browser paths render the application shell.
    sendFile(path.join(buildDir, 'index.html'));
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Frontend listening on port ${port}`);
});

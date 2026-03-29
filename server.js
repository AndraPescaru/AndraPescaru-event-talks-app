const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url}`);

  let filePath = './index.html';
  if (req.url !== '/') {
    // If requesting other files (e.g., CSS, JS if they were separate), handle here.
    // But for this project, everything is in index.html, so all requests will be served index.html
    // For simplicity, we just serve index.html for any request.
    console.log("Serving index.html for all requests.");
  }

  fs.readFile(path.join(__dirname, filePath), (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found!');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log('To stop the server, press Ctrl+C');
});

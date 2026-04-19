const express = require('express');
const path = require('path');
const app = express();
const PORT = 3850;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sanyos-web', version: '1.0.0', uptime: Math.floor(process.uptime()), timestamp: new Date().toISOString() });
});

app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.startsWith('ops.sanyos.mx')) {
    return res.redirect(301, 'https://ops.zyaeti.mx' + req.url);
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (!filePath.match(/\.[a-f0-9]{8,}\.\w+$/)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Cloudflare-CDN-Cache-Control', 'no-store');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

app.get('/{*path}', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`sanyos-web corriendo en puerto ${PORT}`));

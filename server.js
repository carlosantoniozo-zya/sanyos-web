const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
try { process.loadEnvFile(path.join(__dirname, '.env')); } catch (_) { /* sin .env: usa el entorno del proceso */ }
const app = express();
// ZYA-ASEG-HEADERS (S1683): anti-clickjacking
app.use((req, res, next) => { res.setHeader('X-Frame-Options', 'SAMEORIGIN'); next(); });
const PORT = process.env.PORT || 3850;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sanyos-web', version: '1.0.0', uptime: Math.floor(process.uptime()), timestamp: new Date().toISOString() });
});

app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.startsWith('ops.sanyos.mx')) {
    return res.redirect(301, (process.env.OPS_REDIRECT_URL || 'https://ops.zyaeti.mx') + req.url);
  }
  next();
});

// Solicitud de cotización: se guarda en data/leads.jsonl y se avisa por correo (SMTP_* en .env).
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;
const porIp = new Map();
const limpio = (t, max) => String(t == null ? '' : t).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let transporte = null;
function getTransporte() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transporte) transporte = nodemailer.createTransport({
    host: SMTP_HOST, port: parseInt(process.env.SMTP_PORT) || 587, secure: false, requireTLS: true,
    tls: process.env.SMTP_SERVERNAME ? { servername: process.env.SMTP_SERVERNAME } : undefined,
    auth: { user: SMTP_USER, pass: SMTP_PASS }, connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 20000
  });
  return transporte;
}

app.post('/api/cotizar', express.json({ limit: '10kb' }), async (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ ok: true }); // honeypot: los bots llenan este campo
  const ip = req.headers['cf-connecting-ip'] || req.ip;
  const ahora = Date.now();
  const recientes = (porIp.get(ip) || []).filter(t => ahora - t < 3600000);
  if (recientes.length >= 5) return res.status(429).json({ error: 'Demasiadas solicitudes, intenta más tarde.' });
  const d = {
    nombre: limpio(b.nombre, 100), empresa: limpio(b.empresa, 120), telefono: limpio(b.telefono, 30),
    correo: limpio(b.correo, 150).toLowerCase(), origen: limpio(b.origen, 100), destino: limpio(b.destino, 100),
    carga: limpio(b.carga, 100), mensaje: String(b.mensaje || '').replace(/\r/g, '').trim().slice(0, 1500)
  };
  if (!d.nombre || !EMAIL_RE.test(d.correo) || (!d.origen && !d.mensaje)) {
    return res.status(400).json({ error: 'Completa nombre, un correo válido y los datos del envío.' });
  }
  recientes.push(ahora); porIp.set(ip, recientes); if (porIp.size > 5000) porIp.clear();
  try {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
    fs.appendFileSync(path.join(__dirname, 'data', 'leads.jsonl'), JSON.stringify({ fecha: new Date().toISOString(), ...d }) + '\n');
  } catch (e) { console.error('[cotizar] no se pudo guardar:', e.message); }
  const t = getTransporte();
  if (!t) { console.warn('[cotizar] SMTP no configurado: solicitud guardada sin aviso por correo'); return res.json({ ok: true }); }
  try {
    const filas = [['Nombre', d.nombre], ['Empresa', d.empresa], ['Teléfono', d.telefono], ['Correo', d.correo], ['Origen', d.origen], ['Destino', d.destino], ['Tipo de carga', d.carga], ['Mensaje', d.mensaje]].filter(f => f[1]);
    await t.sendMail({
      from: { name: 'Sitio web SANYOS', address: process.env.SMTP_USER },
      to: process.env.LEADS_TO || 'contacto@sanyos.mx',
      replyTo: { name: d.nombre, address: d.correo },
      subject: `Solicitud de cotización — ${d.nombre}${d.empresa ? ' (' + d.empresa + ')' : ''}`,
      text: filas.map(f => f[0] + ': ' + f[1]).join('\n'),
      html: '<table style="font-family:Arial,sans-serif;font-size:14px">' + filas.map(f => `<tr><td style="padding:4px 12px 4px 0"><b>${f[0]}</b></td><td>${esc(f[1]).replace(/\n/g, '<br>')}</td></tr>`).join('') + '</table>'
    });
  } catch (e) { console.error('[cotizar] error de correo:', e.message); }
  res.json({ ok: true });
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

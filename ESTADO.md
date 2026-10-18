# ESTADO.md — sanyos-web
Última actualización: 2026-07-12

## Resumen
Landing pública de SANYOS Transportes · Express 5 (estático) · sanyos.mx / www.sanyos.mx · puerto 3850 · PC local

## Implementado ✅
- Sitio estático corporativo de SANYOS
- Redirect 301: ops.sanyos.mx → ops.zyaeti.mx
- SEO completo (robots.txt, sitemap.xml, meta OG/Twitter/Schema.org)
- PM2: sanyos-web
- Health endpoint, no-cache, Monitor, Cloudflare
- Colores: dorado #c9a84c, fondo #0f0e0c
- Logo: public/logo.png (S+Y entrelazadas, 388×435px)
- Favicon.ico real (T199, 2026-07-11) — monograma "SY" recortado del logo, reemplaza el workaround `<link rel="icon" href="/logo.png">`

## Pendientes 🔄
- Ninguno activo

## Bugs conocidos 🐛
- Ninguno activo

## Deuda técnica ⚠️
- Ninguna

## Próximas implementaciones 💡
- Ninguna planificada

## Decisiones de arquitectura
- Express estático puro (sin BD, sin React) — landing informativa, sin lógica de negocio
- Sin ZYA About ni Feedback Widget — sitio de cliente externo, no branding ZYA
- Redirect ops.sanyos.mx → ops.zyaeti.mx — sanyos-ops tiene dominio zyaeti.mx, no sanyos.mx

## Integraciones
- **sanyos-ops** (ops.zyaeti.mx) — redirect desde ops.sanyos.mx
- **ZYA Monitor** — monitoreo HTTP
- **Cloudflare** — DNS sanyos.mx

## Variables de entorno requeridas
- PORT=3850
- NODE_ENV=production

## Actualización S1543 (2026-09-24) — auditoría documental
- La auditoría integral S1497 (commit 9578d80, 2026-09-03, `plans/auditoria-integral-2026-09-02.md`) encontró 2 ❌ y 3 ⚠️ que este ESTADO no refleja ("Deuda técnica: Ninguna" es inexacto): faltan headers de seguridad (X-Frame-Options, CSP, HSTS…), no hay formulario de contacto (solo `mailto`), JSON-LD incompleto, `twitter:card` = `summary`.
- `ops.sanyos.mx` → 301 a `ops.zyaeti.mx` es un redirect intencional servido por este proyecto (puerto 3850).

## Actualización S1690 (2026-10-18) — rediseño y fichas de Google Maps
- **Página:** portada con foto, video (`public/media/sanyos.mp4`, 720p, 8.5 MB), servicios, galería de flota, direcciones, teléfonos (248 101 8011 / 222 930 4622), botón flotante de WhatsApp y formulario de cotización. `twitter:card` ya es `summary_large_image` y el JSON-LD lleva dirección completa, `location` de los dos sitios y teléfonos (cierra los hallazgos 2, 3 y 4 de la auditoría S1497). Los originales pesados quedan en `docs/` (el `.mp4` está en `.gitignore`).
- **Formulario:** `POST /api/cotizar` en `server.js` (honeypot, tope 5/h por IP, 10 kB). Guarda en `data/leads.jsonl` (no versionado) y avisa a contacto@sanyos.mx con nodemailer por 127.0.0.1:587 (Mailcow local; `SMTP_SERVERNAME=mail.zyaeti.mx`) usando el buzón `facturas@sanyos.mx`. Requiere `.env` local (ver `.env.example`); sin SMTP la solicitud se guarda igual. Si deja de llegar correo: `pm2 logs sanyos-web | grep cotizar`.
- **Direcciones:** oficina y domicilio fiscal Calle Progreso núm. 4 (casa de Santiago); patio Calle del Llano s/n; ambas San Lucas el Grande, San Salvador el Verde, Puebla, 74135.
- **Google Business Profile (cuenta de ZyA):** «Trans Logistic SANYOS» (patio, visible) y «SANYOS Transportes S.O.N.» (oficina, área de servicio sin dirección pública). **Ambas esperan la verificación de Carlos** (video en el sitio). Detalle y pendientes: T381 en `deseimp/backlog.md`.
- **Pendientes 🔄:** T381; confirmar que los teléfonos son públicos; ideas sin hacer (mapa de cobertura, bloque de confianza, página de contacto con mapa).

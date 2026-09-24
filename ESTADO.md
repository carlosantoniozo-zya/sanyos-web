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

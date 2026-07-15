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

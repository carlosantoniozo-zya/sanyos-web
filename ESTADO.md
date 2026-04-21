# ESTADO.md — sanyos-web
Última actualización: 2026-04-21

## Estado actual
- URL: sanyos.mx / www.sanyos.mx
- Puerto: 3850
- Stack: Node + Express (estático)
- Host: PC local, PM2 (sanyos-web)
- ops.sanyos.mx → redirect 301 → ops.zyaeti.mx

## Completado
- Landing estática con logo real (S+Y entrelazadas) ✅
- Datos de emisores tomados de BD sanyos-ops ✅
- Correo contacto@sanyos.mx ✅
- Colores tema Sanyos (#c9a84c, #0f0e0c) ✅
- DNS Cloudflare (sanyos.mx, www, ops) ✅
- Túnel Cloudflare configurado ✅
- PM2 configurado ✅
- Health endpoint /health ✅

## Historial
- 2026-04-21: Header renombrado "ACCESO OPERADORES" → "PORTAL". AAP aprobada 16/16 ítems. Alta en landing zyaeti.mx (link sanyos.mx) y en admin (sidebar + monitor + credenciales).
- 2026-04-20: SEO implementado (robots.txt, sitemap.xml, meta OG/Twitter/Schema.org).
- 2026-04-19: Creación inicial.

## Pendientes
- (ninguno)

## Variables de entorno requeridas
- Ninguna (sitio estático)

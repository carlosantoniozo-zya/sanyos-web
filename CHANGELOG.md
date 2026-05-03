## [2026-05-02] — fix: auditoría S14-C — hardcoding y documentación (Ronda 4)
**Archivos:** `server.js`, `.env.example`, `README.md`
**Motivo:** Auditoría S14 fase C — PORT y URL redirect hardcodeados.
**Cambios:**
- PORT y OPS_REDIRECT_URL extraídos a env vars con fallback
- Creado .env.example
- Creado README.md con instrucciones de arranque

## [2026-04-26] — docs: auditoría S14-A discovery
**Cambios:** plans/auditoria-S14-A.md creado.

## [2026-04-25] — docs: crear plans/index-planes.md
**Cambios:** plans/index-planes.md agregado.

## [2026-04-21c] — feat: favicon + registro en zya-changelog
**Cambios:** public/index.html — favicon /logo.png agregado. Registrado en zya-changelog PROYECTOS array.
**Impacto:** Sitio muestra ícono en pestaña del navegador; CHANGELOG visible en cambios.zyaeti.mx.

## [2026-04-21b] — docs: AAP aprobada + ESTADO.md actualizado
**Cambios:** ESTADO.md — historial completo agregado.
**Impacto:** Proyecto 100% conforme con estándar ZYA (AAP 16/16 ítems).

## [2026-04-21] — chore: renombrar botón header a "Portal"
**Cambios:** public/index.html — "ACCESO OPERADORES" → "PORTAL"
**Impacto:** Solo visual, sin cambio funcional.

## [2026-04-20] — feat: SEO para Google Search Console
**Cambios:** robots.txt, sitemap.xml, meta tags OG/Twitter/Schema.org
**Impacto:** Sitio indexable por Google.

## [2026-04-19] — Creación inicial del proyecto

**Motivo:** Portada corporativa para sanyos.mx — dominio adquirido para correo y presencia web de Transportes S.O.N.
**Cambios:** server.js, public/index.html, public/logo.png — servidor Express con landing estática.
**Impacto:** Proyecto nuevo, sin retrocompatibilidad.

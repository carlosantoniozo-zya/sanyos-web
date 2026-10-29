## [2026-10-29] — docs: material de referencia (fotos y video 16-oct)
**Archivos:** docs/ (fotos y video del 16-oct)
**Motivo:** ponerse al día tras reinicio (S1758): material de referencia sin commit
**Cambio:** solo se versionan archivos que ya estaban en disco; sin cambios de lógica.
**Impacto:** ninguno en producción.

## [2026-10-18] — feat: rediseño con video, galería de flota, formulario de cotización y teléfonos
**Archivos:** `public/index.html`, `public/media/*` (3 fotos + video comprimido 720p de 8.5 MB + póster), `server.js`, `package.json` (nodemailer), `.env.example`, `.gitignore`
**Motivo:** Carlos pidió enriquecer la web con las fotos y el video de `docs/` (idea 1, 2, 4 y 5 de la primera ronda).
**Cambio:** portada con foto de flota y botones Cotizar/WhatsApp; sección de video (`preload="none"`); servicios; galería de flota; formulario → `POST /api/cotizar` (honeypot, tope 5/h por IP, validación, guarda en `data/leads.jsonl` y avisa a `contacto@sanyos.mx` por el Postfix local con el buzón `facturas@sanyos.mx`); teléfonos 248 101 8011 y 222 930 4622 (los del video y las unidades) y botón flotante de WhatsApp; `twitter:card` grande y JSON-LD con teléfonos.
**Impacto:** el SMTP va por 127.0.0.1:587 (Mailcow local, puertos públicos de correo siguen cerrados). Requiere `.env` en el servicio (no versionado). Sin datos internos de sanyos-ops publicados.

## [2026-10-17] — feat: direcciones de oficina/domicilio fiscal y patio
**Archivos:** `public/index.html`
**Motivo:** Carlos pidió publicar ambas direcciones (datos de Lucia Romero por WhatsApp).
**Cambio:** bloque visible «Oficina y domicilio fiscal» (Calle Progreso núm. 4) y «Patio de operaciones» (Calle del Llano s/n), ambos San Lucas el Grande, San Salvador el Verde, Puebla, C.P. 74135; JSON-LD con `PostalAddress` completo y `location` de los dos sitios.
**Impacto:** solo contenido estático; resuelve el hallazgo 3 de la auditoría S1497 (PostalAddress incompleto).

## [2026-10-16] — security: cabecera anti-clickjacking (S1683)
**Archivos:** el `server.js` del servicio
**Motivo:** ASEG: sin `X-Frame-Options` (anti-clickjacking).
**Cambio:** middleware `X-Frame-Options: SAMEORIGIN` al inicio (marcador `ZYA-ASEG-HEADERS`).
**Impacto:** la página ya no puede incrustarse desde otros orígenes; sin cambio funcional.

## [2026-09-24] — docs: ESTADO.md al día con la realidad verificada (S1543)
**Archivos:** `ESTADO.md`
**Motivo:** Verificación de documentación vs realidad: ESTADO decía deuda técnica ninguna pese a los hallazgos de la auditoría S1497.
**Cambio:** solo documentación (sección "Actualización S1543" al final de ESTADO.md). **Impacto:** ninguno en runtime.

## [2026-07-12] — docs: auditoría ecosistema F5 — documentación al día
**Motivo:** Auditoría transversal de documentación de todo el ecosistema (código↔doc↔backlog).
**Cambios:**
- `ESTADO.md` — quitado "Favicon ausente" de Pendientes/Deuda técnica/Próximas (ya corregido T199, 2026-07-11). Fecha actualizada a 2026-07-12.
- `plans/index-planes.md` — S14-A/B agregados a CERRADOS (plan huérfano completado desde 2026-05-02).
**Impacto:** Solo documentación. Sin cambios de código ni deploy requerido.

## [2026-07-11] — feat: favicon.ico real conforme a estándar ZYA (T199)
**Archivos:** `public/favicon.ico` (nuevo), `public/index.html`
**Motivo:** El workaround previo (`<link rel="icon" href="/logo.png">`, S14-A 2026-04-21c) usaba el logo completo (388x435, incluye texto "TRANSPORTES S.O.N.") sin `favicon.ico` dedicado — no conforme al estándar ZYA.
**Cambio:** Generado `public/favicon.ico` (16/32/48/64px) recortando el monograma "SY" del logo existente (`public/logo.png`, sin modificar el original). Agregado `<link rel="icon" href="/favicon.ico" type="image/x-icon">` antes del link a logo.png (se conserva como fallback).
**Impacto:** Ninguno funcional. Archivos estáticos servidos por `express.static` — sin rebuild ni restart necesario.

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

## [2026-10-21] — Dependencias: npm audit fix (S1703)
**Motivo:** auditoría de dependencias de todo el ecosistema (74 de 81 proyectos tenían hallazgos).
**Cambios:** `npm audit fix` sin --force en sanyos-web (crítica/alta/moderada/baja antes → después: sanyos-web: 1/0/1/1 → 0/0/0/0). Respaldo previo de package.json y package-lock en backups_zya/ronda2-20261021/deps. Frontends reconstruidos y servicios reiniciados con verificación de /health.
**Impacto:** Solo versiones de dependencias dentro de su rango; sin cambios de código.

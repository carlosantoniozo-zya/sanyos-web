# Auditoría — sanyos-web — 2026-09-03 (S1497)

## 1. Ficha
- **Ruta local:** `C:\Proyectos\sanyos-web`
- **URL pública:** https://sanyos.mx (Cloudflare delante, `Server: cloudflare`)
- **Stack real:** Node + Express 5.2.1 estático puro, sin BD (`package.json:15`, `server.js`)
- **Puerto:** 3850 (`server.js:4`, `PORT = process.env.PORT || 3850`)
- **Proceso PM2:** `sanyos-web`, `status: online`, `uptime: 5D`, `restarts: 0` (verificado con `pm2 describe sanyos-web`)
- **Git:** rama `main`, working tree limpio (`git status`), último commit `3183d6d` 2026-07-28 "docs: corregir documentación desactualizada..." (solo tocó `README.md`, confirmado con `git show --stat`)
- **Cliente:** Transportes S.O.N. / Trans Logistic Sanyos SA de CV — cliente recurrente de ZYA, con `sanyos-ops` (ops.zyaeti.mx) activo en paralelo para este mismo cliente.

## 2. Estado operativo verificado
- `curl -s https://sanyos.mx/health` → `{"status":"ok","service":"sanyos-web","version":"1.0.0","uptime":462369,"timestamp":"2026-09-03T12:19:57.466Z"}` — ✅ correcto y coherente con `server.js:6-8`.
- `curl -I https://sanyos.mx` → `200 OK`, `Cache-Control: no-cache, no-store, must-revalidate`, `Pragma: no-cache`, `Expires: 0` — ✅ conforme al estándar ZYA de no-cache, tanto en meta tags (`public/index.html:6-8`) como en headers de servidor (`server.js:18-27, 29-32`).
- Redirect `ops.sanyos.mx → ops.zyaeti.mx` implementado por Host header (`server.js:10-16`), con `OPS_REDIRECT_URL` en `.env.example` — no se probó en vivo (fuera de alcance sin tocar DNS), queda ❓.

## 3. SEO (ASEO)
Verificado en `public/index.html` (256 líneas) y con curl:
- `robots.txt` ✅ presente, permite `User-agent: * / Allow: /`, referencia `Sitemap: https://sanyos.mx/sitemap.xml`. Bloquea crawlers de entrenamiento IA (GPTBot, Google-Extended, Bytespider, etc.) — gestión Cloudflare Managed, no decisión propia del proyecto.
- `sitemap.xml` ✅ `curl -o /dev/null -w "%{http_code}"` → 200.
- `<title>` ✅ descriptivo: "SANYOS — Transportes S.O.N. | Carga Regional y Larga Distancia" (`index.html:11`).
- `meta description` ✅ presente y específica, con zona de cobertura (`index.html:12`).
- Open Graph ✅ completo: type, locale, url, site_name, title, description, image (`index.html:15-22`).
- Twitter Card ⚠️ presente pero `twitter:card` = `summary` (imagen pequeña), no `summary_large_image` (`index.html:25-28`) — mejora menor, no bloqueante.
- JSON-LD ✅ `LocalBusiness`/`MovingCompany` presente (`index.html:31-48`), pero ⚠️ `PostalAddress` solo trae `addressCountry: MX`, sin calle/ciudad/estado ni `telephone` — Schema.org válido pero pobre para rich snippets locales.
- `<link rel="canonical">` ✅ presente (`index.html:13`).
- `<html lang="es">` ✅ (`index.html:2`).
- Favicon ✅ `favicon.ico` dedicado + fallback `logo.png` (`index.html:9-10`), conforme T199 (2026-07-11).

## 4. Seguridad (ASEG) y formulario de contacto/cotización
- `curl -I https://sanyos.mx` no trae `X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`, `Strict-Transport-Security` ni `Referrer-Policy` a nivel aplicación — ❌ confirmado. `server.js` no usa `helmet` ni configura estos headers manualmente (`grep -n "helmet\|X-Frame"` sin resultados).
- **No hay formulario de contacto ni cotización.** `grep -n "app.post\|nodemailer\|rate-limit"` sobre `server.js` no arrojó resultados — el único canal de contacto es un enlace `mailto:contacto@sanyos.mx` (`index.html:242`). No aplica rate limiting porque no hay endpoint que lo requiera.
- No hay IPs, puertos ni claves hardcodeadas sensibles: el único valor con fallback embebido es `OPS_REDIRECT_URL` (`server.js:13`, `'https://ops.zyaeti.mx'`), que es una URL pública, no un secreto — corregido en la ronda de auditoría S14-C (2026-05-02, ver CHANGELOG).

## 5. Otras auditorías (AHCD, ACAL, AAP, AMON, ACOD, AMET)

| ID | Ítem | Estado | Evidencia |
|----|------|--------|-----------|
| AHCD | Hardcoding de IPs/puertos/keys | ✅ | `server.js:4,13` usan `process.env` con fallback público, no secreto |
| ACAL | Validación de datos de formulario | ❓ N/A | No existe formulario que validar (solo `mailto:`) |
| AAP | CHANGELOG.md coherente y actualizado | ✅ | `CHANGELOG.md` (líneas 1-49), último registro 2026-07-12, coherente con `git log` |
| AAP | ESTADO.md coherente | ✅ | `ESTADO.md:1-42`, última actualización 2026-07-12, sin pendientes activos declarados |
| AAP | CLAUDE.md presente y coherente | ✅ | `CLAUDE.md:1-16`, describe stack y restricciones correctamente |
| AMON | Monitoreo activo | ✅ | ESTADO.md declara integración con ZYA Monitor; `/health` responde correcto |
| ACOD | `.env.example` presente | ✅ | `.env.example:1-2` (`PORT`, `OPS_REDIRECT_URL`) |
| AMET | No-cache en HTML | ✅ | Verificado por headers HTTP y meta tags (sección 2) |

## 6. Producto y negocio (incluye recomendación)
- **Relación comercial viva:** confirmado indirectamente por actividad reciente ligada al cliente en `deseimp/backlog.md` — T268 (2026-08-24, fix de correo saliente `sanyos.mx` vía Brevo), alta de buzones `comercializadora@sanyos.mx` / `direccion@sanyos.mx` en el módulo de conciliación IMAP (backlog.md:288), y el propio favicon T199 (julio 2026). No hay evidencia de facturación directa por `sanyos-web` en los archivos revisados — el cobro parece integrado al paquete general del cliente (correo + `sanyos-ops`), no como línea separada; esto queda ❓.
- **Mantenimiento:** exclusivamente por ZYA — es un sitio estático simple sin CMS ni panel; el cliente no lo toca (confirmado por `CLAUDE.md:12-15`, "no modificar sin autorización").
- **Valor real actual:** la landing es una tarjeta de presentación correcta pero pasiva — no captura leads (solo `mailto:`), no tiene cotizador de rutas, no muestra flota/casos de éxito/certificaciones, y no conecta visualmente con `sanyos-ops` más allá del botón "PORTAL". Para una empresa de transporte de carga (pharma/agro/alimentos), un formulario de solicitud de cotización con captura a base de datos o email transaccional sería la mejora de mayor impacto/costo más bajo.
- **Recomendación: MANTENER.** El sitio cumple su función de presencia pública básica, está técnicamente sano (PM2 estable, SEO completo, sin deuda técnica declarada) y el cliente sigue activo en el ecosistema ZYA. No amerita RETOMAR con inversión grande ni PAUSAR/CERRAR — el riesgo y el costo de mantenerlo son mínimos.
- **Siguiente paso más pequeño:** agregar headers de seguridad básicos vía `helmet` (o manualmente) en `server.js` — cambio de bajo riesgo, sin tocar lógica de negocio ni requerir aprobación del cliente.

## 7. Resumen priorizado (top 5)
1. ❌ Faltan headers de seguridad HTTP a nivel aplicación (X-Frame-Options, nosniff, CSP, HSTS, Referrer-Policy).
2. ❌ No hay formulario de cotización/contacto — solo `mailto:`, sin captura de leads.
3. ⚠️ JSON-LD `PostalAddress` incompleto (sin calle/ciudad/teléfono) — reduce valor de rich snippets locales.
4. ⚠️ `twitter:card` en modo `summary` en vez de `summary_large_image`.
5. ⚠️ Dependencia total de ZYA para cualquier cambio; el cliente no puede autogestionar contenido.

**Conteo:** 20 ✅ · 2 ❌ · 3 ⚠️ · 2 ❓

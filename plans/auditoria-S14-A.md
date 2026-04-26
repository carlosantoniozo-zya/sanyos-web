# Hallazgos de Auditoría — S14-A Discovery
**Proyecto:** `sanyos-web`
**Sesión:** S14-A
**Fecha:** 2026-04-26
**Auditorías aplicadas:** AHCD · ACAL · AAP · AMON · ACOD · ASEO
**Siguiente paso:** Fase S14-B — Plan + Verificación

> **Leyenda:**
> ✅ OK — cumple el estándar ZYA
> ❌ Issue — incumplimiento confirmado solo con lectura
> ⚠️ Sospechoso — parece mal, requiere verificación activa en fase B
> ❓ Sin confirmar — contexto insuficiente para decidir

---

## AHCD — Hardcoding

| ID | Ítem | Estado | Hallazgo | Archivo:Línea |
|----|------|:------:|----------|:-------------:|
| H1 | IPs hardcodeadas (no en .env) | ✅ | Sin IPs en código | — |
| H2 | Puerto sin process.env.PORT | ❌ | `const PORT = 3850;` literal sin process.env | server.js:4 |
| H3 | API keys / tokens en código fuente | ✅ | Sin API keys ni tokens | — |
| H4 | URLs de producción hardcodeadas | ❌ | `'https://ops.zyaeti.mx'` hardcodeada en redirect 301 | server.js:13 |
| H5 | Credenciales de BD en código | ✅ | N/A — sin base de datos | — |
| H6 | Rutas absolutas del sistema hardcodeadas | ✅ | Sin rutas absolutas del sistema | — |
| H7 | Números mágicos en lógica de negocio | ✅ | `301` es código HTTP estándar, no número mágico de negocio | server.js:12 |
| H8 | Teléfonos hardcodeados (deben ir en .env) | ✅ | Sin teléfonos en código | — |

---

## ACAL — Calidad y Bugs

| ID | Ítem | Estado | Hallazgo | Archivo:Línea |
|----|------|:------:|----------|:-------------:|
| Q1 | async/await sin try/catch | ✅ | N/A — sin código async | — |
| Q2 | .then() sin .catch() | ✅ | Sin cadenas de promesas | — |
| Q3 | JSON.parse sin try/catch | ✅ | Sin JSON.parse | — |
| Q4 | == en lugar de === | ✅ | Sin comparaciones — lógica mínima de 34 líneas | — |
| Q5 | Variables declaradas no usadas | ✅ | Sin variables ni funciones sin usar | — |
| Q6 | console.log en código de producción | ✅ | Solo `console.log` en callback de listen — aceptable | server.js:34 |
| Q7 | Queries con concatenación de strings (SQLi) | ✅ | N/A — sin base de datos | — |
| Q8 | Errores genéricos sin información útil | ✅ | N/A — sin rutas de error | — |
| Q9 | Dependencias con vulnerabilidades críticas | ⚠️ | Express `^5.2.1` (versión major en fase beta/pre-release) — verificar estabilidad en fase B | package.json:15 |

---

## AAP — Alta de Proyecto

| ID | Ítem | Estado | Hallazgo | Archivo:Línea |
|----|------|:------:|----------|:-------------:|
| P1 | CLAUDE.md existe y está completo | ✅ | Presente con stack, restricciones y dominio | CLAUDE.md |
| P2 | CHANGELOG.md existe con entradas | ✅ | 5 entradas desde 2026-04-19 | CHANGELOG.md |
| P3 | ESTADO.md existe y está actualizado | ✅ | Actualizado 2026-04-21, refleja estado real | ESTADO.md |
| P4 | .gitignore cubre .env | ✅ | `node_modules/`, `*.log`, `.env` cubiertos | .gitignore |
| P5 | README.md con instrucciones de arranque | ❌ | README.md no existe en el proyecto | — |
| P6 | `<title>` sigue formato ZYA | ✅ | "SANYOS — Transportes S.O.N. | Carga Regional y Larga Distancia" | public/index.html:10 |
| P7 | Meta description presente y descriptiva | ✅ | Descriptiva con áreas de servicio y sectores | public/index.html:11 |
| P8 | `<html lang="es">` | ✅ | Presente | public/index.html:2 |
| P9 | Favicon presente | ⚠️ | Favicon es `/logo.png` (PNG de 388px) — funcional pero no favicon.ico 16/32px optimizado. ESTADO.md lo documenta como pendiente | public/index.html:9 |
| P10 | Cache-Control en HTML (no-cache, no-store) | ✅ | express.static setHeaders aplica no-cache, Pragma, Expires | server.js:18-27 |
| P11 | Widget feedback presente | ✅ | N/A — sitio de cliente, exento por estándar | — |
| P12 | Script zya-about.js presente | ✅ | N/A — sitio de cliente, exento por estándar | — |
| P13 | Registrado en zya-monitor (seedProyectos) | ✅ | `['sanyos-web', 'SANYOS Web', 'sanyos.mx', '🚛', '/health', null, 'local', ...]` | zya-monitor/server.js:139 |
| P14 | Registrado en zya-changelog | ✅ | PROYECTOS array incluye `sanyos-web` | zya-changelog/server.js:21 |
| P15 | Registrado en zya-landing | ✅ | Tarjeta "SANYOS" en landing con link `sanyos.mx` | zya-landing/public/index.html:227 |
| P16 | Registrado en credenciales.md | ❓ | No verificado — sanyos-web no tiene auth propio; requiere confirmar si hay entrada | deseimp/credenciales.md |

---

## AMON — Monitoreo e Integraciones

| ID | Ítem | Estado | Hallazgo | Archivo:Línea |
|----|------|:------:|----------|:-------------:|
| M1 | En seedProyectos de zya-monitor | ✅ | `['sanyos-web', 'SANYOS Web', 'sanyos.mx', ...]` | zya-monitor/server.js:139 |
| M2 | Auto-recovery configurado (tipo: 'local') | ⚠️ | Tipo 'local' presente; verificar si auto-recovery activo en fase B | zya-monitor/server.js:139 |
| M3 | /health responde 200 | ✅ | Endpoint /health con JSON: status, service, version, uptime, timestamp | server.js:6-8 |
| M4 | Logs no exponen datos sensibles | ✅ | Sin logs de datos de usuarios | — |
| M5 | Alertas Telegram/WA configuradas si aplica | ✅ | N/A — sitio estático sin eventos de negocio que notificar | — |
| M6 | Entrada en zya-changelog | ✅ | Registrado en PROYECTOS array de zya-changelog (CHANGELOG 2026-04-21c) | zya-changelog/server.js |
| M7 | PM2 tiene la app configurada | ✅ | Entry `name: 'sanyos-web'` en ecosystem.config.js | ecosystem.config.js:143-146 |
| M8 | PM2 save ejecutado | ❓ | No verificable leyendo código | — |

---

## ACOD — Coherencia Código-Documentación

| ID | Ítem | Estado | Hallazgo | Archivo:Línea |
|----|------|:------:|----------|:-------------:|
| D1 | ESTADO.md = módulos reales en código | ✅ | ESTADO.md refleja fielmente: landing estática, redirect 301, PM2, health endpoint | ESTADO.md |
| D2 | CHANGELOG.md = último cambio real con fecha | ❌ | Último CHANGELOG: 2026-04-21c. Último commit: 2026-04-25 (`docs: crear plans/index-planes.md`) sin entrada en CHANGELOG | CHANGELOG.md |
| D3 | memory/project_*.md = estado auditado | ❓ | No existe `memory/` local en el proyecto | — |
| D4 | conversaciones/\<proyecto\>.md = sesiones reales | ❌ | `deseimp/conversaciones/sanyos-web.md` NO existe | deseimp/conversaciones/ |
| D5 | Plans/ no tiene planes huérfanos | ✅ | Solo `index-planes.md` limpio, sin planes activos ni cancelados | plans/ |
| D6 | package.json version coherente con CHANGELOG | ✅ | `"1.0.0"` coherente con proyecto nuevo iniciado 2026-04-19 | package.json:3 |
| D7 | Puerto en .env = puerto en server.js listen() | ⚠️ | PORT hardcodeado (3850) sin leer de process.env; ESTADO.md dice "Variables: ninguna" — coherente entre sí, pero fuera del estándar ZYA | server.js:4 |
| D8 | Variables en .env.example = variables usadas en código | ✅ | N/A — sin variables de entorno requeridas por el proyecto | — |

---

## ASEO — SEO

| ID | Ítem | Estado | Hallazgo | Archivo:Línea |
|----|------|:------:|----------|:-------------:|
| E1 | robots.txt presente y correcto | ✅ | `Allow: /` + `Sitemap: https://sanyos.mx/sitemap.xml` | public/robots.txt |
| E2 | sitemap.xml presente y accesible | ✅ | 1 URL raíz con lastmod y priority | public/sitemap.xml |
| E3 | Open Graph completo | ✅ | og:type, og:locale, og:url, og:site_name, og:title, og:description, og:image — todos presentes | public/index.html:14-22 |
| E4 | Twitter Card | ✅ | twitter:card, twitter:title, twitter:description, twitter:image — presentes | public/index.html:24-27 |
| E5 | Schema.org JSON-LD | ✅ | `LocalBusiness` + `MovingCompany`, con name, alternateName, address, areaServed | public/index.html:30-47 |
| E6 | canonical | ✅ | `<link rel="canonical" href="https://sanyos.mx/">` | public/index.html:13 |
| E7 | Meta description única y descriptiva | ✅ | Describe sectores atendidos y cobertura geográfica | public/index.html:11 |
| E8 | `<title>` único y descriptivo | ✅ | "SANYOS — Transportes S.O.N. | Carga Regional y Larga Distancia" | public/index.html:10 |
| E9 | Google Search Console verificado | ❓ | No hay evidencia en código — requiere verificación externa en fase B | — |

---

## Resumen de hallazgos

| Categoría | ✅ OK | ❌ Issue | ⚠️ Sospechoso | ❓ Sin confirmar | Total ítems |
|-----------|:-----:|:--------:|:--------------:|:----------------:|:-----------:|
| AHCD | 6 | 2 | 0 | 0 | 8 |
| ACAL | 8 | 0 | 1 | 0 | 9 |
| AAP | 13 | 1 | 1 | 1 | 16 |
| AMON | 6 | 0 | 1 | 1 | 8 |
| ACOD | 4 | 2 | 1 | 1 | 8 |
| ASEO | 8 | 0 | 0 | 1 | 9 |
| **TOTAL** | **45** | **5** | **4** | **4** | **58** |

---

*Generado en auditoría S14-A — 2026-04-26*
*Siguiente fase: S14-B — leer `deseimp/instruccion-auditoria-B.md`*

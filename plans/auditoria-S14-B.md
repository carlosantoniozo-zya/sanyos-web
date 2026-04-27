# Plan de Acción — Auditoría S14-B
**Proyecto:** `sanyos-web`
**Sesión:** S14-B
**Fecha:** 2026-04-26
**Basado en:** `sanyos-web/plans/auditoria-S14-A.md`
**Hallazgos fase A:** 13 a verificar (❌ 5 · ⚠️ 4 · ❓ 4)
**Confirmados:** 6 | **Descartados:** 7
**Estado:** ⏳ PENDIENTE APROBACIÓN CARLOS

> **Leyenda:**
> 🔴 Crítico — seguridad, datos expuestos, service-down
> 🟠 Importante — comportamiento incorrecto, hardcoding, bugs latentes
> 🟡 Menor — documentación, cosmética, mejoras opcionales
> ⏳ PENDIENTE | ✅ APLICADO YYYY-MM-DD | 🟢 DESCARTADO | ⏭️ DIFERIDO

---

## AHCD — Hardcoding

| ID | Ítem | Prioridad | Estado | Verificación | Acción (archivo:línea → cambio exacto) |
|----|------|:---------:|:------:|--------------|----------------------------------------|
| H2 | PORT 3850 literal sin process.env | 🟡 | ⏳ | `server.js:4` — `const PORT = 3850;` confirmado | `server.js:4` → `const PORT = process.env.PORT \|\| 3850;` |
| H4 | URL `ops.zyaeti.mx` hardcodeada en redirect 301 | 🟠 | ⏳ | `server.js:13` — `return res.redirect(301, 'https://ops.zyaeti.mx' + req.url)` confirmado | `server.js:13` → `return res.redirect(301, (process.env.OPS_REDIRECT_URL \|\| 'https://ops.zyaeti.mx') + req.url);`<br>Crear `.env` con `OPS_REDIRECT_URL=https://ops.zyaeti.mx` |

---

## AAP — Alta de Proyecto

| ID | Ítem | Prioridad | Estado | Verificación | Acción (archivo:línea → cambio exacto) |
|----|------|:---------:|:------:|--------------|----------------------------------------|
| P5 | README.md ausente en raíz | 🟡 | ⏳ | Glob `README.md` en raíz → no existe (solo en node_modules) | Crear `sanyos-web/README.md` con: qué es, arranque (`node server.js`), puerto 3850, PM2 name `sanyos-web`, dominio sanyos.mx |
| P9 | Favicon `/logo.png` (388px), no optimizado | 🟡 | ⏳ | `public/index.html:9` — `<link rel="icon" href="/logo.png">` con logo de 388px confirmado (ESTADO.md también lo documenta como pendiente) | Crear `public/favicon.png` (32×32 px) y cambiar `public/index.html:9` → `href="/favicon.png"` |

---

## ACOD — Coherencia Código-Documentación

| ID | Ítem | Prioridad | Estado | Verificación | Acción (archivo:línea → cambio exacto) |
|----|------|:---------:|:------:|--------------|----------------------------------------|
| D2 | CHANGELOG sin entrada para commit 2026-04-25 | 🟡 | ⏳ | `CHANGELOG.md` — último entry 2026-04-21c; commits sin documentar: `docs: crear plans/` (2026-04-25), `docs: auditoría S14-A` (2026-04-26) | `CHANGELOG.md` → agregar entrada `## [2026-04-25] — docs: crear plans/index-planes.md` y `## [2026-04-26] — docs: auditoría S14-A discovery` |
| D4 | `deseimp/conversaciones/sanyos-web.md` no existe | 🟠 | ⏳ | `ls deseimp/conversaciones/` → solo `sanyos-app.md` y `sanyos-ops.md`; `sanyos-web.md` ausente | Crear `deseimp/conversaciones/sanyos-web.md` con las sesiones históricas del proyecto (desde 2026-04-19) |

---

## Ítems descartados (falsos positivos / no verificables)

| ID original | Ítem | Evidencia de descarte |
|-------------|------|-----------------------|
| Q9 | Express ^5.2.1 en fase beta | `npm audit` → 0 vulnerabilidades. Express 5.2.1 es release estable de Express v5 (GA desde oct 2024). |
| M2 | Auto-recovery no verificado | seedProyectos id='sanyos-web', PM2 name='sanyos-web' — coinciden. `pm2 restart sanyos-web` funcionará correctamente. |
| P16 | Sin entrada en credenciales.md | sanyos-web no tiene auth propio ni credenciales de servicio que registrar. No aplica el ítem. |
| D3 | memory/ local por proyecto | Memoria CC es global por diseño (`~/.claude/projects/memory/`), no por proyecto. No aplica. |
| D7 | PORT no en .env | Duplica H2 — mismo hallazgo, misma corrección. ESTADO.md dice "Variables: ninguna" y es coherente consigo mismo; el estándar ZYA requiere process.env.PORT (ya cubierto en H2). |
| M8 | PM2 save ejecutado | No verificable desde código o archivos del proyecto. |
| E9 | Google Search Console verificado | Requiere acceso externo (GSC dashboard). No verificable desde código. |

---

## Lista de correcciones — pendiente aprobación Carlos

| # | ID | Ítem | Prioridad | Archivo:Línea | Fix propuesto | Estado |
|---|----|------|:---------:|:-------------:|---------------|:------:|
| 1 | D4 | conversaciones/sanyos-web.md no existe | 🟠 | deseimp/conversaciones/ | Crear sanyos-web.md con historial desde 2026-04-19 | ⏳ |
| 2 | H4 | URL `ops.zyaeti.mx` hardcodeada | 🟠 | server.js:13 | Mover a process.env.OPS_REDIRECT_URL con fallback | ⏳ |
| 3 | H2 | PORT 3850 literal | 🟡 | server.js:4 | `process.env.PORT \|\| 3850` | ⏳ |
| 4 | P5 | README.md ausente | 🟡 | — (archivo nuevo) | Crear README.md con instrucciones de arranque | ⏳ |
| 5 | P9 | Favicon PNG 388px no optimizado | 🟡 | public/index.html:9 | Crear favicon.png 32px + actualizar link | ⏳ |
| 6 | D2 | CHANGELOG sin entradas recientes | 🟡 | CHANGELOG.md | Agregar entradas 2026-04-25 y 2026-04-26 | ⏳ |

---

## Aprobación de Carlos

*(Llenar cuando Carlos da el visto bueno — antes de arrancar fase C)*

**Aprobado:** —
**Fecha:** —
**Vetos/modificaciones:** —
**Notas:** —

---

*Generado en auditoría S14-B — 2026-04-26*
*Siguiente fase: S14-C — leer `deseimp/instruccion-auditoria-C.md` · requiere aprobación de Carlos*

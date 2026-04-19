# CLAUDE.md — sanyos-web

## Qué es
Landing corporativa estática para sanyos.mx. Portada pública de Transportes S.O.N. / SANYOS.
ops.sanyos.mx redirige 301 a ops.zyaeti.mx (manejado en server.js por Host header).

## Stack
- Node + Express estático, puerto 3850
- Sin base de datos
- PM2: `sanyos-web`

## Restricciones
- Sitio de cliente — no aplica ZYA About ni Feedback Widget
- Logo: public/logo.png (logo real S+Y, no modificar sin autorización)
- Colores: dorado #c9a84c, fondo oscuro #0f0e0c (tema Sanyos)

# sanyos-web

Landing corporativa estática para sanyos.mx — Transportes S.O.N. / SANYOS.

## Stack
- Node.js + Express (estático)
- Puerto: 3850
- PM2: `sanyos-web`
- Dominio: sanyos.mx

## Arranque
```bash
npm install
node server.js
# o vía PM2:
pm2 start ecosystem.config.js --only sanyos-web
```

## Variables de entorno (opcional)
| Variable | Default | Descripción |
|----------|---------|-------------|
| PORT | 3850 | Puerto del servidor |
| OPS_REDIRECT_URL | https://ops.zyaeti.mx | Destino del redirect 301 desde ops.sanyos.mx |

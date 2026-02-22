# POSS - Plataforma POS Moderna

Base profesional para un **sistema POS escalable** con soporte para web, tablet y modo escritorio (PWA/Electron), usando arquitectura modular, segura y preparada para modelo SaaS multi-sucursal.

## Stack técnico

- **Frontend:** Next.js (React) + Tailwind CSS
- **Backend:** Node.js + Express (estilo MVC)
- **BD:** PostgreSQL
- **Seguridad:** JWT, Helmet, Rate Limit, validaciones con Zod
- **Automatización:** Cron diario para detección de cuotas y recordatorios

## Estructura

```text
/backend
  /src
    /config
    /controllers
    /models
    /routes
    /services
    /cron
    /middleware
  /sql/schema.sql
  /tests
/frontend
  /src/app
  /src/components
```

## Mejoras implementadas

- Validación robusta de login y endpoints de crédito/pagos.
- Registro de **pagos a cuotas** con aplicación automática por vencimiento y recálculo de saldo.
- Estados de cuota dinámicos: `PENDIENTE`, `PARCIAL`, `PAGADA`, `VENCIDA`.
- Historial de pagos en tabla `credit_payments`.
- Tabla `settings` para configurar impuestos, moneda, plantillas y preferencias globales.
- Dashboard frontend con panel de notificaciones y contador rojo.
- Página de créditos con botones de acciones WhatsApp por estado.
- Venta transaccional con descuento automático de stock y validación de inventario.
- Endpoints nuevos de reportes (`sales-summary`, `top-products`) y settings globales.
- Tests unitarios para servicio de créditos (`node:test`).

## Cron de notificaciones internas

`notifications.cron.js` ejecuta diariamente:

- cuotas que vencen en 3 días,
- cuotas que vencen hoy,
- cuotas vencidas,
- y guarda historial en `reminder_logs` con URL de WhatsApp generada.

## Inicio rápido

```bash
npm install
npm run dev
```

### Variables recomendadas (backend)

```bash
PORT=4000
JWT_SECRET=super-secret
DATABASE_URL=postgres://postgres:postgres@localhost:5432/poss
TZ=America/Bogota
```

## Testing rápido (sin dependencias externas)

```bash
node --test backend/tests/credit.service.test.mjs
```

## Siguientes pasos sugeridos

- Integrar motor de facturación PDF (58mm, 80mm, carta, A4, etc.).
- Añadir PWA manifest/service-worker y empaquetado Electron.
- Implementar auditoría detallada (logs por acción/usuario).
- Agregar importación masiva Excel y reportes exportables.

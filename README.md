# FLAI Web

Sitio web de FLAI ("La Nube Mexicana"): landing page y portal de navegación de servicios cloud.
El proyecto presenta los servicios, industrias, precios y centro de confianza de FLAI a través de
una experiencia visual (nube 3D) que desemboca en un dashboard de navegación.

## Estructura del repositorio

```
flaiweb/
├── frontend/    # Aplicación web (React + Vite + TypeScript)
└── backend/     # API / servicios (por definir)
```

Cada subproyecto se desarrolla y despliega de forma independiente. La documentación específica de
cada uno vive en su propio directorio.

## Arquitectura del sistema

El sistema sigue una arquitectura cliente–servidor desacoplada:

```
┌─────────────┐        HTTPS / REST        ┌─────────────┐
│   Frontend  │ ─────────────────────────> │   Backend   │
│ React + Vite│ <───────────────────────── │    (API)    │
└─────────────┘          JSON              └─────────────┘
        │                                          │
        │ assets estáticos                         │ persistencia / integraciones
        ▼                                          ▼
   CDN / hosting                              base de datos / servicios
```

### Frontend (`frontend/`)

Capa de presentación. Aplicación de página única (SPA) construida con React, Vite y TypeScript.

- Enrutamiento con React Router.
- Sistema de diseño centralizado en `src/branding/` (tokens, variables CSS, tipografías y reglas
  responsive), consumido tanto por CSS plano como por Tailwind.
- Render 3D con Three.js / React Three Fiber para la sección principal (Hero).
- Shell de dashboard (sidebar, header y área de contenido) para la navegación de servicios.

Detalle completo en [`frontend/README.md`](./frontend/README.md) y
[`frontend/ARCHITECTURE.md`](./frontend/ARCHITECTURE.md).

### Backend (`backend/`)

Capa de servicio. Expondrá una API para el contenido dinámico, formularios de contacto, cotizaciones
y demás integraciones. Pendiente de definir tecnología e implementación.

## Estado

- Frontend: en desarrollo (Hero y shell de dashboard implementados).
- Backend: por iniciar.

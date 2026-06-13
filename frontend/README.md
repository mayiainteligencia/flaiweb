# FLAI — Landing Page (frontend)

Landing page de FLAI ("La Nube Mexicana"). Experiencia de scroll que entra a una nube 3D y
desemboca en un dashboard de navegación de servicios.

## Stack

- **React 18 + Vite + TypeScript**
- **React Router 6** — `<BrowserRouter>` en `main.tsx`, rutas tipadas en `src/constants/routes.ts`
- **Tailwind v3** (build-time, sin costo en runtime) + **variables CSS** del branding. Los colores
  de Tailwind mapean a `var(--...)` en `tailwind.config.js`. Sin librerías de UI externas.
- **Three.js + @react-three/fiber + drei + postprocessing** — nube volumétrica del Hero
- Alias `@/` → `src/`

> Las secciones del Hero usan **CSS plano**; el dashboard usa **Tailwind**. Ambos consumen las
> mismas variables de `branding/`.

## Scripts

```bash
npm install
npm run dev      # servidor de desarrollo (Vite)
npm run build    # tsc -b && vite build
npm run preview  # sirve el build
```

## Arquitectura

La referencia detallada de carpetas está en [`ARCHITECTURE.md`](./ARCHITECTURE.md). Reglas y
convenciones para trabajar en el repo en [`CLAUDE.md`](./CLAUDE.md). Resumen:

```
src/
├── branding/          # Sistema de diseño (única fuente visual)
│   ├── tokens.ts        # Tokens TS
│   ├── theme.css        # Variables CSS globales (:root) — colores, superficies del dashboard, fuentes
│   ├── tailwind.css     # @tailwind base/components/utilities
│   ├── fonts.css        # @font-face
│   └── responsive.css   # ÚNICO archivo de media queries de toda la página (por sección)
│
├── components/
│   ├── layout/          # Shell del dashboard
│   │   ├── DashboardLayout.tsx   # sidebar + header + <main> con scroll independiente
│   │   ├── Sidebar.tsx           # nav data-driven, NavLink, grupos acordeón, colapsable / drawer móvil
│   │   └── Header.tsx            # hamburguesa (móvil) + buscador + "Cotiza ahora"
│   └── sections/        # Secciones del Home
│       ├── Hero.tsx / Hero.css   # Nube 3D + zoom por scroll + whiteout
│       └── Dashboard.tsx         # Monta DashboardLayout tras "entrar" a la nube
│
├── constants/routes.ts  # ROUTES tipadas (servicios, industrias, recursos, etc.)
├── pages/               # Home + páginas de servicio/industria (pendientes de contenido)
└── main.tsx             # Entry: importa CSS de branding, BrowserRouter, monta Home
```

## Secciones implementadas

### Hero (`components/sections/Hero.tsx`)

- **Nube volumétrica** con `<Cloud>` de drei (no es un `.glb`), brillo cálido interno
  (`pointLight` ámbar) y flotación idle lenta.
- **Fondo tech**: negro con degradado rojo radial + rejilla tenue enmascarada.
- **Zoom por scroll**: la sección mide `300vh` con un contenedor *sticky*; al hacer scroll la
  cámara avanza hacia la nube. El progreso se calcula sobre el alto real de la sección (sirve en
  cualquier breakpoint).
- **Overlay** (se desvanece al entrar): logo FLAI centrado, marcas "Hecho en México" + "MAYIA"
  arriba a la izquierda, e indicador de scroll premium (label + haz rojo que cae).
- **Whiteout**: al final del zoom la nube envuelve la pantalla (`hero__fog`) y entrega a la
  siguiente sección con continuidad de color.

### Dashboard (`components/sections/Dashboard.tsx` + `components/layout/`)

Aparece tras el whiteout, en **paleta clara tipo nube** (cream `#f4efe6`) para que la transición no
corte. Es el shell de navegación de la app:

- **Sidebar**: Inicio · grupos acordeón (Servicios Cloud, Industrias, Recursos) · Marketplace ·
  Partners · Trust Center · Precios · Contacto · Configuración (abajo). Badge "Nuevo" en AI Cloud.
  Logo FLAI centrado arriba. Estado activo automático con `NavLink` (rojo de acento).
- **Colapsable** a 64px en desktop (solo íconos); en móvil/tablet se vuelve **drawer** off-canvas
  con backdrop, hamburguesa en el header y cierre al navegar.
- **Header**: buscador (oculto en `<sm`) + botón "Cotiza ahora".
- Íconos: **SVG inline** propios (sin librería, sin emoji).

## Responsive

Todo el comportamiento responsive vive en **`src/branding/responsive.css`**, organizado por sección
con breakpoints: móvil `≤640px`, tablet `≤1024px`, desktop base. El dashboard además usa utilidades
responsive de Tailwind (`sm:` / `lg:`). Se prioriza animar solo `transform`/`opacity` para no
cargar CPU/GPU.

## Branding / favicon

- Paleta: negro `#0A0A0A`, rojo `#FF1A1A`, blanco `#FFFFFF`. Superficies del dashboard y estados en
  `theme.css`.
- **Favicon**: `public/favicon.svg` — logo FLAI sobre cuadrado blanco redondeado (resalta en
  pestañas oscuras), enlazado en `index.html`.

## Pendiente

- Contenido del área principal del dashboard.
- `<Routes>` para las páginas de servicio/industria (los `NavLink` ya apuntan a `ROUTES`).
- Contenido de `data/*` y páginas en `pages/`.

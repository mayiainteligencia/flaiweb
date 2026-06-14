# FLAI — Landing Page (frontend)

Landing page de FLAI ("La Nube Mexicana"). Experiencia de scroll que entra a una nube 3D y
desemboca en un dashboard de navegación de servicios.

## Stack

- **React 18 + Vite + TypeScript**
- **React Router 6** — `<BrowserRouter>` en `main.tsx`, `<Routes>` en `src/App.tsx`, rutas tipadas
  en `src/constants/routes.ts`
- **Tailwind v3** (build-time, sin costo en runtime) + **variables CSS** del branding. Los colores
  de Tailwind mapean a `var(--...)` en `tailwind.config.js`.
- **Three.js + @react-three/fiber + drei + postprocessing** — nube volumétrica del Hero
- **@paper-design/shaders-react** — `MeshGradient` (fondo shader animado del Hero)
- **framer-motion** — micro-animaciones del dashboard (reveal al scroll, indicador del tab bar móvil)
- **lucide-react** — íconos del dashboard (servicios, industrias, tab bar móvil)
- Alias `@/` → `src/`

> Las secciones del Hero usan **CSS plano**; el dashboard usa **Tailwind**. Ambos consumen las
> mismas variables de `branding/`.
>
> **Instalación de deps nuevas:** hay un conflicto de peers preexistente
> (`@react-three/postprocessing@3` pide fiber@9, el proyecto usa fiber@8). Instala con
> `npm i <pkg> --legacy-peer-deps`.

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
│   │   ├── DashboardLayout.tsx   # sidebar + header + <main> con scroll independiente + tab bar móvil
│   │   ├── Sidebar.tsx           # nav data-driven, NavLink, grupos acordeón, colapsable — SOLO desktop (lg+)
│   │   ├── Header.tsx            # logo (móvil / desktop colapsado) + buscador desktop + lupa móvil + CTA
│   │   └── MobileTabBar.tsx      # nav móvil: pill flotante deslizable (framer-motion + lucide)
│   ├── dashboard/       # Contenido del área principal del dashboard
│   │   ├── Overview.tsx          # Inicio: value prop, servicios, On-Prem, industrias, confianza, CTA
│   │   └── serviceIcons.ts       # mapa ServiceIcon → ícono lucide (compartido)
│   └── sections/        # Secciones del Home
│       ├── Hero.tsx / Hero.css   # Nube 3D + shader de fondo + zoom por scroll + whiteout
│       └── Dashboard.tsx         # Monta DashboardLayout + <Overview/> tras "entrar" a la nube
│
├── constants/routes.ts  # ROUTES tipadas (servicios, industrias, recursos, etc.)
├── data/                # Contenido de negocio: services.ts, serviceDetails.ts, industries.ts
├── pages/               # Home, App-routed: services/* (10 fichas), SectionPlaceholder, secciones por construir
├── App.tsx              # <Routes>: "/" = Home (Hero+dashboard); resto = shell del dashboard + <Outlet/>
└── main.tsx             # Entry: importa CSS de branding, BrowserRouter, monta <App/>
```

## Secciones implementadas

### Hero (`components/sections/Hero.tsx`)

- **Nube volumétrica** con `<Cloud>` de drei (no es un `.glb`), billows redondos tipo coliflor,
  brillo cálido interno (`pointLight` ámbar) y flotación idle lenta. Escala responsiva (más chica en
  móvil).
- **Fondo shader animado**: `MeshGradient` de paper-design en negros, rojos y verdes oscuros (capa
  más baja). Encima va una rejilla tenue enmascarada.
- **Zoom por scroll**: la sección mide `300vh` con un contenedor *sticky*; al hacer scroll la
  cámara avanza hacia la nube. El progreso se calcula sobre el alto real de la sección.
- **Overlay** (se desvanece al entrar): logo FLAI centrado, marcas "Hecho en México" + "MAYIA",
  e indicador de scroll premium.
- **Whiteout**: al final del zoom la nube envuelve la pantalla (`hero__fog`) y entrega al dashboard.
- **Rendimiento**: el Canvas 3D capa `dpr=[1,1.5]` + `antialias:false`; el shader limita resolución
  con `maxPixelCount`. Un `IntersectionObserver` **pausa** ambos (Canvas `frameloop="never"`, shader
  `speed=0`) cuando el Hero sale de vista — evita tirones al volver desde el dashboard.

### Dashboard (`components/sections/Dashboard.tsx` + `components/layout/` + `components/dashboard/`)

Aparece tras el whiteout, en **paleta clara tipo nube** (cream `#f4efe6`). Es el shell de navegación
y también la envoltura (`DashboardLayout` + `<Outlet/>`) de las páginas ruteadas:

- **Sidebar (solo desktop, `lg+`)**: Inicio · grupos acordeón (Servicios Cloud, Industrias,
  Recursos) · Marketplace · Partners · Trust Center · Precios · Contacto · Configuración. Badge
  "Nuevo" en AI Cloud. Colapsable a 64px (solo íconos); al colapsar, el logo pasa al header.
- **MobileTabBar (`<lg`)**: pill flotante en la parte inferior, deslizable horizontalmente con las 9
  secciones (íconos lucide), indicador con spring de framer-motion, auto-centra el activo. Solo
  aparece cuando el dashboard entra en vista (no se ve sobre el Hero).
- **Header**: logo (en móvil siempre; en desktop solo si el sidebar está colapsado) + buscador
  centrado en desktop + lupa que abre el buscador en móvil + botón "Cotiza ahora".
- **Inicio** (`components/dashboard/Overview.tsx`): contenido principal con value prop, grid de los
  10 servicios, banda On-Prem, industrias, confianza y CTAs. Reveal al scroll con framer-motion.
- Íconos: **lucide-react** (dashboard) y **SVG inline** propios (sidebar/hero).

### Páginas de servicio (`pages/services/`)

Las 10 familias usan `_ServicePageTemplate.tsx` (recibe un `slug`). El template arma la ficha del
doc (sección 12): encabezado, "qué incluye" / "casos de uso", beneficios, seguridad + precio y CTA.
Contenido en `data/services.ts` (slug, nombre, tagline, ícono, ruta) y `data/serviceDetails.ts`
(ficha completa por slug). Cada página (`Compute.tsx`, etc.) solo pasa su `slug`.

### Ruteo (`App.tsx`)

- `/` → `Home` (Hero + Dashboard con `<Overview/>`).
- Resto de rutas → layout `DashboardLayout` con `<Outlet/>` (shell sin Hero). Incluye las 10 rutas
  de servicio; cualquier sección aún no construida cae en `SectionPlaceholder` ("en construcción").

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

- Secciones aún en placeholder: Industrias, Marketplace, Trust Center, Precios, Recursos, Contacto
  (los `NavLink` ya apuntan a `ROUTES`; hoy caen en `SectionPlaceholder`).
- Páginas de industria reales (las rutas de industria existen, falta su template/contenido).
- `data/pricing.ts` (paquetes de la sección 10 del doc) — archivo aún vacío.
- Code-splitting: el bundle supera 500 kB por Three + framer-motion (candidato a `lazy` del Hero).

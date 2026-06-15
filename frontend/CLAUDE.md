# CLAUDE.md — FLAI Landing Page (frontend)
> Reglas específicas de este proyecto. Se suman a las reglas globales de `~/.claude/CLAUDE.md`.

## Stack
- React + Vite + TypeScript
- React Router (rutas en `src/constants/routes.ts`, `<Routes>` en `src/App.tsx`, `<BrowserRouter>` en `main.tsx`)
- Tailwind v3 + variables CSS del branding. Secciones del Hero usan CSS plano; el dashboard usa Tailwind. Los colores Tailwind mapean a `var(--...)` en `tailwind.config.js`.
- Three.js / R3F / drei / postprocessing para el Hero 3D; `@paper-design/shaders-react` (MeshGradient) para el fondo del Hero
- `framer-motion` (animaciones del dashboard) y `lucide-react` (íconos del dashboard)
- Alias `@/` → `src/`
- **Instalar deps nuevas con `--legacy-peer-deps`** (conflicto preexistente postprocessing@3 ↔ fiber@8).

## Mapa del proyecto
La arquitectura completa está en `ARCHITECTURE.md`. **Léelo antes de crear o mover archivos.** Resumen de dónde toco qué:

| Cambiar...                         | Archivo                                   |
|------------------------------------|-------------------------------------------|
| Color / tipografía / espaciado     | `src/branding/tokens.ts` + `theme.css`    |
| Nombre/tagline/ícono/ruta de un servicio | `src/data/services.ts`              |
| Ficha (incluye, casos, beneficios, seguridad, precio) de un servicio | `src/data/serviceDetails.ts` |
| Copy de un paquete de precio       | `src/data/pricing.ts` (vacío aún)         |
| Industrias (lista/íconos/rutas)    | `src/data/industries.ts`                  |
| Estructura de página de servicio   | `src/pages/services/_ServicePageTemplate.tsx` |
| Contenido de Inicio del dashboard  | `src/components/dashboard/Overview.tsx`   |
| Mapa ServiceIcon → lucide          | `src/components/dashboard/serviceIcons.ts`|
| Una sección del Home               | `src/components/sections/`                |
| Orden de secciones del Home        | `src/pages/Home.tsx`                       |
| Rutas / qué renderiza cada path    | `src/App.tsx`                             |
| Shell del dashboard (sidebar/header/tab bar móvil) | `src/components/layout/`  |
| Una ruta (constante)               | `src/constants/routes.ts`                 |
| Imagen / ícono                     | `src/assets/`                             |
| Algo responsive (cualquier sección)| `src/branding/responsive.css`             |
| Superficies/colores del dashboard  | `src/branding/theme.css` (tokens `--surface-*`) |
| Nube 3D / shader / zoom / whiteout | `src/components/sections/Hero.tsx`        |

## Reglas del proyecto
- **Nada de valores hardcodeados de estilo.** Colores, fuentes, radios y sombras siempre vía `var(--...)` que salen de `tokens.ts`.
- **Contenido de negocio (copy, precios, nombres) solo en `src/data/`.** Los componentes reciben todo por props o importan de `data/`, nunca texto hardcodeado.
- **Componentes en `components/` no conocen el negocio.** Excepción: los que arman navegación/contenido desde `data/` (Sidebar, MobileTabBar, `dashboard/Overview`).
- **Íconos del dashboard:** lucide-react. El mapa `ServiceIcon → componente lucide` vive en `components/dashboard/serviceIcons.ts` (no duplicar). El Hero y el Sidebar usan SVG inline propios.
- **Las 10 páginas de servicio usan `_ServicePageTemplate.tsx`.** No repetir estructura.
- **Rutas siempre desde `routes.ts`**, nunca strings sueltos en links.
- **Nada de código spaghetti.** Componentes pequeños y con una sola responsabilidad. Si un archivo crece o anida demasiado, extraer en piezas según la arquitectura.
- **Comentarios solo los necesarios.** Comentar el porqué en partes no obvias o importantes, no narrar lo que el código ya dice. Sin comentarios de relleno.
- **Todo lo responsive va en `branding/responsive.css`** (agrupado por sección), salvo utilidades `sm:`/`lg:` de Tailwind en componentes del dashboard.
- **Rendimiento:** animar solo `transform`/`opacity` (evitar width/height/top/left continuos), respetar `prefers-reduced-motion`. No cargar CPU/GPU/RAM del usuario.
- **Tailwind solo en el dashboard;** Hero y demás secciones, CSS plano. Ambos consumen las mismas variables del branding.

## Estado actual
- **Hero**: nube volumétrica (drei) con billows tipo coliflor + brillo interno; **fondo shader** `MeshGradient` (negros/rojos/verdes oscuros) + rejilla; zoom por scroll (`300vh` sticky); overlay; **whiteout** al dashboard. Perf: Canvas `dpr=[1,1.5]`/`antialias:false`, shader `maxPixelCount`, y **pausa** de ambos vía `IntersectionObserver` cuando el Hero sale de vista.
- **Ruteo (`App.tsx`)**: `/` = Home (Hero + Dashboard con `<Overview/>`); el resto va dentro de `DashboardLayout` + `<Outlet/>`. Secciones sin construir → `SectionPlaceholder`.
- **Dashboard**: `DashboardLayout` = Sidebar (solo `lg+`, colapsable) + Header (logo móvil/colapsado, buscador desktop, lupa móvil) + `<main>` + `MobileTabBar` (pill flotante `<lg`, framer-motion, visible solo cuando el dashboard entra en vista). Inicio en `components/dashboard/Overview.tsx`.
- **Páginas de servicio (10)**: `_ServicePageTemplate.tsx` + `data/serviceDetails.ts`; cada página pasa su `slug`.
- **Páginas generales**: Industries, Marketplace, TrustCenter, Pricing, Contact, Recursos (en `pages/`), montadas en `App.tsx`. Encabezado común en `components/ui/PageHeader.tsx`. Industrias = catálogo único en `/industries/*` (sin páginas por sector aún); Recursos sirve DOCS/WHITEPAPERS/BLOG. Iconos de industria en `components/dashboard/industryIcons.ts` (compartido con Overview).
- **Datos**: `data/industries.ts` (con `tagline`/`workloads`) y `data/pricing.ts` (`PLANS` + `PRICE_COMPONENTS`).
- **Infra:** Tailwind v3 + PostCSS, BrowserRouter, favicon en `public/favicon.svg`.
- **Pendiente:** páginas por sector de Industrias, Partners (hoy placeholder), status page real del Trust Center, backend del form de Contacto, code-splitting del bundle.

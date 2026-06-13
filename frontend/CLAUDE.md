# CLAUDE.md — FLAI Landing Page (frontend)
> Reglas específicas de este proyecto. Se suman a las reglas globales de `~/.claude/CLAUDE.md`.

## Stack
- React + Vite + TypeScript
- React Router (rutas en `src/constants/routes.ts`, `<BrowserRouter>` en `main.tsx`)
- Tailwind v3 + variables CSS del branding (sin librería de UI externa). Secciones del Hero usan CSS plano; el dashboard usa Tailwind. Los colores Tailwind mapean a `var(--...)` en `tailwind.config.js`.
- Three.js / R3F / drei / postprocessing para el Hero 3D
- Alias `@/` → `src/`

## Mapa del proyecto
La arquitectura completa está en `ARCHITECTURE.md`. **Léelo antes de crear o mover archivos.** Resumen de dónde toco qué:

| Cambiar...                         | Archivo                                   |
|------------------------------------|-------------------------------------------|
| Color / tipografía / espaciado     | `src/branding/tokens.ts` + `theme.css`    |
| Copy / precio de un servicio       | `src/data/services.ts`                    |
| Copy de un paquete de precio       | `src/data/pricing.ts`                     |
| Estructura de página de servicio   | `src/pages/services/_ServicePageTemplate.tsx` |
| Una sección del Home               | `src/components/sections/`                |
| Orden de secciones del Home        | `src/pages/Home.tsx`                       |
| Navbar / Footer                    | `src/components/layout/`                   |
| Una ruta                           | `src/constants/routes.ts`                 |
| Imagen / ícono                     | `src/assets/`                             |
| Algo responsive (cualquier sección)| `src/branding/responsive.css`             |
| Superficies/colores del dashboard  | `src/branding/theme.css` (tokens `--surface-*`) |
| Shell del dashboard (sidebar/header)| `src/components/layout/`                  |
| Nube 3D / zoom / whiteout          | `src/components/sections/Hero.tsx`        |

## Reglas del proyecto
- **Nada de valores hardcodeados de estilo.** Colores, fuentes, radios y sombras siempre vía `var(--...)` que salen de `tokens.ts`.
- **Contenido de negocio (copy, precios, nombres) solo en `src/data/`.** Los componentes reciben todo por props o importan de `data/`, nunca texto hardcodeado.
- **Componentes en `components/` no conocen el negocio.** Si un componente importa data directamente (salvo Navbar/Footer que arman menús desde `data/`), está mal ubicado.
- **Las 10 páginas de servicio usan `_ServicePageTemplate.tsx`.** No repetir estructura.
- **Rutas siempre desde `routes.ts`**, nunca strings sueltos en links.
- **Nada de código spaghetti.** Componentes pequeños y con una sola responsabilidad. Si un archivo crece o anida demasiado, extraer en piezas según la arquitectura.
- **Comentarios solo los necesarios.** Comentar el porqué en partes no obvias o importantes, no narrar lo que el código ya dice. Sin comentarios de relleno.
- **Todo lo responsive va en `branding/responsive.css`** (agrupado por sección), salvo utilidades `sm:`/`lg:` de Tailwind en componentes del dashboard.
- **Rendimiento:** animar solo `transform`/`opacity` (evitar width/height/top/left continuos), respetar `prefers-reduced-motion`. No cargar CPU/GPU/RAM del usuario.
- **Tailwind solo en el dashboard;** Hero y demás secciones, CSS plano. Ambos consumen las mismas variables del branding.

## Estado actual
- **Hero** implementado: nube volumétrica (drei, no `.glb`) con brillo interno, fondo tech (degradado rojo + rejilla), zoom por scroll (sección `300vh` sticky), overlay que se desvanece (logo FLAI, marcas Hecho en México + MAYIA, indicador de scroll), y **whiteout** que entrega al dashboard.
- **Dashboard** implementado: `DashboardLayout` (sidebar + header + main con scroll propio) en paleta clara tipo nube. Sidebar data-driven con NavLink, grupos acordeón, colapsable en desktop y drawer en móvil. Montado en `Dashboard.tsx` tras el zoom.
- **Infra:** Tailwind v3 + PostCSS, BrowserRouter, favicon en `public/favicon.svg`.
- **Pendiente:** contenido del área principal del dashboard, `<Routes>` por página, contenido de `data/*` y `pages/`.

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
  - **Auto-zoom (sin pedir scroll):** a los ~1.6 s la nube se acerca sola (tween `requestAnimationFrame`, smoothstep) y entra al dashboard. Rueda/touch/teclado o **clic en el logo** lo cancelan (`autoCancelledRef`). Respeta `prefers-reduced-motion` (no auto-anima). Logo grande y centrado en el cuerpo de la nube.
- **Ruteo (`App.tsx`)**: `/` = Home (Hero + Dashboard con `<Overview/>`); el resto va dentro de `DashboardLayout` + `<Outlet/>`. Secciones sin construir → `SectionPlaceholder`.
- **Dashboard**: `DashboardLayout` = Sidebar (solo `lg+`, colapsable) + Header + `<main>` + `MobileTabBar` (pill flotante `<lg`, framer-motion, visible solo cuando el dashboard entra en vista). Inicio en `components/dashboard/Overview.tsx`. **Superficies claras** (no se pasó a tema oscuro; decisión del usuario).
  - **Sidebar**: fondo `var(--sidebar-gradient)` (rojo oscuro→grafito→negro), texto claro; ítems resaltan en hover (slide + fondo translúcido) y activos con borde rojo + glow. Logo con `.logo-glow` (latido rojo, definido en `theme.css`).
  - **Header** (`layout/Header.tsx`): toggle de colapso = círculo rojo con chevron (recibe `onToggle` del layout); **barra de asistente** (`SearchBox`) píldora grafito con ✦ Sparkles + botón `IA`; acciones rápidas WhatsApp/Email/Llamar (píldoras outline, hover rojo) desde `data/contact.ts` (placeholders) + chip de fecha de hoy.
  - **SearchBox = dos modos:** *Buscar* (lupa, resultados del sitio) e *IA* (botón IA toggle → barra con borde rojo + panel "Asistente FLAi" con prompts que abren el **Asesor Cloud** `ROUTES.ADVISOR`; no hay backend de chat).
- **Páginas de servicio (10)**: `_ServicePageTemplate.tsx` + `data/serviceDetails.ts`; cada página pasa su `slug`.
- **Páginas generales**: Industries, Marketplace, TrustCenter, Pricing, Contact, Recursos (en `pages/`), montadas en `App.tsx`. Encabezado común en `components/ui/PageHeader.tsx`. Industrias = catálogo único en `/industries/*` (sin páginas por sector aún); Recursos sirve DOCS/WHITEPAPERS/BLOG. Iconos de industria en `components/dashboard/industryIcons.ts` (compartido con Overview).
- **Datos**: `data/industries.ts` (con `tagline`/`workloads`) y `data/pricing.ts` (`PLANS` + `PRICE_COMPONENTS`).
- **Marca (tokens en `branding/theme.css`):**
  - **Paleta:** Negro profundo `--color-black #050608` (base/fondos), Grafito `--color-graphite #0B0E12` (paneles), Rojo FLAI `--color-red #FF2A2A` (acento), Verde nube `--color-green #B7FF00` (datos/disponibilidad, usar sobre oscuro), Plata `--color-silver #B8C0CA` (infra), Blanco operativo `--color-white #F4F7FA` (texto), Gris nodo `--text-secondary #66707D`. `--color-status-ok` queda en `#22c55e` por legibilidad sobre el dashboard claro.
  - **Tipografía:** Títulos `--font-heading` (Helvetica Neue → Open Sauce → Arial), texto `--font-body` (Gordita → **Poppins** vía Google Fonts en `index.html` → system-ui). `h1–h6` heredan heading; utilidades Tailwind `font-heading`/`font-body`. Gordita y Open Sauce no son webfonts libres (pendiente hostear con licencia).
- **Infra:** Tailwind v3 + PostCSS, BrowserRouter, favicon en `public/favicon.svg`.
- **Pendiente:** páginas por sector de Industrias, Partners (hoy placeholder), status page real del Trust Center, backend del form de Contacto, **datos reales de contacto** (`data/contact.ts` son placeholders), **chat IA real** (hoy el modo IA abre el Asesor Cloud), hostear fuentes Gordita/Open Sauce con licencia, code-splitting del bundle.

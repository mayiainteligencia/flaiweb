# Arquitectura FLAI Landing Page
> Documento de referencia para desarrollo. Si necesitas modificar algo, este archivo te dice exactamente dónde ir.

---

## `src/assets/`
Archivos estáticos. Nunca contienen lógica.

```
assets/
├── images/
│   ├── hero/           # Imágenes del banner principal (fondos, ilustraciones grandes)
│   ├── services/       # Una imagen por servicio (compute, storage, AI, etc.)
│   ├── industries/     # Imágenes por industria (banca, salud, gobierno, etc.)
│   └── logos/          # Logos de clientes, partners y certificaciones (ISO, SOC2, etc.)
├── icons/              # SVGs propios de FLAI (íconos de servicios, flechas, etc.)
└── fonts/              # Archivos .woff2 de las tipografías (Inter, Satoshi, etc.)
```

**Regla:** si es una imagen o ícono, va aquí. Los componentes los importan con `import logo from '@/assets/logos/aws.svg'`.

---

## `src/branding/`
**El único lugar que tocas cuando cambia algo visual.**
Si el cliente dice "cambia el azul a verde" o "nueva tipografía" → solo este folder.

```
branding/
├── tokens.ts     # Fuente de verdad: colores, tipografía, espaciados, sombras, radios
├── theme.css     # Convierte tokens.ts en variables CSS globales (:root { --color-accent: ... })
└── fonts.css     # @font-face para cargar las fuentes de /assets/fonts/
```

### `tokens.ts`
Define TODO el sistema de diseño como objetos TypeScript exportados:
- `colors` → primario, acento, superficies, texto, errores
- `typography` → familias, tamaños (xs → 6xl), pesos
- `spacing` → separación entre secciones, padding de cards
- `radii` → bordes redondeados de botones y cards
- `shadows` → sombras de elevación

### `theme.css`
Traduce `tokens.ts` a variables CSS que usan los componentes:
```css
:root {
  --color-accent: #00C2FF;
  --font-display: 'Satoshi', sans-serif;
  --radius-md: 0.75rem;
}
```
Los componentes usan `var(--color-accent)`, nunca valores hardcodeados.

### `fonts.css`
Declara las fuentes locales para que el browser las cargue desde `/assets/fonts/`.

---

## `src/components/`
Piezas visuales. Estructura **real** (la planeada con Navbar/Footer/ui-atoms no se usó: la app es
una experiencia Hero→dashboard, no una landing de secciones apiladas).

```
components/
├── layout/                  # Shell del dashboard (Tailwind)
│   ├── DashboardLayout.tsx  # Sidebar + Header + <main> con scroll propio + MobileTabBar; envuelve <Outlet/>
│   ├── Sidebar.tsx          # Nav data-driven (NavLink, grupos acordeón, colapsable) — SOLO desktop (lg+)
│   ├── Header.tsx           # Logo (móvil / desktop colapsado) + buscador desktop + lupa móvil + CTA
│   └── MobileTabBar.tsx     # Nav móvil (<lg): pill flotante deslizable, framer-motion + lucide
│
├── dashboard/               # Contenido del área principal del dashboard
│   ├── Overview.tsx         # "Inicio": value prop, servicios, On-Prem, industrias, confianza, CTA
│   └── serviceIcons.ts      # Mapa ServiceIcon → ícono lucide (compartido por Overview y el template)
│
└── sections/                # Secciones del Home (CSS plano)
    ├── Hero.tsx / Hero.css  # Nube 3D (drei) + fondo shader (MeshGradient) + zoom por scroll + whiteout
    └── Dashboard.tsx        # Monta DashboardLayout + <Overview/> tras "entrar" a la nube
```

**Regla:** los componentes no conocen el negocio, salvo los que arman navegación/contenido desde
`data/` (Sidebar, MobileTabBar, dashboard/Overview). Los íconos del dashboard son lucide-react; el
Hero y el Sidebar usan SVG inline propios.

---

## `src/pages/`
Cada ruta de la app. Los pages ensamblan secciones y componentes, y les pasan data desde `/data/`.

```
pages/
├── Home.tsx                    # "/" → <Hero/> + <Dashboard/> (la nube y luego el shell con Inicio)
│
├── services/                   # ✅ HECHO — las 10 fichas
│   ├── _ServicePageTemplate.tsx  # Template: recibe { slug }. Lee data/services + data/serviceDetails
│   │                               y arma la ficha del doc (incluye/casos/beneficios/seguridad/precio/CTA)
│   ├── Compute.tsx               # Cada página solo hace <ServicePage slug="compute" />
│   ├── PrivateCloud.tsx … AICloud.tsx
│
├── SectionPlaceholder.tsx      # "En construcción" — catch-all de secciones aún sin armar
│
└── (vacíos / sin usar aún)     # Industries, TrustCenter, Pricing, Marketplace, Contact
                                #   existen como archivos vacíos; hoy esas rutas caen en SectionPlaceholder
```

> El ruteo NO vive en `main.tsx` ni en cada page: está centralizado en `src/App.tsx` (ver abajo).

### `_ServicePageTemplate.tsx`
Template interno (no es una ruta). Recibe **`{ slug }`**, busca el servicio en
`data/services.ts` (`SERVICE_BY_SLUG`) y su ficha en `data/serviceDetails.ts`, y renderiza:
1. Encabezado: ícono + nombre + badge + tagline + "para qué sirve" + CTAs
2. "Qué incluye" / "Casos de uso" (dos columnas)
3. Beneficios de negocio (grid)
4. Seguridad y cumplimiento + Modelo de precio
5. CTA final

> La "arquitectura de referencia" (punto 7 del doc) aún no se renderiza; agregar campo a
> `ServiceDetail` si se necesita.

---

## `src/data/`
El contenido de negocio en texto. **Si cambia copy, precios o nombres, solo se toca aquí.**

```
data/
├── services.ts        # Las 10 familias: slug, nombre, tagline, ícono (clave), ruta, badge.
│                        Exporta SERVICES y SERVICE_BY_SLUG.
├── serviceDetails.ts  # Ficha por slug: problem, includes[], useCases[], benefits[], security[], pricingNote
├── industries.ts      # Las 6 industrias con página: nombre, ruta, ícono (clave)
└── pricing.ts         # ⛳ vacío — los 6 paquetes FLAI (sección 10 del doc) van aquí
```

### Por qué aquí y no en los componentes
- `ServicesGrid.tsx` hace `import { services } from '@/data/services'` y mapea el array → no tiene texto hardcodeado
- `Navbar.tsx` también importa `services` para construir el mega-menu automáticamente
- Agregar un servicio nuevo = agregar un objeto al array en `services.ts`. Todo lo demás se actualiza solo.

---

## `src/constants/`
Valores que no son contenido ni branding, sino configuración técnica de la app.

```
constants/
└── routes.ts     # Todas las rutas de la app como constantes tipadas
                  # ej: export const ROUTES = { HOME: '/', COMPUTE: '/services/compute', ... }
                  # Todos los NavLink importan de aquí, nunca strings hardcodeados
```

---

## `src/App.tsx`
Define el `<Routes>` central:
- `path="/"` → `<Home/>` (Hero + Dashboard con `<Overview/>`).
- Ruta layout (sin path) con `element=<DashboardLayout><Outlet/></DashboardLayout>` → todas las
  páginas internas comparten el shell (sidebar/header/tab bar) sin Hero. Dentro: las 10 rutas de
  servicio y un `path="*"` → `<SectionPlaceholder/>` para lo no construido.

## `src/main.tsx`
Entry point. Solo: (1) importa CSS de `branding/`, (2) envuelve en `<BrowserRouter>`, (3) monta
`<App/>` en el DOM. El ruteo vive en `App.tsx`, no aquí.

---

## Resumen: ¿dónde toco qué?

| Necesito cambiar...                        | Voy a...                          |
|--------------------------------------------|-----------------------------------|
| Un color, tipografía o espaciado           | `branding/tokens.ts` + `theme.css`|
| Nombre/tagline/ícono/ruta de un servicio   | `data/services.ts`                |
| La ficha (incluye/casos/beneficios/seguridad/precio) | `data/serviceDetails.ts`|
| El copy de un paquete de precio            | `data/pricing.ts`                 |
| Industrias (lista/íconos/rutas)            | `data/industries.ts`              |
| La estructura visual de la página de servicio | `pages/services/_ServicePageTemplate.tsx` |
| El contenido de Inicio del dashboard       | `components/dashboard/Overview.tsx` |
| El shell (sidebar / header / tab bar móvil)| `components/layout/`              |
| Qué renderiza cada ruta                    | `App.tsx`                         |
| Una sección del Home (Hero / Dashboard)    | `components/sections/`            |
| Una ruta (constante)                       | `constants/routes.ts`             |
| Una imagen o ícono                         | `assets/images/` o `assets/icons/`|
| Las fuentes                                | `assets/fonts/` + `branding/fonts.css` |

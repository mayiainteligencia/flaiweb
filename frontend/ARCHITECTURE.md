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
Piezas visuales reutilizables. **No saben nada del negocio**, solo reciben props y renderizan.

```
components/
├── layout/
│   ├── Navbar.tsx          # Barra de navegación con mega-menu de servicios
│   └── Footer.tsx          # Footer con links, redes, legal y certificaciones
│
├── ui/                     # Átomos: los bloques más pequeños
│   ├── Button.tsx          # Botón con variantes: primary, secondary, ghost
│   ├── Badge.tsx           # Etiqueta pequeña (ej: "Nuevo", "Enterprise", "IA")
│   ├── Card.tsx            # Card genérica con slot para ícono, título, descripción y CTA
│   └── SectionWrapper.tsx  # Contenedor con max-width y padding consistente para cada sección
│
└── sections/               # Secciones del Home únicamente
    ├── Hero.tsx            # Banner principal: claim, subtítulo, CTAs y visual de fondo
    ├── ServicesGrid.tsx    # Grid con las 10 familias de servicios (íconos + nombre + descripción corta)
    ├── Industries.tsx      # Carrusel o grid de industrias: gobierno, banca, salud, manufactura...
    ├── TrustBar.tsx        # Barra de confianza: logos de certs, "datos en México", "soporte 24/7"
    ├── AICloud.tsx         # Sección destacada de FLAI AI Cloud (GPU, MLOps, agentes MAYIA)
    ├── OnPrem.tsx          # Sección destacada de FLAI On-Prem Cloud
    └── CTABanner.tsx       # Banner final: "Agenda un diagnóstico cloud soberano" + botón
```

**Regla:** si un componente necesita importar datos de negocio directamente (no via props), está en el lugar equivocado.

---

## `src/pages/`
Cada ruta de la app. Los pages ensamblan secciones y componentes, y les pasan data desde `/data/`.

```
pages/
├── Home.tsx                    # Página principal: importa y ordena todas las sections/
│
├── services/
│   ├── _ServicePageTemplate.tsx  # Template genérico que todas las páginas de servicio usan
│   │                               Recibe props: nombre, subtítulo, casos de uso, qué incluye,
│   │                               precio, CTA, imagen. Renderiza la estructura estándar del doc.
│   ├── Compute.tsx               # Importa data de services.ts y pasa props a _ServicePageTemplate
│   ├── PrivateCloud.tsx
│   ├── OnPremCloud.tsx
│   ├── Kubernetes.tsx
│   ├── Storage.tsx
│   ├── Databases.tsx
│   ├── Networking.tsx
│   ├── Security.tsx
│   ├── BackupDRP.tsx
│   └── AICloud.tsx
│
├── Industries.tsx              # Página de industrias con filtro por sector
├── TrustCenter.tsx             # Certificaciones, SLA, status page, políticas, cumplimiento
├── Pricing.tsx                 # 6 paquetes + calculadora + componentes de precio
├── Marketplace.tsx             # Catálogo de soluciones de partners certificados
└── Contact.tsx                 # Formulario de diagnóstico, agenda con arquitecto, PoC
```

### `_ServicePageTemplate.tsx`
El underscore indica que es un template interno, no una ruta directa.
Todas las páginas de `/services/` lo usan para no repetir la misma estructura 10 veces.
La estructura que implementa es:
1. Nombre del servicio
2. Subtítulo (beneficio en una frase)
3. Para qué sirve
4. Casos de uso por industria
5. Qué incluye (componentes técnicos)
6. Beneficios de negocio
7. Arquitectura de referencia
8. Seguridad y cumplimiento
9. Modelo de precio
10. CTA

---

## `src/data/`
El contenido de negocio en texto. **Si cambia copy, precios o nombres, solo se toca aquí.**

```
data/
├── services.ts     # Array con los 10 servicios: nombre, slug, descripción, ícono, casos de uso,
│                     qué incluye, CTA, imagen, ruta de página
├── industries.ts   # Array con las 9 industrias: nombre, descripción, servicios relevantes, imagen
└── pricing.ts      # Los 6 paquetes FLAI: nombre, para quién, qué incluye, CTA
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
                  # Los links del Navbar y Footer importan de aquí, nunca strings hardcodeados
```

---

## `src/main.tsx`
Entry point de la app. Solo hace tres cosas:
1. Importa `branding/theme.css` y `branding/fonts.css` (aplica el sistema de diseño globalmente)
2. Configura React Router con las rutas definidas en `constants/routes.ts`
3. Monta la app en el DOM

---

## Resumen: ¿dónde toco qué?

| Necesito cambiar...                        | Voy a...                          |
|--------------------------------------------|-----------------------------------|
| Un color, tipografía o espaciado           | `branding/tokens.ts` + `theme.css`|
| El copy de un servicio o su CTA            | `data/services.ts`                |
| El copy de un paquete de precio            | `data/pricing.ts`                 |
| La estructura visual de la página de servicio | `pages/services/_ServicePageTemplate.tsx` |
| Una sección del Home                       | `components/sections/NombreSección.tsx`   |
| El orden de secciones del Home             | `pages/Home.tsx`                  |
| El Navbar o Footer                         | `components/layout/`              |
| Una ruta de la app                         | `constants/routes.ts`             |
| Una imagen o ícono                         | `assets/images/` o `assets/icons/`|
| Las fuentes                                | `assets/fonts/` + `branding/fonts.css` |

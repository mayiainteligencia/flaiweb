// Fuente de verdad de SEO por ruta. Standalone (sin alias @/) para poder
// importarse también desde vite.config al generar sitemap/404 en el build.
//
// Agregar una página = agregar una entrada aquí. El sitemap y el prerender
// derivan de esto, así escala sin editar el build a mano.
//
// ⚠️ REGLA DE SEGURIDAD SSR (obligatoria para el prerender):
//   NADA de window / document / localStorage / canvas / matchMedia /
//   IntersectionObserver / requestAnimationFrame en el CUERPO DEL RENDER de un
//   componente. Va dentro de useEffect o envuelto en <ClientOnly> (vite-react-ssg).
//   `npm run dev` NO lo detecta (corre en navegador); solo lo atrapa `npm run build`.
//   El CI (.github/workflows/build.yml) corre el build en cada push/PR por esto.

export const SITE = {
  origin: 'https://www.flainube.mx',
  name: 'FLAI',
  locale: 'es_MX',
  // TODO(Martin): generar imagen OG 1200×630 en /public/og-image.png (NO usar el favicon).
  ogImage: 'https://www.flainube.mx/og-image.png',
  description: 'FLAI es la nube soberana mexicana: infraestructura de nube con datos en México.',
  // TODO(Martin): llenar con perfiles oficiales (LinkedIn, X, GitHub, Crunchbase, Wikidata).
  // Estos alimentan Organization.sameAs → clave para que las IAs reconozcan la entidad.
  sameAs: [] as string[],
  // Dirección para Organization (PostalAddress). País confirmado: México.
  address: { addressCountry: 'MX' as const },
  // TODO(Martin): ubicaciones reales de los data centers en México.
  // Alimenta Organization.location → sostiene la afirmación de soberanía (residencia de datos).
  // Ej: { name: 'FLAI DC Querétaro', city: 'Querétaro', state: 'Querétaro' }
  dataCenters: [] as { name?: string; city: string; state: string }[],
  // TODO(Martin): si tenemos ciudad/estado de fundación, descomentar y llenar.
  // foundingLocation: 'Ciudad de México, México',

  // Marca hermana: MAYIA es la IA de la nube soberana. Alimenta Organization.brand.
  sisterBrand: { name: 'MAYIA', url: 'https://mayia.mx', description: 'La fábrica de inteligencia artificial de México' },

  // Estructura corporativa: FLAI es producto de Edgenet Data Technologies.
  // Alimenta Organization.parentOrganization → conecta la entidad FLAI con su matriz
  // para que las IAs dejen de dirigir a mayia.mx y reconozcan flainube.mx.
  // TODO(Martin): URL oficial de Edgenet.
  parentOrg: { name: 'Edgenet Data Technologies', url: '' },

  // Cobertura de prensa que ya mencionó a FLAI. Alimenta Organization.subjectOf
  // (Article). Solo se emiten las notas que tengan `url` (Article sin url no sirve).
  // TODO(Martin): confirmar las URLs reales de cada nota.
  press: [
    { publisher: 'Mobile Time', url: '' },
    { publisher: 'eSemanal', url: '' },
    { publisher: 'ITseller', url: '' },
    { publisher: 'PCFormat', url: '' },
    { publisher: 'Eje Central', url: '' },
    { publisher: 'El Universal', url: '' },
  ] as { publisher: string; url: string; title?: string }[],
};

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  /** Incluir en sitemap.xml (solo URLs canónicas e indexables). */
  sitemap: boolean;
  /** Emitir <meta name="robots" content="noindex">. */
  noindex?: boolean;
  /** Canónico absoluto; por defecto SITE.origin + path. */
  canonical?: string;
  /** Nombre del servicio → genera JSON-LD Service. */
  service?: string;
  /** Fecha ISO (YYYY-MM-DD) de última modificación real; opcional en el sitemap. */
  lastmod?: string;
};

const svc = (path: string, name: string, title: string, description: string): PageSeo => ({
  path, service: name, sitemap: true,
  title: `${title} | FLAI`,
  description,
});

export const PAGES: PageSeo[] = [
  {
    path: '/',
    title: 'FLAI — La nube soberana mexicana | Datos en México',
    description: 'FLAI es la nube soberana de México: cómputo, almacenamiento, Kubernetes, respaldo e IA con datos en territorio mexicano, soberanía demostrable y soporte en español.',
    sitemap: true,
  },

  // App (no marketing) → noindex, fuera del sitemap
  { path: '/inicio', title: 'Inicio | FLAI', description: 'Panel de inicio de la nube FLAI.', sitemap: false, noindex: true },
  { path: '/asesor-cloud', title: 'Asesor Cloud | FLAI', description: 'Recomendador del mejor servicio de nube FLAI para tu carga de trabajo.', sitemap: false, noindex: true },

  // 11 familias de servicio
  svc('/services/compute', 'Cloud Compute', 'Cloud Compute', 'Cómputo soberano en México para cargas reales de negocio, con datos en territorio mexicano.'),
  svc('/services/private-cloud', 'Private Cloud', 'Private Cloud', 'Nube privada con control, aislamiento y cumplimiento para cargas críticas en México.'),
  svc('/services/on-prem-cloud', 'On-Prem Cloud', 'On-Prem Cloud', 'La experiencia de nube FLAI dentro de tu propio data center, administrada y soberana.'),
  svc('/services/kubernetes', 'Kubernetes', 'Kubernetes', 'Kubernetes administrado con gobierno y seguridad para aplicaciones modernas en la nube mexicana.'),
  svc('/services/storage', 'Storage', 'Storage', 'Almacenamiento en la nube protegido, escalable y disponible con residencia de datos en México.'),
  svc('/services/databases', 'Databases', 'Bases de datos', 'Bases de datos administradas con menos carga técnica sobre la nube soberana FLAI.'),
  svc('/services/networking', 'Network', 'Networking', 'Conectividad de nube segura, privada y optimizada para México.'),
  svc('/services/security', 'Security & Trust', 'Security & Trust', 'Seguridad integrada desde la arquitectura para tu nube soberana en México.'),
  svc('/services/backup-drp', 'Backup & DRP', 'Backup y DRP', 'Respaldo y recuperación ante desastres con continuidad dentro de México.'),
  svc('/services/ai-cloud', 'AI Cloud', 'AI Cloud', 'Inteligencia artificial empresarial sobre nube mexicana: GPU, MLOps, RAG y agentes.'),
  svc('/services/videovigilancia', 'Videovigilancia', 'Videovigilancia', 'Extiende el almacenamiento de tu videovigilancia a la nube soberana mexicana FLAI.'),

  // Generales
  { path: '/industries', title: 'Industrias | FLAI', description: 'Soluciones de nube soberana FLAI para gobierno, banca, salud, manufactura, retail y educación en México.', sitemap: true },

  // Sectores de industria: hoy renderizan el catálogo único → canónico a /industries
  // y fuera del sitemap (mismo patrón que /recursos/white-papers). Se prerenderizan
  // para que las URLs resuelvan en carga directa/refresh (no 404 en estático).
  // TODO(Martin): cuando cada sector tenga contenido propio, quitar canonical y poner sitemap: true.
  { path: '/industries/gobierno', title: 'Gobierno | Industrias FLAI', description: 'Nube soberana FLAI para gobierno: datos en México, cumplimiento y continuidad.', sitemap: false, canonical: 'https://www.flainube.mx/industries' },
  { path: '/industries/banca-finanzas', title: 'Banca & Finanzas | Industrias FLAI', description: 'Nube soberana FLAI para banca y finanzas: seguridad, cumplimiento y residencia de datos en México.', sitemap: false, canonical: 'https://www.flainube.mx/industries' },
  { path: '/industries/salud', title: 'Salud | Industrias FLAI', description: 'Nube soberana FLAI para salud: protección de datos sensibles en México.', sitemap: false, canonical: 'https://www.flainube.mx/industries' },
  { path: '/industries/manufactura', title: 'Manufactura | Industrias FLAI', description: 'Nube soberana FLAI para manufactura: operación y datos en México.', sitemap: false, canonical: 'https://www.flainube.mx/industries' },
  { path: '/industries/retail', title: 'Retail | Industrias FLAI', description: 'Nube soberana FLAI para retail: escala y disponibilidad con datos en México.', sitemap: false, canonical: 'https://www.flainube.mx/industries' },
  { path: '/industries/educacion', title: 'Educación | Industrias FLAI', description: 'Nube soberana FLAI para educación: infraestructura con datos en México.', sitemap: false, canonical: 'https://www.flainube.mx/industries' },

  // Partners: sección aún no construida (placeholder). Se prerenderiza para que la
  // URL enlazada resuelva; noindex + fuera del sitemap hasta tener contenido real.
  // TODO(Martin): construir la página de Partners y quitar el noindex.
  { path: '/partners', title: 'Partners | FLAI', description: 'Programa de partners de la nube soberana mexicana FLAI.', sitemap: false, noindex: true },
  { path: '/marketplace', title: 'Marketplace | FLAI', description: 'Soluciones, partners y software certificado sobre la nube soberana mexicana FLAI.', sitemap: true },
  { path: '/trust-center', title: 'Trust Center | FLAI', description: 'Soberanía demostrable: certificaciones, cumplimiento, cifrado, residencia de datos en México y controles verificables.', sitemap: true },
  { path: '/precios', title: 'Precios | FLAI', description: 'Planes y precios de la nube soberana FLAI, desde nube inicial hasta workloads críticos, con soporte en español.', sitemap: true },
  { path: '/contacto', title: 'Contacto | FLAI', description: 'Agenda un diagnóstico o cotiza tu migración a la nube soberana mexicana FLAI.', sitemap: true },

  // Recursos: 3 rutas comparten contenido → canónico a documentación
  { path: '/recursos/documentacion', title: 'Recursos | FLAI', description: 'Documentación, white papers y blog de la nube soberana mexicana FLAI.', sitemap: true },
  { path: '/recursos/white-papers', title: 'White Papers | FLAI', description: 'White papers de la nube soberana mexicana FLAI.', sitemap: false, canonical: 'https://www.flainube.mx/recursos/documentacion' },
  { path: '/recursos/blog', title: 'Blog | FLAI', description: 'Blog de la nube soberana mexicana FLAI.', sitemap: false, canonical: 'https://www.flainube.mx/recursos/documentacion' },

  // 404
  { path: '/404', title: 'Página no encontrada | FLAI', description: 'La página que buscas no existe.', sitemap: false, noindex: true },
];

export const PAGE_BY_PATH: Record<string, PageSeo> = Object.fromEntries(PAGES.map((p) => [p.path, p]));

export const canonicalOf = (p: PageSeo) => p.canonical ?? SITE.origin + p.path;

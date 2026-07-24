import { useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { SITE, PAGE_BY_PATH, canonicalOf, type PageSeo } from './pages';

// Inyecta <head> por ruta (título, description, OG, canonical, hreflang) y JSON-LD.
// Se renderiza en el prerender → queda en el HTML estático (no depende de JS en runtime).

const orgId = `${SITE.origin}/#organization`;

function buildJsonLd(page: PageSeo, canonical: string) {
  const org: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': orgId,
    name: SITE.name,
    url: SITE.origin,
    logo: SITE.ogImage,
    description: 'Nube soberana mexicana con residencia de datos en México.',
    areaServed: { '@type': 'Country', name: 'México' },
    address: { '@type': 'PostalAddress', addressCountry: SITE.address.addressCountry },
    // foundingLocation: SITE.foundingLocation, // TODO(Martin): descomentar cuando exista el dato
    sameAs: SITE.sameAs,
  };
  // Ubicaciones de data centers en México → sostiene la soberanía.
  if (SITE.dataCenters.length) {
    org.location = SITE.dataCenters.map((dc) => ({
      '@type': 'Place',
      ...(dc.name ? { name: dc.name } : {}),
      address: {
        '@type': 'PostalAddress',
        addressLocality: dc.city,
        addressRegion: dc.state,
        addressCountry: 'MX',
      },
    }));
  }
  // Marca hermana: MAYIA, la IA de la nube soberana.
  if (SITE.sisterBrand.name) {
    org.brand = {
      '@type': 'Brand',
      name: SITE.sisterBrand.name,
      ...(SITE.sisterBrand.url ? { url: SITE.sisterBrand.url } : {}),
      ...(SITE.sisterBrand.description ? { description: SITE.sisterBrand.description } : {}),
    };
  }
  // Matriz corporativa: FLAI es producto de Edgenet → conecta la entidad.
  if (SITE.parentOrg.name) {
    org.parentOrganization = {
      '@type': 'Organization',
      name: SITE.parentOrg.name,
      ...(SITE.parentOrg.url ? { url: SITE.parentOrg.url } : {}),
    };
  }
  // Cobertura de prensa → Article. Solo las que ya tienen url confirmada.
  const press = SITE.press.filter((p) => p.url);
  if (press.length) {
    org.subjectOf = press.map((p) => ({
      '@type': 'Article',
      url: p.url,
      ...(p.title ? { headline: p.title } : {}),
      publisher: { '@type': 'Organization', name: p.publisher },
    }));
  }
  const graph: Record<string, unknown>[] = [org];

  if (page.path === '/') {
    graph.push({ '@type': 'WebSite', '@id': `${SITE.origin}/#website`, name: SITE.name, url: SITE.origin, publisher: { '@id': orgId }, inLanguage: 'es-MX' });
  }

  if (page.service) {
    graph.push({
      '@type': 'Service',
      name: page.service,
      serviceType: page.service,
      description: page.description,
      url: canonical,
      areaServed: { '@type': 'Country', name: 'México' },
      provider: { '@id': orgId },
    });
  }

  // Migas para páginas internas indexables (no home)
  if (page.path !== '/' && !page.noindex) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: page.service ?? page.title.replace(' | FLAI', ''), item: canonical },
      ],
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

// Quita el slash final (dirStyle 'nested' puede servir /precios/ y /precios).
function normalize(pathname: string) {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function resolvePage(pathname: string): PageSeo {
  const path = normalize(pathname);
  const match = PAGE_BY_PATH[path];
  if (match) return match;

  // Sectores de industria (splat cliente): comparten el catálogo /industries.
  if (path.startsWith('/industries/')) return PAGE_BY_PATH['/industries'];

  // Sin metadata y no es un splat conocido: falla ruidosamente en el build
  // (no degradar en silencio a noindex/404, que ocultaría el problema).
  if (import.meta.env.SSR) {
    console.error(
      `[RouteSeo] Ruta sin metadata SEO: "${path}". Agrégala en src/seo/pages.ts.`,
    );
  }
  return PAGE_BY_PATH['/404'];
}

export default function RouteSeo() {
  const { pathname } = useLocation();
  const page = resolvePage(pathname);
  const canonical = canonicalOf(page);
  const jsonLd = buildJsonLd(page, canonical);

  return (
    <Head>
      <html lang="es-MX" />
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="es-MX" href={canonical} />
      {page.noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:image" content={SITE.ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  );
}

import { ROUTES } from '@/constants/routes';
import { SERVICES } from './services';
import { INDUSTRIES } from './industries';
import { PLANS, QUOTE_PLANS } from './pricing';

export type SearchEntry = {
  title: string;
  group: string; // categoría para agrupar/etiquetar el resultado
  to: string;
  keywords: string; // texto adicional para el match (no se muestra)
};

// Páginas generales sin un dataset propio.
const PAGES: SearchEntry[] = [
  { title: 'Inicio', group: 'Página', to: ROUTES.DASHBOARD, keywords: 'dashboard nube mexicana overview' },
  { title: 'Marketplace', group: 'Página', to: ROUTES.MARKETPLACE, keywords: 'soluciones partners software certificado agentes mayia' },
  { title: 'Trust Center', group: 'Página', to: ROUTES.TRUST_CENTER, keywords: 'confianza certificaciones cumplimiento seguridad sla status residencia datos' },
  { title: 'Precios', group: 'Página', to: ROUTES.PRICING, keywords: 'pricing paquetes planes cotizacion calculadora' },
  { title: 'Contacto', group: 'Página', to: ROUTES.CONTACT, keywords: 'diagnostico cotizacion arquitecto poc workshop' },
  { title: 'Documentación', group: 'Recursos', to: ROUTES.DOCS, keywords: 'docs guias migracion referencia' },
  { title: 'White Papers', group: 'Recursos', to: ROUTES.WHITEPAPERS, keywords: 'comparativos analisis soberania' },
  { title: 'Blog', group: 'Recursos', to: ROUTES.BLOG, keywords: 'articulos noticias webinars' },
];

// Índice plano de toda la página (se arma una sola vez al importar el módulo).
export const SEARCH_INDEX: SearchEntry[] = [
  ...SERVICES.map((s) => ({ title: s.name, group: 'Servicio', to: s.to, keywords: s.tagline })),
  ...INDUSTRIES.map((i) => ({ title: i.name, group: 'Industria', to: i.to, keywords: `${i.tagline} ${i.workloads.join(' ')}` })),
  ...[...PLANS, ...QUOTE_PLANS].map((p) => ({ title: p.name, group: 'Plan', to: p.to, keywords: `${p.audience} ${p.includes.join(' ')}` })),
  ...PAGES,
];

const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Cada token de la búsqueda debe aparecer; prioriza coincidencias en el título.
export function searchSite(query: string, limit = 8): SearchEntry[] {
  const q = norm(query.trim());
  if (!q) return [];
  const tokens = q.split(/\s+/);

  return SEARCH_INDEX.map((entry) => {
    const title = norm(entry.title);
    const hay = `${title} ${norm(entry.keywords)} ${norm(entry.group)}`;
    if (!tokens.every((t) => hay.includes(t))) return null;

    let score = 0;
    if (title.startsWith(q)) score += 100;
    else if (title.includes(q)) score += 50;
    if (tokens.every((t) => title.includes(t))) score += 20;
    return { entry, score };
  })
    .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}

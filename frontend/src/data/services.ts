import { ROUTES } from '@/constants/routes';

// Clave de ícono (la presentación mapea clave → componente lucide en la UI).
export type ServiceIcon =
  | 'compute'
  | 'private'
  | 'onprem'
  | 'kubernetes'
  | 'storage'
  | 'databases'
  | 'network'
  | 'security'
  | 'backup'
  | 'ai';

export type ServiceSlug =
  | 'compute'
  | 'private-cloud'
  | 'on-prem'
  | 'kubernetes'
  | 'storage'
  | 'databases'
  | 'networking'
  | 'security'
  | 'backup-drp'
  | 'ai-cloud';

export type Service = {
  slug: ServiceSlug;
  name: string;
  tagline: string; // beneficio en una frase
  to: string;
  icon: ServiceIcon;
  badge?: string;
};

// Las 10 familias de servicio (Documento guía, sección 5).
export const SERVICES: Service[] = [
  { slug: 'compute', name: 'Cloud Compute', tagline: 'Cómputo soberano en México para cargas reales de negocio.', to: ROUTES.COMPUTE, icon: 'compute' },
  { slug: 'private-cloud', name: 'Private Cloud', tagline: 'Control, aislamiento y cumplimiento para cargas críticas.', to: ROUTES.PRIVATE_CLOUD, icon: 'private' },
  { slug: 'on-prem', name: 'On-Prem Cloud', tagline: 'La experiencia FLAI dentro de tu propio data center.', to: ROUTES.ON_PREM, icon: 'onprem' },
  { slug: 'kubernetes', name: 'Kubernetes', tagline: 'Aplicaciones modernas con gobierno y seguridad.', to: ROUTES.KUBERNETES, icon: 'kubernetes' },
  { slug: 'storage', name: 'Storage', tagline: 'Datos protegidos, escalables y disponibles en México.', to: ROUTES.STORAGE, icon: 'storage' },
  { slug: 'databases', name: 'Databases', tagline: 'Bases de datos administradas con menos carga técnica.', to: ROUTES.DATABASES, icon: 'databases' },
  { slug: 'networking', name: 'Network', tagline: 'Conectividad segura, privada y optimizada para México.', to: ROUTES.NETWORKING, icon: 'network' },
  { slug: 'security', name: 'Security & Trust', tagline: 'Seguridad integrada desde la arquitectura, no al final.', to: ROUTES.SECURITY, icon: 'security' },
  { slug: 'backup-drp', name: 'Backup & DRP', tagline: 'Recuperación y continuidad dentro de México.', to: ROUTES.BACKUP_DRP, icon: 'backup' },
  { slug: 'ai-cloud', name: 'AI Cloud', tagline: 'Inteligencia artificial empresarial sobre nube mexicana.', to: ROUTES.AI_CLOUD, icon: 'ai', badge: 'Nuevo' },
];

export const SERVICE_BY_SLUG: Record<ServiceSlug, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
) as Record<ServiceSlug, Service>;

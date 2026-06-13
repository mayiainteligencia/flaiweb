export const ROUTES = {
  HOME: '/',

  // Servicios cloud
  COMPUTE: '/services/compute',
  PRIVATE_CLOUD: '/services/private-cloud',
  ON_PREM: '/services/on-prem-cloud',
  KUBERNETES: '/services/kubernetes',
  STORAGE: '/services/storage',
  DATABASES: '/services/databases',
  NETWORKING: '/services/networking',
  SECURITY: '/services/security',
  BACKUP_DRP: '/services/backup-drp',
  AI_CLOUD: '/services/ai-cloud',

  // Industrias
  GOBIERNO: '/industries/gobierno',
  BANCA: '/industries/banca-finanzas',
  SALUD: '/industries/salud',
  MANUFACTURA: '/industries/manufactura',
  RETAIL: '/industries/retail',
  EDUCACION: '/industries/educacion',

  // Recursos
  DOCS: '/recursos/documentacion',
  WHITEPAPERS: '/recursos/white-papers',
  BLOG: '/recursos/blog',

  // Generales
  MARKETPLACE: '/marketplace',
  PARTNERS: '/partners',
  TRUST_CENTER: '/trust-center',
  PRICING: '/precios',
  CONTACT: '/contacto',
  SETTINGS: '/configuracion',
} as const;

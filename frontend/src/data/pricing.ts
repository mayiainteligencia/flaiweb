import { ROUTES } from '@/constants/routes';

// Paquetes comerciales (Documento guía, sección 10).
// Precios indicativos en MXN/mes; los proyectos enterprise se cierran bajo cotización.
export type Plan = {
  name: string;
  audience: string; // para quién
  includes: string[];
  cta: string;
  to: string;
  priceMonthly?: number; // indicativo "desde"; undefined => cotización
  priceYearly?: number;
  featured?: boolean;
};

// Paquetes de consumo con precio indicativo (se muestran con el switch mensual/anual).
export const PLANS: Plan[] = [
  {
    name: 'FLAI Essential',
    audience: 'Empresas que inician su nube privada/soberana.',
    priceMonthly: 2499,
    priceYearly: 24990,
    includes: ['VMs y storage', 'Backup básico', 'Monitoreo', 'Soporte estándar'],
    cta: 'Calcula tu nube inicial',
    to: ROUTES.CONTACT,
  },
  {
    name: 'FLAI Business',
    audience: 'Empresas medianas y corporativas.',
    priceMonthly: 6999,
    priceYearly: 69990,
    includes: ['Alta disponibilidad', 'Seguridad administrada', 'Backup y reportes', 'FinOps mensual'],
    cta: 'Agenda diagnóstico',
    to: ROUTES.CONTACT,
    featured: true,
  },
  {
    name: 'FLAI Enterprise',
    audience: 'Workloads críticos.',
    priceMonthly: 14999,
    priceYearly: 149990,
    includes: ['Arquitectura dedicada', 'SOC/NOC y DRP', 'Cumplimiento', 'Arquitecto asignado y SLA avanzado'],
    cta: 'Diseña tu arquitectura',
    to: ROUTES.CONTACT,
  },
];

// Paquetes especializados (siempre bajo cotización).
export const QUOTE_PLANS: Plan[] = [
  {
    name: 'FLAI Sovereign',
    audience: 'Gobierno, banca, salud e industrias reguladas.',
    includes: ['Residencia México', 'Cifrado y gestión de llaves', 'Auditoría y gobierno', 'Portabilidad y reversibilidad'],
    cta: 'Solicita evaluación de cumplimiento',
    to: ROUTES.CONTACT,
  },
  {
    name: 'FLAI On-Prem',
    audience: 'Datos o cargas que no pueden salir de tus instalaciones.',
    includes: ['Cloud platform en sitio', 'Landing zone y cloud store', 'Operación administrada', 'Gobierno y observabilidad'],
    cta: 'Solicita workshop on-prem',
    to: ROUTES.CONTACT,
  },
  {
    name: 'FLAI AI Cloud',
    audience: 'Empresas que implementan IA segura.',
    includes: ['GPU y data lakehouse', 'MLOps y LLMOps', 'RAG y agentes MAYIA', 'Seguridad de modelos'],
    cta: 'Agenda PoC IA',
    to: ROUTES.CONTACT,
  },
];

// Componentes visibles del precio (sección 10.1).
export const PRICE_COMPONENTS: string[] = [
  'vCPU / core / host dedicado',
  'Memoria RAM',
  'Storage block, file, object y archive',
  'IOPS y performance tier',
  'Backup, snapshots, retención e inmutabilidad',
  'Transferencia de datos y egress nacional/internacional',
  'Firewall, WAF, DDoS, KMS, IAM, SOC',
  'Conectividad dedicada, VPN, SD-WAN, Direct Connect',
  'Soporte, SLA y operación administrada',
  'Migración, arquitectura, cumplimiento y FinOps',
];

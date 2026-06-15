import { ROUTES } from '@/constants/routes';

export type IndustryIcon =
  | 'gobierno'
  | 'banca'
  | 'salud'
  | 'manufactura'
  | 'retail'
  | 'educacion';

export type Industry = {
  name: string;
  to: string;
  icon: IndustryIcon;
  tagline: string; // beneficio en una frase
  workloads: string[]; // cargas y casos típicos del sector
};

// Industrias con página propia (Documento guía, secciones 6.3 y 7.1).
export const INDUSTRIES: Industry[] = [
  {
    name: 'Gobierno',
    to: ROUTES.GOBIERNO,
    icon: 'gobierno',
    tagline: 'Residencia nacional, control y trazabilidad para datos sensibles del sector público.',
    workloads: ['Trámites y portales ciudadanos', 'Datos sensibles con residencia nacional', 'Continuidad y soberanía operativa', 'Auditoría y transparencia'],
  },
  {
    name: 'Banca & Finanzas',
    to: ROUTES.BANCA,
    icon: 'banca',
    tagline: 'Cargas críticas con auditoría, continuidad y control contractual.',
    workloads: ['Core bancario y transaccional', 'Fintech y seguros', 'Cumplimiento y auditoría', 'DRP y continuidad'],
  },
  {
    name: 'Salud',
    to: ROUTES.SALUD,
    icon: 'salud',
    tagline: 'Expedientes, imágenes médicas y datos clínicos con privacidad garantizada.',
    workloads: ['Expediente clínico electrónico', 'Imagenología médica', 'Datos sensibles y privacidad', 'Telemedicina'],
  },
  {
    name: 'Manufactura',
    to: ROUTES.MANUFACTURA,
    icon: 'manufactura',
    tagline: 'Operación en planta con baja latencia, OT/IT e IA industrial.',
    workloads: ['OT/IT y baja latencia en planta', 'Visión por computadora', 'IA industrial y nearshoring', 'MES y trazabilidad'],
  },
  {
    name: 'Retail',
    to: ROUTES.RETAIL,
    icon: 'retail',
    tagline: 'Cientos de tiendas, POS, analítica e IA en el punto de venta.',
    workloads: ['POS y omnicanalidad', 'Analítica e inventarios', 'IA en punto de venta y edge', 'E-commerce de alto tráfico'],
  },
  {
    name: 'Educación',
    to: ROUTES.EDUCACION,
    icon: 'educacion',
    tagline: 'Plataformas educativas escalables con datos protegidos en México.',
    workloads: ['Campus y plataformas LMS', 'Investigación y cómputo', 'Datos de estudiantes protegidos', 'Portales de alta demanda'],
  },
];

export const INDUSTRY_BY_ROUTE: Record<string, Industry> = Object.fromEntries(
  INDUSTRIES.map((i) => [i.to, i]),
);

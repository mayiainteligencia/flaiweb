import { ROUTES } from '@/constants/routes';

export type IndustryIcon =
  | 'gobierno'
  | 'banca'
  | 'salud'
  | 'manufactura'
  | 'retail'
  | 'educacion';

export type Industry = { name: string; to: string; icon: IndustryIcon };

// Industrias con página propia (Documento guía, sección 7.1).
export const INDUSTRIES: Industry[] = [
  { name: 'Gobierno', to: ROUTES.GOBIERNO, icon: 'gobierno' },
  { name: 'Banca & Finanzas', to: ROUTES.BANCA, icon: 'banca' },
  { name: 'Salud', to: ROUTES.SALUD, icon: 'salud' },
  { name: 'Manufactura', to: ROUTES.MANUFACTURA, icon: 'manufactura' },
  { name: 'Retail', to: ROUTES.RETAIL, icon: 'retail' },
  { name: 'Educación', to: ROUTES.EDUCACION, icon: 'educacion' },
];

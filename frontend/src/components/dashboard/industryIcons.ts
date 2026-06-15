import { Landmark, Building2, HeartPulse, Factory, ShoppingBag, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { IndustryIcon } from '@/data/industries';

// Mapa clave de industria → componente lucide (no duplicar; lo consumen Overview e Industries).
export const INDUSTRY_ICONS: Record<IndustryIcon, LucideIcon> = {
  gobierno: Landmark,
  banca: Building2,
  salud: HeartPulse,
  manufactura: Factory,
  retail: ShoppingBag,
  educacion: GraduationCap,
};

import {
  Cpu,
  Lock,
  ServerCog,
  Boxes,
  HardDrive,
  Database,
  Network,
  ShieldCheck,
  LifeBuoy,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ServiceIcon } from '@/data/services';

export const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  compute: Cpu,
  private: Lock,
  onprem: ServerCog,
  kubernetes: Boxes,
  storage: HardDrive,
  databases: Database,
  network: Network,
  security: ShieldCheck,
  backup: LifeBuoy,
  ai: Sparkles,
};

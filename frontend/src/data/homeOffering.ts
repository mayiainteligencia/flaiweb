import {
  Cloud,
  Combine,
  Lock,
  ServerCog,
  Landmark,
  Sparkles,
  Cpu,
  Boxes,
  Database,
  Network,
  ShieldCheck,
  HardDrive,
  LifeBuoy,
  Activity,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

// Tarjetas de la pantalla de Inicio. El ícono se guarda aquí como componente lucide
// porque son sets propios del home (no las 10 familias de `services.ts`).
export type OfferingCard = {
  name: string;
  desc: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
};

// Tipos de nube (cards negras con gráfica). Orden = rejilla 3×2 leída por filas.
export const CLOUD_TYPES: OfferingCard[] = [
  { name: 'FLAI Nube Pública Controlada', desc: 'Para ambientes flexibles, desarrollo, pruebas, aplicaciones digitales y cargas escalables.', to: ROUTES.CONTACT, icon: Cloud, badge: 'Próximamente' },
  { name: 'FLAI Nube Privada', desc: 'Para empresas que requieren control, seguridad, recursos dedicados y operación administrada.', to: ROUTES.PRIVATE_CLOUD, icon: Lock },
  { name: 'FLAI Sovereign Cloud', desc: 'Para datos sensibles, gobierno, banca, salud, industria y cargas reguladas.', to: ROUTES.TRUST_CENTER, icon: Landmark, badge: 'Nuevo' },
  { name: 'FLAI Hybrid Cloud', desc: 'Para conectar nube privada, nube pública, on-prem y data centers existentes.', to: ROUTES.CONTACT, icon: Combine },
  { name: 'FLAI On-Prem Cloud', desc: 'Para llevar capacidades cloud a tu site, data center o a un entorno dedicado.', to: ROUTES.ON_PREM, icon: ServerCog },
  { name: 'FLAI AI Cloud', desc: 'Para inteligencia artificial empresarial, GPU, datos, modelos, agentes, robots, cámaras y analítica avanzada.', to: ROUTES.AI_CLOUD, icon: Sparkles },
];

// Servicios cloud (cards blancas normales). Orden = rejilla 3×3 leída por filas.
export const CLOUD_SERVICES: OfferingCard[] = [
  { name: 'FLAI Compute', desc: 'Cómputo flexible, seguro y administrado para operar aplicaciones críticas, sistemas empresariales, plataformas digitales e inteligencia artificial.', to: ROUTES.COMPUTE, icon: Cpu },
  { name: 'FLAI Kubernetes & Containers', desc: 'Moderniza tus aplicaciones con contenedores, microservicios y Kubernetes administrado sobre una nube soberana.', to: ROUTES.KUBERNETES, icon: Boxes },
  { name: 'FLAI Storage', desc: 'Almacenamiento seguro, escalable y gobernado para datos críticos, respaldos, archivos regulatorios, analítica e inteligencia artificial.', to: ROUTES.STORAGE, icon: HardDrive },
  { name: 'FLAI Databases', desc: 'Bases de datos administradas para aplicaciones empresariales, plataformas digitales, analítica, operación crítica e inteligencia artificial.', to: ROUTES.DATABASES, icon: Database },
  { name: 'FLAI AI Cloud', desc: 'La nube soberana para desplegar inteligencia artificial empresarial con datos protegidos, infraestructura local y gobierno de modelos.', to: ROUTES.AI_CLOUD, icon: Sparkles },
  { name: 'FLAI Backup & Disaster Recovery', desc: 'Protege tu operación antes, durante y después de un incidente. Recupera datos, aplicaciones y continuidad con una arquitectura nacional resiliente.', to: ROUTES.BACKUP_DRP, icon: LifeBuoy },
  { name: 'FLAI Network', desc: 'Red privada, segura y de baja latencia para conectar aplicaciones, sedes, centros de datos, nubes públicas y ambientes on-prem.', to: ROUTES.NETWORKING, icon: Network },
  { name: 'FLAI Security & Compliance', desc: 'Seguridad integrada desde el diseño para proteger datos, identidades, aplicaciones, redes y cargas críticas.', to: ROUTES.SECURITY, icon: ShieldCheck },
  { name: 'FLAI NOC & SOC', desc: 'Monitoreo y respuesta 24/7: operación de red y seguridad para proteger datos, identidades, aplicaciones, redes y cargas críticas.', to: ROUTES.SECURITY, icon: Activity },
];

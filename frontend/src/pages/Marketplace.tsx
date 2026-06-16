import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Database,
  Brain,
  Bot,
  Building2,
  Wrench,
  MonitorSmartphone,
  LifeBuoy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import PageHeader, { reveal } from '@/components/ui/PageHeader';
import { flagAccent } from '@/components/ui/flagAccent';

// Categorías iniciales (Documento guía, sección 8.1).
const CATEGORIES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: LifeBuoy, title: 'Backup, DRP y continuidad', desc: 'Respaldo, recuperación ante desastres y continuidad operativa.' },
  { icon: ShieldCheck, title: 'Ciberseguridad', desc: 'WAF, SIEM, XDR, gestión de vulnerabilidades, DDoS, PAM e IAM.' },
  { icon: Database, title: 'Bases de datos y analítica', desc: 'Bases administradas y plataformas de analítica.' },
  { icon: Brain, title: 'Data & IA', desc: 'Data Lakehouse, RAG, vector databases y herramientas de IA.' },
  { icon: Bot, title: 'Agentes MAYIA por industria', desc: 'Atención, ventas, cobranza, soporte, legal, RH y operaciones.' },
  { icon: Building2, title: 'Aplicaciones por sector', desc: 'Gobierno, salud, educación, retail y manufactura.' },
  { icon: Wrench, title: 'DevOps y observabilidad', desc: 'CI/CD, monitoreo, logging y FinOps.' },
  { icon: MonitorSmartphone, title: 'Edge AI y retail físico-digital', desc: 'M2C + MAYIA + FLAI: kioscos, displays inteligentes y edge AI.' },
];

// Modelo comercial (sección 8.2).
const MODEL: string[] = [
  'Comisión por venta o consumo de software',
  'Servicios administrados asociados a cada solución',
  'Paquetes por industria con precio mensual',
  'Facturación centralizada desde FLAI',
  'Certificación técnica y de seguridad de partners',
  'Programa para integradores, ISVs, startups y desarrolladores de IA',
];

export default function Marketplace() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-8">
      <PageHeader
        eyebrow="Marketplace"
        title="El primer marketplace cloud soberano mexicano"
        subtitle="Soluciones verificadas que corren sobre infraestructura mexicana o bajo modelos híbridos y on-prem, con facturación centralizada desde FLAI."
      />

      <motion.section {...reveal}>
        <h2 className="text-xl font-semibold text-text-primary">Categorías</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <div key={c.title} className={`rounded-xl border border-border-subtle bg-card p-5 transition-all hover:-translate-y-0.5 ${flagAccent(i)}`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <c.icon size={19} />
              </span>
              <h3 className="mt-3 font-semibold text-text-primary">{c.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">{c.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...reveal} className="rounded-xl border border-border-subtle bg-card p-6">
        <h2 className="text-xl font-semibold text-text-primary">Modelo para partners</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {MODEL.map((m) => (
            <li key={m} className="flex items-start gap-2 text-sm text-text-secondary">
              <ArrowRight size={15} className="mt-0.5 shrink-0 text-accent" />
              {m}
            </li>
          ))}
        </ul>
        <NavLink
          to={ROUTES.CONTACT}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Conviértete en partner <ArrowRight size={16} />
        </NavLink>
      </motion.section>
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  FileLock2,
  Activity,
  KeyRound,
  Scale,
  AlertTriangle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import PageHeader, { reveal } from '@/components/ui/PageHeader';

// Pilares del Trust Center (Documento guía, sección 9).
const PILLARS: { icon: LucideIcon; title: string; items: string[] }[] = [
  {
    icon: Award,
    title: 'Certificaciones y cumplimiento',
    items: ['Certificaciones actuales y roadmap, sin prometer las no obtenidas', 'Matriz de cumplimiento por industria', 'Gobierno, financiero, salud, retail, manufactura y educación'],
  },
  {
    icon: FileLock2,
    title: 'Seguridad y privacidad',
    items: ['Políticas de seguridad, privacidad e incidentes', 'Modelo de responsabilidad compartida', 'Gestión de continuidad'],
  },
  {
    icon: KeyRound,
    title: 'Controles técnicos',
    items: ['Cifrado, llaves, IAM, MFA y RBAC', 'Logging, auditoría y retención', 'Borrado seguro de datos'],
  },
  {
    icon: Scale,
    title: 'Residencia y reversibilidad',
    items: ['Residencia de datos y jurisdicción', 'Portabilidad y reversibilidad', 'Documentación pública'],
  },
  {
    icon: Activity,
    title: 'SLA y soporte',
    items: ['SLA, prioridades y tiempos de respuesta', 'Escalamiento definido', 'Soporte experto en español'],
  },
  {
    icon: Activity,
    title: 'Status page',
    items: ['Disponibilidad pública', 'Historial de incidentes', 'Comunicación transparente'],
  },
];

export default function TrustCenter() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-8">
      <PageHeader
        eyebrow="Trust Center"
        title="Confianza demostrable, no solo declarada"
        subtitle="La soberanía no se afirma por residencia de datos: se demuestra con controles técnicos, legales, operativos, contractuales y organizacionales."
      />

      <motion.section {...reveal} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="rounded-xl border border-border-subtle bg-white p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <p.icon size={19} />
            </span>
            <h3 className="mt-3 font-semibold text-text-primary">{p.title}</h3>
            <ul className="mt-2 space-y-1.5">
              {p.items.map((it) => (
                <li key={it} className="text-sm text-text-secondary">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </motion.section>

      <motion.section {...reveal} className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-5">
        <AlertTriangle size={20} className="mt-0.5 shrink-0 text-accent" />
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">Regla crítica.</span> No afirmamos
          “soberanía total” únicamente por residencia de datos. Cada claim se respalda con controles
          verificables antes de publicarse.
        </p>
      </motion.section>

      <motion.section {...reveal}>
        <div className="rounded-2xl border border-border-subtle bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-text-primary">¿Necesitas la documentación de cumplimiento?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-text-secondary">
            Solicita certificaciones, políticas, SLA y la matriz de cumplimiento de tu industria.
          </p>
          <NavLink
            to={ROUTES.CONTACT}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Solicita documentación <ArrowRight size={16} />
          </NavLink>
        </div>
      </motion.section>
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, FileText, Route, GitCompare, Newspaper, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import PageHeader, { reveal } from '@/components/ui/PageHeader';

// Recursos (Documento guía, sección 7.1).
const RESOURCES: { icon: LucideIcon; title: string; desc: string; to: string }[] = [
  { icon: BookOpen, title: 'Documentación', desc: 'Guías técnicas, referencias de servicios y fichas.', to: ROUTES.DOCS },
  { icon: FileText, title: 'White papers', desc: 'Análisis de soberanía, arquitectura y cumplimiento.', to: ROUTES.WHITEPAPERS },
  { icon: Route, title: 'Guías de migración', desc: 'Cómo migrar cargas a nube mexicana sin lock-in.', to: ROUTES.DOCS },
  { icon: GitCompare, title: 'Comparativos', desc: 'FLAI frente a nube pública y otras alternativas.', to: ROUTES.WHITEPAPERS },
  { icon: Newspaper, title: 'Blog', desc: 'Tendencias de nube soberana, IA y casos reales.', to: ROUTES.BLOG },
  { icon: Video, title: 'Webinars', desc: 'Sesiones con arquitectos y expertos de industria.', to: ROUTES.BLOG },
];

export default function Recursos() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-8">
      <PageHeader
        eyebrow="Recursos"
        title="Aprende, compara y migra a la nube mexicana"
        subtitle="Documentación, white papers, comparativos y contenido para evaluar FLAI y planear tu adopción cloud."
      />

      <motion.section {...reveal} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <NavLink
            key={r.title}
            to={r.to}
            className="group rounded-xl border border-border-subtle bg-white p-5 transition-colors hover:border-accent/40"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <r.icon size={19} />
            </span>
            <h3 className="mt-3 flex items-center gap-1.5 font-semibold text-text-primary">
              {r.title}
              <ArrowRight size={14} className="text-text-secondary transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </h3>
            <p className="mt-1 text-sm text-text-secondary">{r.desc}</p>
          </NavLink>
        ))}
      </motion.section>
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { INDUSTRIES } from '@/data/industries';
import { INDUSTRY_ICONS } from '@/components/dashboard/industryIcons';
import { ROUTES } from '@/constants/routes';
import PageHeader, { reveal } from '@/components/ui/PageHeader';

export default function Industries() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-8">
      <PageHeader
        eyebrow="Industrias"
        title="Soluciones por industria sobre nube mexicana"
        subtitle="Arquitecturas y casos de uso diseñados para los sectores que operan datos sensibles, cargas críticas y cumplimiento dentro de México."
      />

      <motion.section {...reveal} className="grid gap-4 sm:grid-cols-2">
        {INDUSTRIES.map((ind) => {
          const Icon = INDUSTRY_ICONS[ind.icon];
          return (
            <NavLink
              key={ind.to}
              to={ind.to}
              className="group rounded-xl border border-border-subtle bg-white p-5 transition-colors hover:border-accent/40"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon size={20} />
                </span>
                <div>
                  <h2 className="flex items-center gap-1.5 font-semibold text-text-primary">
                    {ind.name}
                    <ArrowRight size={15} className="text-text-secondary transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">{ind.tagline}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5">
                {ind.workloads.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                    {w}
                  </li>
                ))}
              </ul>
            </NavLink>
          );
        })}
      </motion.section>

      <motion.section {...reveal}>
        <div className="rounded-2xl border border-border-subtle bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-text-primary">¿Tu industria tiene requisitos específicos?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-text-secondary">
            Diseñamos arquitecturas a medida según tu sector, regulación y cargas de trabajo.
          </p>
          <NavLink
            to={ROUTES.CONTACT}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Habla con un arquitecto <ArrowRight size={16} />
          </NavLink>
        </div>
      </motion.section>
    </div>
  );
}

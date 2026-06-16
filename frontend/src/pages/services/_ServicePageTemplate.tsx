import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Layers, Briefcase, ShieldCheck, Tag } from 'lucide-react';
import { SERVICE_BY_SLUG } from '@/data/services';
import type { ServiceSlug } from '@/data/services';
import { SERVICE_DETAILS } from '@/data/serviceDetails';
import { SERVICE_ICONS } from '@/components/dashboard/serviceIcons';
import { ROUTES } from '@/constants/routes';
import { flagAccent } from '@/components/ui/flagAccent';

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = SERVICE_BY_SLUG[slug];
  const detail = SERVICE_DETAILS[slug];
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-8">
      {/* Encabezado */}
      <motion.header {...reveal}>
        <NavLink
          to={ROUTES.HOME}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={15} /> Servicios Cloud
        </NavLink>

        <div className="mt-5 flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Icon size={26} />
          </span>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-text-primary sm:text-3xl">
              FLAI {service.name}
              {service.badge && (
                <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-accent">
                  {service.badge}
                </span>
              )}
            </h1>
            <p className="mt-1 text-base text-text-secondary">{service.tagline}</p>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-text-secondary">{detail.problem}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <NavLink
            to={ROUTES.CONTACT}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Agenda un diagnóstico <ArrowRight size={16} />
          </NavLink>
          <NavLink
            to={ROUTES.PRICING}
            className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
          >
            Ver precios
          </NavLink>
        </div>
      </motion.header>

      {/* Qué incluye + Casos de uso */}
      <motion.section {...reveal} className="grid gap-4 md:grid-cols-2">
        <ListCard icon={Layers} title="Qué incluye" items={detail.includes} />
        <ListCard icon={Briefcase} title="Casos de uso" items={detail.useCases} />
      </motion.section>

      {/* Beneficios de negocio */}
      <motion.section {...reveal}>
        <h2 className="text-xl font-semibold text-text-primary">Beneficios de negocio</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {detail.benefits.map((b, i) => (
            <div key={b} className={`rounded-xl border border-border-subtle bg-card p-4 text-sm text-text-primary transition-all hover:-translate-y-0.5 ${flagAccent(i)}`}>
              {b}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Seguridad + Precio */}
      <motion.section {...reveal} className="grid gap-4 md:grid-cols-2">
        <ListCard icon={ShieldCheck} title="Seguridad y cumplimiento" items={detail.security} />
        <div className="rounded-xl border border-border-subtle bg-card p-5">
          <h3 className="flex items-center gap-2 font-semibold text-text-primary">
            <Tag size={18} className="text-accent" /> Modelo de precio
          </h3>
          <p className="mt-3 text-sm text-text-secondary">{detail.pricingNote}</p>
          <NavLink
            to={ROUTES.PRICING}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
          >
            Calcula tu nube <ArrowRight size={15} />
          </NavLink>
        </div>
      </motion.section>

      {/* CTA final */}
      <motion.section {...reveal}>
        <div className="rounded-2xl border border-border-subtle bg-card p-8 text-center">
          <h2 className="text-xl font-semibold text-text-primary">¿Listo para diseñar tu arquitectura?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-text-secondary">
            Habla con un arquitecto FLAI y define la mejor ruta para {service.name} en tu operación.
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

function ListCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Layers;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-card p-5">
      <h3 className="flex items-center gap-2 font-semibold text-text-primary">
        <Icon size={18} className="text-accent" /> {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm text-text-secondary">
            <Check size={15} className="mt-0.5 shrink-0 text-accent" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  MapPin,
  Headphones,
  Gauge,
  ArrowUpRight,
  ArrowRight,
  Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { INDUSTRIES } from '@/data/industries';
import { ROUTES } from '@/constants/routes';
import { SERVICE_ICONS } from './serviceIcons';
import { INDUSTRY_ICONS } from './industryIcons';
import { flagAccent } from '@/components/ui/flagAccent';

const PROOFS: { icon: LucideIcon; label: string }[] = [
  { icon: MapPin, label: 'Datos en México' },
  { icon: Headphones, label: 'Soporte 24/7 en español' },
  { icon: ShieldCheck, label: 'Seguridad integrada' },
  { icon: Sparkles, label: 'IA aplicada' },
  { icon: Gauge, label: 'Baja latencia nacional' },
];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

export default function Overview() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 pb-8">
      {/* Banda de valor */}
      <motion.section {...reveal} className="pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">La Nube Mexicana</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">
          Soberana, privada, híbrida, on-prem y lista para inteligencia artificial.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-text-secondary">
          Opera, protege y escala tus datos, aplicaciones e IA dentro de México, con control,
          continuidad y soporte experto en español.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <NavLink
            to={ROUTES.CONTACT}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Agenda un diagnóstico <ArrowRight size={16} />
          </NavLink>
          <NavLink
            to={ROUTES.COMPUTE}
            className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
          >
            Explora servicios
          </NavLink>
        </div>

        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
          {PROOFS.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2 text-sm text-text-secondary">
              <Check size={15} className="text-accent" />
              <Icon size={15} className="text-text-secondary/70" />
              {label}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Servicios */}
      <motion.section {...reveal}>
        <SectionHead title="Servicios Cloud" desc="Elige lo que necesitas. Cada servicio, una página clara y vendible." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <NavLink
                key={s.name}
                to={s.to}
                className={`group relative flex flex-col rounded-xl border border-border-subtle bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30 ${flagAccent(i)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={20} />
                  </span>
                  <ArrowUpRight size={18} className="text-text-secondary/40 transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mt-4 flex items-center gap-2 font-semibold text-text-primary">
                  {s.name}
                  {s.badge && (
                    <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-accent">
                      {s.badge}
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">{s.tagline}</p>
              </NavLink>
            );
          })}
        </div>
      </motion.section>

      {/* On-Prem destacado */}
      <motion.section {...reveal}>
        <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-[#1a0505] via-[#0f0707] to-[#06140d] p-8 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Línea estratégica</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold sm:text-3xl">FLAI On-Prem Cloud</h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Lleva la experiencia FLAI a tu propio data center: portal de autoservicio, landing zone,
            catálogo, Kubernetes, bases de datos, IA y operación administrada por expertos mexicanos.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Landing Zone', 'Cloud Store', 'Observabilidad', 'Gobierno', 'Operación 24/7'].map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                {t}
              </span>
            ))}
          </div>
          <NavLink
            to={ROUTES.ON_PREM}
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#14110d] transition-opacity hover:opacity-90"
          >
            Solicita workshop on-prem <ArrowRight size={16} />
          </NavLink>
        </div>
      </motion.section>

      {/* Industrias */}
      <motion.section {...reveal}>
        <SectionHead title="Para quién es" desc="Soluciones para sectores regulados y de misión crítica." />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((ind, i) => {
            const Icon = INDUSTRY_ICONS[ind.icon];
            return (
              <NavLink
                key={ind.name}
                to={ind.to}
                className={`group flex flex-col items-center gap-3 rounded-xl border border-border-subtle bg-card p-5 text-center transition-all hover:-translate-y-0.5 hover:border-accent/30 ${flagAccent(i)}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={20} />
                </span>
                <span className="text-sm font-medium text-text-primary">{ind.name}</span>
              </NavLink>
            );
          })}
        </div>
      </motion.section>

      {/* Confianza + CTA final */}
      <motion.section {...reveal}>
        <div className="rounded-2xl border border-border-subtle bg-card p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold text-text-primary">Confianza demostrable, no prometida.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-text-secondary">
            Trust Center con certificaciones, SLA, residencia de datos, status page y modelo de
            responsabilidad compartida.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <NavLink
              to={ROUTES.TRUST_CENTER}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Visita el Trust Center <ArrowRight size={16} />
            </NavLink>
            <NavLink
              to={ROUTES.PRICING}
              className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
            >
              Ver precios y paquetes
            </NavLink>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function SectionHead({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-text-secondary">{desc}</p>
    </div>
  );
}

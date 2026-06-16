import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Tag } from 'lucide-react';
import { PLANS, QUOTE_PLANS, PRICE_COMPONENTS } from '@/data/pricing';
import type { Plan } from '@/data/pricing';
import { ROUTES } from '@/constants/routes';

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

const mxn = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 });

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="mx-auto max-w-6xl pb-8">
      <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-white px-5 py-14 sm:px-10">
        {/* Rejilla + glows de marca (rojo / verde) muy sutiles sobre blanco */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]"
        />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute top-20 right-0 h-80 w-80 rounded-full bg-status-ok/10 blur-[120px]" />

        {/* Encabezado + switch */}
        <header className="relative z-10 mx-auto max-w-3xl space-y-3 text-center">
          <motion.span {...reveal} className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Precios
          </motion.span>
          <motion.h1 {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} className="text-3xl font-semibold text-text-primary sm:text-4xl">
            Planes claros para cada etapa de tu nube
          </motion.h1>
          <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="text-sm text-text-secondary">
            Precios indicativos en MXN. Los proyectos enterprise y soberanos se cierran bajo cotización con un arquitecto FLAI.
          </motion.p>
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} className="pt-2">
            <BillingSwitch yearly={yearly} onChange={setYearly} />
          </motion.div>
        </header>

        {/* Paquetes con precio */}
        <div className="relative z-10 mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PriceCard key={plan.name} plan={plan} yearly={yearly} delay={i * 0.1} />
          ))}
        </div>

        {/* Paquetes bajo cotización */}
        <div className="relative z-10 mx-auto mt-10 max-w-5xl">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Soluciones especializadas — bajo cotización
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {QUOTE_PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl border border-border-subtle bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_40px_-14px] hover:shadow-accent/40"
              >
                <h3 className="font-semibold text-text-primary">{plan.name}</h3>
                <p className="mt-1 text-sm text-text-secondary">{plan.audience}</p>
                <NavLink
                  to={plan.to}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
                >
                  {plan.cta} <ArrowRight size={15} />
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        {/* Componentes del precio */}
        <div className="relative z-10 mx-auto mt-12 max-w-5xl rounded-2xl border border-border-subtle bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-text-primary">
            <Tag size={18} className="text-accent" /> Componentes visibles del precio
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {PRICE_COMPONENTS.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-text-secondary">
                <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="relative z-10 mx-auto mt-10 max-w-2xl text-center">
          <h2 className="text-xl font-semibold text-text-primary">¿Quieres una cotización a medida?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-text-secondary">
            Un arquitecto FLAI dimensiona tu nube según workloads, SLA y cumplimiento.
          </p>
          <NavLink
            to={ROUTES.CONTACT}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Solicita cotización <ArrowRight size={16} />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

function BillingSwitch({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="inline-flex rounded-full border border-border-subtle bg-card p-1">
      {[
        { label: 'Mensual', value: false },
        { label: 'Anual', value: true },
      ].map((opt) => {
        const active = opt.value === yearly;
        return (
          <button
            key={opt.label}
            onClick={() => onChange(opt.value)}
            className={`relative z-10 h-9 rounded-full px-5 text-sm font-medium transition-colors ${
              active ? 'text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {active && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-t from-[#cc0000] to-accent shadow-[0_0_18px_-2px] shadow-accent/50"
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function PriceCard({ plan, yearly, delay }: { plan: Plan; yearly: boolean; delay: number }) {
  const price = yearly ? plan.priceYearly : plan.priceMonthly;

  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay }}
      className={`group relative flex flex-col rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_50px_-12px] hover:shadow-accent/45 ${
        plan.featured
          ? 'border-accent shadow-[0_0_50px_-16px] shadow-accent/40'
          : 'border-border-subtle'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
          Más elegido
        </span>
      )}

      <h3 className="text-2xl font-semibold text-text-primary">{plan.name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        {price != null ? (
          <>
            <span className="text-3xl font-semibold text-text-primary">$</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={price}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-4xl font-semibold tabular-nums text-text-primary"
              >
                {mxn.format(price)}
              </motion.span>
            </AnimatePresence>
            <span className="ml-1 text-sm text-text-secondary">MXN / {yearly ? 'año' : 'mes'}</span>
          </>
        ) : (
          <span className="text-3xl font-semibold text-text-primary">Cotización</span>
        )}
      </div>
      <p className="mt-2 text-sm text-text-secondary">{plan.audience}</p>

      <NavLink
        to={plan.to}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
          plan.featured
            ? 'bg-gradient-to-t from-[#cc0000] to-accent text-white shadow-lg shadow-accent/30 hover:opacity-90'
            : 'border border-border-subtle text-text-primary hover:border-accent hover:text-accent'
        }`}
      >
        {plan.cta}
      </NavLink>

      <ul className="mt-6 space-y-3 border-t border-border-subtle pt-5">
        {plan.includes.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
            <span className="grid h-4 w-4 shrink-0 place-content-center rounded-full bg-accent/10">
              <Check size={11} className="text-accent" />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

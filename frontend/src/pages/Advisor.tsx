import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Sparkles, RotateCcw } from 'lucide-react';
import { SERVICE_BY_SLUG } from '@/data/services';
import type { ServiceSlug } from '@/data/services';
import { SERVICE_ICONS } from '@/components/dashboard/serviceIcons';
import { ROUTES } from '@/constants/routes';
import PageHeader, { reveal } from '@/components/ui/PageHeader';

type Size = 'pyme' | 'mediana' | 'enterprise';
type Workload = 'apps' | 'web' | 'datos' | 'devops' | 'continuidad';

type Answers = {
  size: Size;
  workload: Workload;
  regulated: boolean; // sector regulado (gobierno/banca/salud)
  onprem: boolean; // datos no pueden salir de sus instalaciones
  ai: boolean; // necesita IA
};

const SIZE_OPTS: { value: Size; label: string; hint: string }[] = [
  { value: 'pyme', label: 'PyME', hint: 'Equipo pequeño, iniciando en la nube' },
  { value: 'mediana', label: 'Mediana', hint: 'En crecimiento, varias áreas' },
  { value: 'enterprise', label: 'Corporativo', hint: 'Cargas críticas a gran escala' },
];

const WORKLOAD_OPTS: { value: Workload; label: string }[] = [
  { value: 'apps', label: 'Aplicaciones / ERP' },
  { value: 'web', label: 'Portales / APIs' },
  { value: 'datos', label: 'Datos / Analítica' },
  { value: 'devops', label: 'Contenedores / DevOps' },
  { value: 'continuidad', label: 'Respaldo / Continuidad' },
];

const WORKLOAD_SERVICES: Record<Workload, ServiceSlug[]> = {
  apps: ['compute', 'databases'],
  web: ['compute', 'networking', 'kubernetes'],
  datos: ['storage', 'databases'],
  devops: ['kubernetes', 'compute'],
  continuidad: ['backup-drp', 'storage'],
};

const PLAN_BY_SIZE: Record<Size, string> = {
  pyme: 'FLAI Essential',
  mediana: 'FLAI Business',
  enterprise: 'FLAI Enterprise',
};

function recommend(a: Answers): { plan: string; reason: string; services: ServiceSlug[] } {
  let plan = PLAN_BY_SIZE[a.size];
  let reason = `Por el tamaño de tu operación, ${plan} cubre tus necesidades base.`;

  if (a.onprem) {
    plan = 'FLAI On-Prem';
    reason = 'Tus datos no pueden salir de tus instalaciones: llevamos la plataforma a tu sitio.';
  } else if (a.regulated) {
    plan = 'FLAI Sovereign';
    reason = 'Operas en un sector regulado: residencia, cifrado, auditoría y gobierno por diseño.';
  } else if (a.ai && a.size === 'enterprise') {
    plan = 'FLAI AI Cloud';
    reason = 'Tu prioridad es IA a escala con datos protegidos en México.';
  }

  const services = new Set<ServiceSlug>(WORKLOAD_SERVICES[a.workload]);
  services.add('security');
  if (a.ai) services.add('ai-cloud');
  if (a.onprem) services.add('on-prem');
  if (a.regulated) services.add('private-cloud');

  return { plan, reason, services: [...services].slice(0, 6) };
}

const initial: Answers = { size: 'pyme', workload: 'apps', regulated: false, onprem: false, ai: false };

export default function Advisor() {
  const [answers, setAnswers] = useState<Answers>(initial);
  const [result, setResult] = useState<ReturnType<typeof recommend> | null>(null);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <PageHeader
        eyebrow="Asesor Cloud"
        title="Calcula el mejor servicio para tu empresa"
        subtitle="Responde 5 preguntas y te recomendamos el paquete y los servicios FLAI ideales para tu PyME o corporativo."
      />

      <motion.section {...reveal} className="space-y-6 rounded-2xl border border-border-subtle bg-white p-6">
        <Field label="¿Qué tamaño tiene tu empresa?">
          <div className="grid gap-3 sm:grid-cols-3">
            {SIZE_OPTS.map((o) => (
              <Choice key={o.value} active={answers.size === o.value} onClick={() => set('size', o.value)}>
                <span className="font-semibold text-text-primary">{o.label}</span>
                <span className="mt-0.5 block text-xs text-text-secondary">{o.hint}</span>
              </Choice>
            ))}
          </div>
        </Field>

        <Field label="¿Cuál es tu carga de trabajo principal?">
          <div className="flex flex-wrap gap-2">
            {WORKLOAD_OPTS.map((o) => (
              <Pill key={o.value} active={answers.workload === o.value} onClick={() => set('workload', o.value)}>
                {o.label}
              </Pill>
            ))}
          </div>
        </Field>

        <Field label="Cuéntanos un poco más">
          <div className="space-y-2">
            <Toggle label="Operas en un sector regulado (gobierno, banca, salud)" value={answers.regulated} onChange={(v) => set('regulated', v)} />
            <Toggle label="Tus datos deben permanecer en tus instalaciones" value={answers.onprem} onChange={(v) => set('onprem', v)} />
            <Toggle label="Necesitas inteligencia artificial" value={answers.ai} onChange={(v) => set('ai', v)} />
          </div>
        </Field>

        <button
          onClick={() => setResult(recommend(answers))}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Sparkles size={16} /> Calcular recomendación
        </button>
      </motion.section>

      <AnimatePresence>
        {result && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="space-y-5 rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/[0.06] to-white p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Tu paquete recomendado</p>
                <h2 className="mt-1 text-2xl font-semibold text-text-primary">{result.plan}</h2>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">{result.reason}</p>
              </div>
              <button
                onClick={() => setResult(null)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border-subtle px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-hover-bg"
              >
                <RotateCcw size={13} /> Reiniciar
              </button>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-text-primary">Servicios sugeridos</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {result.services.map((slug) => {
                  const s = SERVICE_BY_SLUG[slug];
                  const Icon = SERVICE_ICONS[s.icon];
                  return (
                    <NavLink
                      key={slug}
                      to={s.to}
                      className="group flex items-start gap-3 rounded-xl border border-border-subtle bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_40px_-14px] hover:shadow-accent/40"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 text-sm font-semibold text-text-primary">
                          {s.name}
                          <ArrowRight size={13} className="text-text-secondary transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                        </span>
                        <span className="mt-0.5 block text-xs text-text-secondary">{s.tagline}</span>
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-border-subtle pt-5">
              <NavLink
                to={ROUTES.CONTACT}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Habla con un arquitecto <ArrowRight size={16} />
              </NavLink>
              <NavLink
                to={ROUTES.PRICING}
                className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
              >
                Ver precios
              </NavLink>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-text-primary">{label}</p>
      {children}
    </div>
  );
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition-all ${
        active ? 'border-accent bg-accent/[0.06] shadow-[0_0_30px_-14px] shadow-accent/40' : 'border-border-subtle hover:border-accent/50'
      }`}
    >
      {children}
    </button>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active ? 'border-accent bg-accent text-white' : 'border-border-subtle text-text-secondary hover:border-accent/50 hover:text-text-primary'
      }`}
    >
      {children}
    </button>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex w-full items-center gap-3 rounded-lg border border-border-subtle bg-white px-4 py-3 text-left transition-colors hover:bg-hover-bg"
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
          value ? 'border-accent bg-accent text-white' : 'border-border-subtle'
        }`}
      >
        {value && <Check size={13} />}
      </span>
      <span className="text-sm text-text-primary">{label}</span>
    </button>
  );
}

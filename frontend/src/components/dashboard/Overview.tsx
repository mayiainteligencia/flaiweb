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
  AlertTriangle,
  Compass,
  CalendarCheck,
  FlaskConical,
  FileText,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CLOUD_TYPES, CLOUD_SERVICES } from '@/data/homeOffering';
import { INDUSTRIES } from '@/data/industries';
import { ROUTES } from '@/constants/routes';
import { INDUSTRY_ICONS } from './industryIcons';
import { flagAccent } from '@/components/ui/flagAccent';
import heroImg from '@/assets/images/hero/usesblack.png';
import logoFlai from '@/assets/images/logos/logo-FLAI.png';

const PROOFS: { icon: LucideIcon; label: string }[] = [
  { icon: MapPin, label: 'Datos en México' },
  { icon: Headphones, label: 'Soporte 24/7 en español' },
  { icon: ShieldCheck, label: 'Seguridad integrada' },
  { icon: Sparkles, label: 'IA aplicada' },
  { icon: Gauge, label: 'Baja latencia nacional' },
];

const WHY_MX = [
  'Tus datos viven y se rigen bajo ley mexicana.',
  'Latencia nacional baja para usuarios y aplicaciones.',
  'Soporte y operación en español, sin husos horarios ajenos.',
  'Independencia de proveedores y geopolítica extranjera.',
];

const RISKS = [
  'Datos sensibles fuera del país y de tu control.',
  'Costos en dólares que escalan sin aviso.',
  'Dependencia de un solo proveedor (lock-in).',
  'Sin plan de continuidad ni recuperación ante desastres.',
];

const MIGRATION: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: CalendarCheck, title: 'Diagnóstico', desc: 'Revisamos tu arquitectura actual y sus riesgos.' },
  { icon: FlaskConical, title: 'Prueba de concepto', desc: 'Validamos una carga real en FLAI, sin compromiso.' },
  { icon: FileText, title: 'Plan y cotización', desc: 'Hoja de ruta de migración con costos claros.' },
];

// Color de la gráfica según la columna (lg = 3 col): izq verde, centro blanca, der roja.
const CHART_COLORS = ['var(--color-green)', 'var(--color-white)', 'var(--color-red)'];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

export default function Overview() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 pb-8">
      {/* Banda de valor: texto a la izquierda, espacio para imagen a la derecha */}
      <motion.section {...reveal} className="grid items-start gap-3 pt-2 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">La Nube Mexicana</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">
            Soberana, privada, híbrida, on-prem y lista para inteligencia artificial.
          </h1>
          <p className="mt-4 text-base text-text-secondary">
            Opera, protege y escala tus datos, aplicaciones e IA dentro de México, con control,
            continuidad y soporte experto en español.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <NavLink
              to={ROUTES.CONTACT}
              className="cta-glow inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white"
            >
              Agenda un diagnóstico <ArrowRight size={16} />
            </NavLink>
            <NavLink
              to={ROUTES.ON_PREM}
              className="cta-glow inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white"
            >
              Migrar ahora <ArrowRight size={16} />
            </NavLink>
            <NavLink
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
            >
              Conoce <img src={logoFlai} alt="FLAI" className="h-4 w-auto" />
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
        </div>

        {/* Imagen del Home: formato vertical, bordes redondos, desvanecido llamativo */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={heroImg}
            alt="FLAI"
            className="img-fade aspect-[3/4] w-72 rounded-3xl object-cover shadow-lg"
          />
        </div>
      </motion.section>

      {/* Por qué una nube soberana / riesgos de la arquitectura actual */}
      <motion.section {...reveal}>
        <SectionHead title="Por qué México necesita una nube soberana" desc="Lo que ganas y lo que arriesgas si no migras." />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-card p-6">
            <h3 className="font-semibold text-text-primary">Con FLAI</h3>
            <ul className="mt-4 space-y-3">
              {WHY_MX.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border-subtle bg-card p-6">
            <h3 className="font-semibold text-text-primary">Riesgos de tu arquitectura actual</h3>
            <ul className="mt-4 space-y-3">
              {RISKS.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Tipos de nube (cards negras con gráfica) */}
      <motion.section {...reveal}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">FLAI La Nube Mexicana</p>
        <SectionHead title="Elige el tipo de nube que necesitas" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLOUD_TYPES.map((t, i) => {
            const Icon = t.icon;
            const color = CHART_COLORS[i % 3];
            return (
              <NavLink
                key={t.name}
                to={t.to}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[var(--color-black)] p-5 transition-all hover:-translate-y-0.5 hover:border-white/25"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5" style={{ color }}>
                      <Icon size={20} />
                    </span>
                    <ArrowUpRight size={18} className="text-white/30 transition-colors group-hover:text-white/70" />
                  </div>
                  <h3 className="mt-4 flex items-center gap-2 font-semibold text-white">
                    {t.name}
                    {t.badge && (
                      <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-accent">
                        {t.badge}
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">{t.desc}</p>
                </div>
                <CardChart color={color} seed={i} />
              </NavLink>
            );
          })}
        </div>
      </motion.section>

      {/* Servicios Cloud (cards blancas normales) */}
      <motion.section {...reveal}>
        <SectionHead title="Servicios Cloud" desc="Servicios cloud para operar, proteger y escalar." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLOUD_SERVICES.map((s, i) => {
            const Icon = s.icon;
            const color = CHART_COLORS[i % 3]; // verde / blanco / rojo por columna
            return (
              <NavLink
                key={s.name}
                to={s.to}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30"
              >
                {/* Acento de esquina (bandera): verde / blanco / rojo según la columna */}
                <span
                  className="pointer-events-none absolute right-0 top-0 h-9 w-9 rounded-tr-xl border-r-2 border-t-2"
                  style={{ borderColor: color }}
                />
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
                <p className="mt-1 text-sm text-text-secondary">{s.desc}</p>
              </NavLink>
            );
          })}
        </div>
      </motion.section>

      {/* Asesor: qué nube necesita tu empresa + estimación de costo */}
      <motion.section {...reveal}>
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-border-subtle bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Compass size={22} />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">¿Qué nube necesita tu empresa?</h2>
              <p className="mt-1 max-w-xl text-sm text-text-secondary">
                Responde unas preguntas y te recomendamos el tipo de nube y una estimación de cuánto
                podría costar.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <NavLink
              to={ROUTES.ADVISOR}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Usar el Asesor Cloud <ArrowRight size={16} />
            </NavLink>
            <NavLink
              to={ROUTES.PRICING}
              className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
            >
              Estimar costo
            </NavLink>
          </div>
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

      {/* Cómo migrar + siguiente paso */}
      <motion.section {...reveal}>
        <SectionHead title="Cómo migrar a FLAI" desc="Un camino claro, sin frenar tu operación." />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {MIGRATION.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="rounded-xl border border-border-subtle bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon size={20} />
                </span>
                <span className="text-sm font-semibold text-text-secondary">Paso {i + 1}</span>
              </div>
              <h3 className="mt-4 font-semibold text-text-primary">{title}</h3>
              <p className="mt-1 text-sm text-text-secondary">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <NavLink
            to={ROUTES.CONTACT}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Iniciar diagnóstico <ArrowRight size={16} />
          </NavLink>
          <NavLink
            to={ROUTES.CONTACT}
            className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
          >
            Solicitar prueba de concepto
          </NavLink>
          <NavLink
            to={ROUTES.PRICING}
            className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
          >
            Pedir cotización
          </NavLink>
          <NavLink
            to={ROUTES.CONTACT}
            className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
          >
            Hablar con un arquitecto cloud
          </NavLink>
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

// Mini-gráfica de fondo: barras tenues (fijas) + línea escalonada (ángulos 90°) que se desplaza.
// S escalones por periodo W, repetidos sobre 2×W → translateX(-W) es bucle sin saltos.
function CardChart({ color, seed }: { color: string; seed: number }) {
  const W = 240;
  const H = 84;
  const N = 11;
  const S = 6; // escalones por periodo
  const step = W / S;
  const levels = Array.from({ length: S }, (_, i) => H * (0.22 + ((seed * 31 + i * 53) % 7) / 10));
  const pts: string[] = [];
  for (let k = 0; k <= 2 * S; k++) {
    const y = levels[k % S]; // niveles periódicos con S → bucle perfecto
    pts.push(`${(k * step).toFixed(1)},${y.toFixed(1)}`); // un punto por vértice → zigzag triangular
  }
  const line = pts.join(' ');
  const bars = Array.from({ length: N }, (_, b) => 20 + ((seed * 7 + b * 17) % 50));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-5 h-20 w-full overflow-hidden" aria-hidden>
      {bars.map((h, b) => (
        <rect key={b} x={(b + 0.5) * (W / N) - 7} y={H - h} width={14} height={h} rx={3} fill="rgba(255,255,255,0.06)" />
      ))}
      <g className="chart-scroll" style={{ animationDuration: `${14 + (seed % 4) * 3}s` }}>
        <polyline
          points={line}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="square"
          strokeLinejoin="miter"
          style={{ stroke: color, filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </g>
    </svg>
  );
}

function SectionHead({ title, desc }: { title: string; desc?: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">{title}</h2>
      {desc && <p className="mt-1 text-sm text-text-secondary">{desc}</p>}
    </div>
  );
}

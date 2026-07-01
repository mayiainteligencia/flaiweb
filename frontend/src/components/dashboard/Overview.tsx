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
import logoFlai from '@/assets/images/logos/logo-FLAI.png';
import CloudCarousel from './CloudCarousel';

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
      <motion.section {...reveal} className="grid items-start gap-6 pt-2 lg:grid-cols-[minmax(0,42rem)_auto] lg:justify-start lg:gap-x-24">
        <div className="max-w-2xl">
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

        {/* Imagen del Home: carrusel coverflow (mismo tamaño que la imagen original) */}
        <div className="flex justify-center lg:justify-start">
          <CloudCarousel />
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
        <h2 className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          FLAI <span className="text-accent">La Nube Mexicana</span>
        </h2>
        <p className="mt-3 text-lg text-text-secondary sm:text-xl">Elige el tipo de nube que necesitas</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLOUD_TYPES.map((t, i) => {
            // Verde por defecto; AI Cloud roja; la de "Próximamente" (Hybrid) blanca.
            const color = t.name.includes('AI Cloud')
              ? 'var(--color-red)'
              : t.badge === 'Próximamente'
                ? 'var(--color-white)'
                : 'var(--color-green)';
            return (
              <NavLink
                key={t.name}
                to={t.to}
                className="group relative flex min-h-[15rem] flex-col justify-start overflow-hidden rounded-xl border border-white/10 bg-[var(--color-black)] p-6 transition-all hover:-translate-y-0.5 hover:border-white/25"
              >
                <CardChart color={color} seed={i} />
                {/* Difuminado superior: la línea se apaga al pasar bajo el texto */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-2/3 bg-gradient-to-b from-[var(--color-black)] via-[var(--color-black)]/85 to-transparent" />
                {/* CTA en la cima de la línea */}
                <span
                  className="cta-arrive absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-transform group-hover:translate-x-0.5"
                  style={{ color, borderColor: color, animationDuration: `${4 + (i % 3)}s` }}
                >
                  Click aquí <ArrowUpRight size={14} />
                </span>
                <div className="relative z-10 mt-12 max-w-[90%]">
                  <h3 className="flex flex-wrap items-center gap-2 text-xl font-bold text-white sm:text-2xl">
                    {t.name}
                    {t.badge && (
                      <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-accent">
                        {t.badge}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-white/75">{t.desc}</p>
                </div>
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

// Gráfica de fondo: línea en escalera (sube 45° / se mantiene 0° / sube 45°...),
// siempre ascendente hasta el CTA. Las barras acompañan la línea (sin luces).
// La cometa recorre la escalera y termina justo en el botón (offset-path).
function CardChart({ color, seed }: { color: string; seed: number }) {
  const W = 300;
  const H = 200;
  const steps = 4;
  const y0 = H * 0.9; // inicio abajo
  const top = H * 0.08; // fin arriba (junto al CTA)
  const dy = (y0 - top) / steps;
  // Escalones: rampa (sube) + meseta (se mantiene), alternados; termina en rampa arriba.
  const raw: [number, number][] = [[0, y0]];
  let x = 0;
  let y = y0;
  for (let s = 0; s < steps; s++) {
    x += 0.6; y -= dy; raw.push([x, y]); // sube ~45°
    if (s < steps - 1) { x += 0.4; raw.push([x, y]); } // se mantiene 0°
  }
  const sx = W / x; // normaliza para terminar en x = W (esquina del botón)
  const pts = raw.map(([px, py]) => [px * sx, py] as [number, number]);
  const line = pts.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' ');
  const d = 'M ' + pts.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(' L ');
  const gid = `card-grad-${seed}`;

  // y de la línea en un x dado → las barras suben hasta acompañar la escalera.
  const lineYAt = (qx: number) => {
    for (let k = 1; k < pts.length; k++) {
      const [x1, y1] = pts[k - 1];
      const [x2, y2] = pts[k];
      if (qx <= x2) {
        const t = x2 === x1 ? 0 : (qx - x1) / (x2 - x1);
        return y1 + (y2 - y1) * t;
      }
    }
    return pts[pts.length - 1][1];
  };
  const BARS = 11;
  const slot = W / BARS;
  const bw = slot * 0.55;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 z-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="55%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      {Array.from({ length: BARS }, (_, b) => {
        const cx = slot * (b + 0.5);
        const ty = lineYAt(cx) + 6;
        return <rect key={b} x={cx - bw / 2} y={ty} width={bw} height={H - ty} rx={2} fill="rgba(255,255,255,0.06)" />;
      })}
      <polyline
        points={line}
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <circle
        r={3.5}
        fill={color}
        className="chart-comet"
        style={{ offsetPath: `path('${d}')`, animationDuration: `${4 + (seed % 3)}s`, filter: `drop-shadow(0 0 5px ${color})` }}
      />
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

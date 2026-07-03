import { useMemo, useState } from 'react';

// Estimación de almacenamiento de videovigilancia. La base se calibra al ejemplo
// del proveedor (Wasabi): 10 cám / 30 fps / 12 h / 30 d / 1080p / 0.8 / H.265 ≈ 5.73 TB.
// ponytail: CAL es la perilla de ajuste; afínala si el VMS del cliente da otra base.
const CAL = 1.421;

export function estimateStorageTB(
  cameras: number,
  fps: number,
  hours: number,
  days: number,
  resolutionPx: number,
  quality: number,
  compression: number,
): number {
  const bitsPerSec = (resolutionPx * fps * quality) / compression;
  const bytesPerSec = (bitsPerSec / 8) * CAL;
  const totalBytes = bytesPerSec * hours * 3600 * days * cameras;
  return totalBytes / 1e12; // TB (decimal)
}

// Crecimiento compuesto anual a lo largo de `years` años (año 1 = base).
function growth(baseTB: number, ratePct: number, years = 5): number[] {
  const r = 1 + ratePct / 100;
  return Array.from({ length: years }, (_, i) => baseTB * r ** i);
}

// Verificación en dev: el ejemplo de referencia debe caer cerca de 5.73 TB.
if (import.meta.env.DEV) {
  const ref = estimateStorageTB(10, 30, 12, 30, 2073600, 0.8, 20);
  console.assert(Math.abs(ref - 5.73) < 0.1, `calc storage ref ≈ 5.73, got ${ref.toFixed(2)}`);
}

const RESOLUTIONS = [
  { label: 'HD 720p (1 MP)', value: 921600 },
  { label: 'Full HD 1080p (2 MP)', value: 2073600 },
  { label: '2K (4 MP)', value: 4085760 },
  { label: '5 MP', value: 5038848 },
  { label: '4K UHD (8 MP)', value: 8294400 },
];
const QUALITIES = [
  { label: 'Baja', value: 0.5 },
  { label: 'Media', value: 0.8 },
  { label: 'Alta', value: 1.2 },
  { label: 'Máxima', value: 1.6 },
];
const COMPRESSIONS = [
  { label: 'H.264 (estándar)', value: 10 },
  { label: 'H.265 / HEVC', value: 20 },
  { label: 'H.265+ (máxima)', value: 30 },
];

type Slider = { key: 'cameras' | 'fps' | 'hours' | 'days'; label: string; min: number; max: number; step: number };
const SLIDERS: Slider[] = [
  { key: 'cameras', label: 'Número de cámaras', min: 1, max: 200, step: 1 },
  { key: 'fps', label: 'Fotogramas por segundo', min: 1, max: 60, step: 1 },
  { key: 'hours', label: 'Horas por día', min: 1, max: 24, step: 1 },
  { key: 'days', label: 'Número de días almacenados', min: 1, max: 365, step: 1 },
];

export default function SurveillanceCalculator() {
  const [cameras, setCameras] = useState(10);
  const [fps, setFps] = useState(30);
  const [hours, setHours] = useState(12);
  const [days, setDays] = useState(30);
  const [resolution, setResolution] = useState(2073600);
  const [quality, setQuality] = useState(0.8);
  const [compression, setCompression] = useState(20);

  const nums = { cameras, fps, hours, days };
  const setters = { cameras: setCameras, fps: setFps, hours: setHours, days: setDays };

  const total = useMemo(
    () => estimateStorageTB(cameras, fps, hours, days, resolution, quality, compression),
    [cameras, fps, hours, days, resolution, quality, compression],
  );
  const series20 = useMemo(() => growth(total, 20), [total]);
  const series50 = useMemo(() => growth(total, 50), [total]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary">Calculadora de almacenamiento para videovigilancia</h2>
      <p className="mt-1 max-w-3xl text-sm text-text-secondary">
        Introduce las especificaciones de tu sistema de cámaras y observa cómo el gráfico estima
        dinámicamente el aumento de tus necesidades de almacenamiento.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Controles */}
        <div className="rounded-xl border border-border-subtle bg-card p-5">
          <div className="space-y-5">
            {SLIDERS.map((s) => (
              <label key={s.key} className="block">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-text-secondary">{s.label}</span>
                  <span className="text-sm font-semibold text-text-primary">{nums[s.key]}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={nums[s.key]}
                  onChange={(e) => setters[s.key](Number(e.target.value))}
                  className="mt-2 w-full accent-[var(--color-red)]"
                />
              </label>
            ))}

            <div className="grid gap-4 sm:grid-cols-3">
              <Select label="Resolución" value={resolution} onChange={setResolution} options={RESOLUTIONS} />
              <Select label="Calidad de vídeo" value={quality} onChange={setQuality} options={QUALITIES} />
              <Select label="Tipo de compresión" value={compression} onChange={setCompression} options={COMPRESSIONS} />
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-accent/10 px-4 py-3">
            <span className="text-sm text-text-secondary">Almacenamiento total: </span>
            <span className="text-lg font-bold text-accent">{total.toFixed(2)} TB</span>
          </div>
        </div>

        {/* Gráfica de crecimiento (estilo tarjetas FLAI) */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[var(--color-black)] p-5">
          <p className="text-sm font-semibold text-white">Crecimiento proyectado de los datos de vídeo</p>
          <GrowthChart series20={series20} series50={series50} />
          <div className="flex gap-5 text-xs text-white/70">
            <Legend color="var(--color-green)" label="Crecimiento 20%" />
            <Legend color="var(--color-red)" label="Crecimiento 50%" />
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-text-secondary/80">
        * Esta cifra es solo una estimación basada en cálculos del sector. Para la estimación más
        precisa, usa la calculadora del proveedor de tu sistema de gestión de vídeo (VMS).
      </p>
    </div>
  );
}

function Select<T extends number>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { label: string; value: number }[];
}) {
  return (
    <label className="block">
      <span className="text-sm text-text-secondary">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as T)}
        className="mt-1.5 w-full rounded-md border border-border-subtle bg-card px-3 py-2 text-sm text-text-primary"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

// Gráfica de líneas sobre fondo oscuro: barras tenues + dos líneas con glow (verde/roja).
function GrowthChart({ series20, series50 }: { series20: number[]; series50: number[] }) {
  const W = 520;
  const H = 220;
  const padL = 34;
  const padB = 22;
  const padT = 12;
  const plotW = W - padL - 8;
  const plotH = H - padT - padB;
  const years = series20.length;

  const rawMax = Math.max(...series50, 1);
  const max = niceMax(rawMax);
  const x = (i: number) => padL + (years === 1 ? plotW / 2 : (i / (years - 1)) * plotW);
  const y = (v: number) => padT + (1 - v / max) * plotH;

  const toLine = (s: number[]) => s.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const toPath = (s: number[]) => 'M ' + s.map((v, i) => `${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' L ');
  const base = (H - padB).toFixed(1);
  const ticks = 5;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="my-3 h-44 w-full" role="img" aria-label="Crecimiento proyectado del almacenamiento en TB">
      <defs>
        <linearGradient id="sv-green" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-green)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-green)" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="sv-red" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-red)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-red)" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Rejilla + eje Y (TB) */}
      {Array.from({ length: ticks + 1 }, (_, t) => {
        const v = (max / ticks) * t;
        const gy = y(v);
        return (
          <g key={t}>
            <line x1={padL} y1={gy} x2={W - 8} y2={gy} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            <text x={padL - 6} y={gy + 3} textAnchor="end" fontSize={9} fill="rgba(255,255,255,0.5)">
              {Math.round(v)}
            </text>
          </g>
        );
      })}

      {/* Rejilla vertical por año */}
      {series50.map((_, i) => (
        <line key={i} x1={x(i)} y1={padT} x2={x(i)} y2={H - padB} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
      ))}

      {/* Área bajo cada línea */}
      <path d={`${toPath(series20)} L ${x(years - 1).toFixed(1)} ${base} L ${x(0).toFixed(1)} ${base} Z`} fill="var(--color-green)" fillOpacity={0.1} />
      <path d={`${toPath(series50)} L ${x(years - 1).toFixed(1)} ${base} L ${x(0).toFixed(1)} ${base} Z`} fill="var(--color-red)" fillOpacity={0.12} />

      {/* Líneas con glow */}
      <polyline points={toLine(series20)} fill="none" stroke="url(#sv-green)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px var(--color-green))' }} />
      <polyline points={toLine(series50)} fill="none" stroke="url(#sv-red)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px var(--color-red))' }} />

      {/* Puntos + valor por año */}
      {series50.map((v, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(v)} r={3} fill="var(--color-red)" stroke="var(--color-black)" strokeWidth={1.5} />
          <text x={x(i)} y={y(v) - 8} textAnchor="middle" fontSize={9} fontWeight={600} fill="var(--color-red)">
            {v.toFixed(1)}
          </text>
        </g>
      ))}
      {series20.map((v, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(v)} r={3} fill="var(--color-green)" stroke="var(--color-black)" strokeWidth={1.5} />
          {i > 0 && (
            <text x={x(i)} y={y(v) + 15} textAnchor="middle" fontSize={9} fontWeight={600} fill="var(--color-green)">
              {v.toFixed(1)}
            </text>
          )}
        </g>
      ))}

      {/* Etiquetas de años */}
      {series20.map((_, i) => (
        <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.5)">
          {`Año ${i + 1}`}
        </text>
      ))}
    </svg>
  );
}

// Redondea el tope del eje a un valor "bonito" (5, 10, 25, 50, ...).
function niceMax(v: number): number {
  const steps = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 300, 500, 1000];
  return steps.find((s) => s >= v) ?? Math.ceil(v / 1000) * 1000;
}

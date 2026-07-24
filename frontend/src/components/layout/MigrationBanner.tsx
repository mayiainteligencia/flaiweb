import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MIGRATION_PROMO } from '@/data/promo';
import './MigrationBanner.css';

const KEY = 'flai_migbanner_dismissed';

/* ------------------------------------------------------------------ */
/*  Fecha límite de la promo (ajustar según campaña).                  */
/*  Si la fecha ya pasó el banner no se muestra.                       */
/* ------------------------------------------------------------------ */
const PROMO_END = new Date('2026-08-31T23:59:59');

/* Beneficios que rotan en el ticker inferior */
const TICKER_ITEMS = [
  '1ER MES DE OPERACIÓN GRATIS',
  'DIAGNÓSTICO DE MIGRACIÓN SIN COSTO',
  'SOPORTE DEDICADO 24/7',
  'SLA 99.95% GARANTIZADO',
  'INFRAESTRUCTURA SOBERANA EN MÉXICO',
  'ENVÍO DE DATOS ILIMITADO',
  'CONSULTORÍA CLOUD GRATUITA',
];

/* ─── Helpers ─── */
function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    mins: Math.floor((diff / 60_000) % 60),
    secs: Math.floor((diff / 1_000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/* ================================================================== */
/*  MigrationBanner                                                    */
/*  • Barra superior con countdown + CTA + ticker de beneficios        */
/*  • Adaptativo mobile / desktop                                      */
/* ================================================================== */
export default function MigrationBanner() {
  // Se muestra por defecto (también en SSR) → reserva su altura desde el primer
  // paint y NO provoca CLS en visitantes nuevos ni en crawlers. En cliente se
  // oculta solo si el usuario ya la cerró o la promo expiró (colapso reverso, raro).
  const [hidden, setHidden] = useState(false);
  // time = null en SSR y primera hidratación → placeholders "--" (evita el
  // mismatch de hidratación que causaría el countdown basado en Date.now()).
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    if (localStorage.getItem(KEY) === '1' || Date.now() > PROMO_END.getTime()) {
      setHidden(true);
      return;
    }
    setTime(getTimeLeft(PROMO_END));
    const id = setInterval(() => {
      const t = getTimeLeft(PROMO_END);
      setTime(t);
      if (t.days + t.hours + t.mins + t.secs === 0) setHidden(true);
    }, 1_000);
    return () => clearInterval(id);
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem(KEY, '1');
    setHidden(true);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="migration-banner"
          // Solo fade (opacity no afecta layout) → sin CLS. El colapso de altura
          // queda para exit (cierre por el usuario), que no cuenta como CLS.
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mig-root relative z-50 shrink-0 overflow-hidden"
        >
          {/* ─── Fila Principal ─── */}
          <div className="mig-main">
            {/* Shimmer decorativo */}
            <div className="mig-shimmer" aria-hidden />

            {/* Cerrar — siempre en la esquina superior derecha */}
            <button
              onClick={dismiss}
              aria-label="Cerrar promoción"
              className="mig-close"
            >
              <X size={14} />
            </button>

            {/* ── ROW 1 (mobile) / inline (desktop): Texto ── */}
            <div className="mig-row1">
              <span className="mig-headline">MIGRACIÓN SIN COSTO</span>
              <span className="mig-sub">
                Operación gratuita el 1er mes&nbsp;|&nbsp;Diagnóstico incluido
              </span>
            </div>

            {/* Separador vertical (solo desktop) */}
            <span className="mig-sep" aria-hidden />

            {/* ── ROW 2 (mobile) / inline (desktop): Countdown + CTA ── */}
            <div className="mig-row2">
              <div className="mig-countdown" aria-label="Tiempo restante de la promoción">
                <CountdownUnit value={time?.days ?? null} label="días" />
                <span className="mig-colon">:</span>
                <CountdownUnit value={time?.hours ?? null} label="hrs" />
                <span className="mig-colon">:</span>
                <CountdownUnit value={time?.mins ?? null} label="min" />
                <span className="mig-colon">:</span>
                <CountdownUnit value={time?.secs ?? null} label="seg" />
              </div>

              <NavLink to={MIGRATION_PROMO.to} className="mig-cta">
                {MIGRATION_PROMO.cta}
              </NavLink>
            </div>
          </div>

          {/* ─── Ticker inferior con beneficios ─── */}
          <div className="mig-ticker" aria-label="Beneficios de la promoción">
            <div className="mig-ticker-track">
              {/* Duplicamos los items para loop infinito */}
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="mig-ticker-item">
                  <span className="mig-ticker-dot" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Sub-componente: dígito del countdown ─── */
// value = null en SSR/primer render → "--" (mismo ancho por min-width en CSS, sin CLS).
function CountdownUnit({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="mig-unit">
      <span className="mig-digits">{value == null ? '--' : pad(value)}</span>
      <span className="mig-label">{label}</span>
    </div>
  );
}

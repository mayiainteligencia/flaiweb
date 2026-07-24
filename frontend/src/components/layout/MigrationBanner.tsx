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
  const [hidden, setHidden] = useState(() => {
    if (localStorage.getItem(KEY) === '1') return true;
    if (Date.now() > PROMO_END.getTime()) return true;
    return false;
  });

  const [time, setTime] = useState(() => getTimeLeft(PROMO_END));

  useEffect(() => {
    if (hidden) return;
    const id = setInterval(() => {
      const t = getTimeLeft(PROMO_END);
      setTime(t);
      // Si la promo terminó, ocultar automáticamente
      if (t.days + t.hours + t.mins + t.secs === 0) {
        setHidden(true);
      }
    }, 1_000);
    return () => clearInterval(id);
  }, [hidden]);

  const dismiss = useCallback(() => {
    localStorage.setItem(KEY, '1');
    setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="migration-banner"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mig-root relative z-50 shrink-0 overflow-hidden"
        >
          {/* ─── Fila Principal ─── */}
          <div className="mig-main">
            {/* Shimmer decorativo */}
            <div className="mig-shimmer" aria-hidden />

            {/* Texto de la promo */}
            <div className="mig-copy">
              <span className="mig-headline">MIGRACIÓN SIN COSTO</span>
              <span className="mig-sub hidden sm:inline">
                Operación gratuita el 1er mes&nbsp;|&nbsp;Diagnóstico de migración incluido
              </span>
            </div>

            {/* Separador vertical (solo desktop) */}
            <span className="mig-sep hidden sm:block" aria-hidden />

            {/* Countdown */}
            <div className="mig-countdown" aria-label="Tiempo restante de la promoción">
              <CountdownUnit value={time.days} label="días" />
              <span className="mig-colon">:</span>
              <CountdownUnit value={time.hours} label="hrs" />
              <span className="mig-colon">:</span>
              <CountdownUnit value={time.mins} label="min" />
              <span className="mig-colon">:</span>
              <CountdownUnit value={time.secs} label="seg" />
            </div>

            {/* Separador vertical (solo desktop) */}
            <span className="mig-sep hidden sm:block" aria-hidden />

            {/* CTA */}
            <NavLink to={MIGRATION_PROMO.to} className="mig-cta">
              {MIGRATION_PROMO.cta}
            </NavLink>

            {/* Cerrar */}
            <button
              onClick={dismiss}
              aria-label="Cerrar promoción"
              className="mig-close"
            >
              <X size={14} />
            </button>
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
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="mig-unit">
      <span className="mig-digits">{pad(value)}</span>
      <span className="mig-label">{label}</span>
    </div>
  );
}

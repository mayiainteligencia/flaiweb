import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MIGRATION_PROMO } from '@/data/promo';
import './MigrationBanner.css';

const KEY = 'flai_migbanner_dismissed';
const DAY = 86_400_000;

// Ventana de la promo (calendario, zona horaria de México).
const START_UTC = Date.UTC(2026, 6, 31); // 31 jul 2026
const END_UTC = Date.UTC(2026, 10, 20); //  20 nov 2026

// Beneficios que rotan en el ticker inferior.
const TICKER_ITEMS = [
  '1ER MES DE OPERACIÓN GRATIS',
  'DIAGNÓSTICO DE MIGRACIÓN SIN COSTO',
  'SOPORTE DEDICADO 24/7',
  'SLA 99.95% GARANTIZADO',
  'INFRAESTRUCTURA SOBERANA EN MÉXICO',
  'ENVÍO DE DATOS ILIMITADO',
  'CONSULTORÍA CLOUD GRATUITA',
];

// Días restantes hasta el 20 nov 2026, calculados en America/Mexico_City.
// Devuelve un entero > 0, o null si la promo aún no empieza o ya terminó.
// Se usa Math.ceil: el día en curso cuenta como día restante.
function daysLeftMX(): number | null {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  const [y, m, d] = parts.split('-').map(Number);
  const todayUTC = Date.UTC(y, m - 1, d);
  if (todayUTC < START_UTC || todayUTC > END_UTC) return null; // fuera de ventana
  const left = Math.ceil((END_UTC - todayUTC) / DAY);
  return left > 0 ? left : null;
}

export default function MigrationBanner() {
  // Se muestra por defecto (también en SSR) → reserva su altura desde el primer
  // paint y NO provoca CLS. En cliente se oculta si el usuario la cerró o la promo
  // está fuera de ventana.
  const [hidden, setHidden] = useState(false);
  // days = null en SSR y primera hidratación → placeholder "—" (sin número, sin
  // hydration mismatch). El cálculo real (Date/Intl) va en useEffect, cliente only.
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    if (localStorage.getItem(KEY) === '1') {
      setHidden(true);
      return;
    }
    const update = () => {
      const left = daysLeftMX();
      if (left === null) {
        setHidden(true);
        return;
      }
      setDays(left);
    };
    update();
    // Recalcular cada hora cubre el cambio de día (medianoche) en tabs abiertas.
    const id = setInterval(update, 60 * 60 * 1000);
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
          <div className="mig-main">
            <div className="mig-shimmer" aria-hidden />

            <button onClick={dismiss} aria-label="Cerrar promoción" className="mig-close">
              <X size={14} />
            </button>

            {/* Copy en una sola línea. En SSR days=null → "—" (sin número). */}
            <p className="mig-copy">
              Tienes <span className="mig-days">{days ?? '—'}</span> días para migrar gratis y
              obtener tu primer mes incluido. <span className="mig-urge">¡Apúrate!</span>
            </p>

            <NavLink to={MIGRATION_PROMO.to} className="mig-cta">
              {MIGRATION_PROMO.cta}
            </NavLink>
          </div>

          {/* Ticker inferior con beneficios */}
          <div className="mig-ticker" aria-label="Beneficios de la promoción">
            <div className="mig-ticker-track">
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

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Cloud,
  Factory,
  Store,
  Handshake,
  ShieldCheck,
  Tag,
  BookOpen,
  Mail,
  Calculator,
  ChevronUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { SERVICES } from '@/data/services';
import { INDUSTRIES } from '@/data/industries';

type SubLink = { label: string; to: string };
// Un tab navega directo (`to`) o despliega un submenú hacia arriba (`items`).
type Tab = { label: string; icon: LucideIcon; match: string; to?: string; items?: SubLink[] };

const RESOURCE_LINKS: SubLink[] = [
  { label: 'Documentación', to: ROUTES.DOCS },
  { label: 'White Papers', to: ROUTES.WHITEPAPERS },
  { label: 'Blog', to: ROUTES.BLOG },
];

const TABS: Tab[] = [
  { label: 'Inicio', to: ROUTES.DASHBOARD, icon: Home, match: '/inicio' },
  { label: 'Servicios', icon: Cloud, match: '/services', items: SERVICES.map((s) => ({ label: s.name, to: s.to })) },
  { label: 'Industrias', icon: Factory, match: '/industries', items: INDUSTRIES.map((i) => ({ label: i.name, to: i.to })) },
  { label: 'Marketplace', to: ROUTES.MARKETPLACE, icon: Store, match: '/marketplace' },
  { label: 'Partners', to: ROUTES.PARTNERS, icon: Handshake, match: '/partners' },
  { label: 'Trust', to: ROUTES.TRUST_CENTER, icon: ShieldCheck, match: '/trust-center' },
  { label: 'Precios', to: ROUTES.PRICING, icon: Tag, match: '/precios' },
  { label: 'Recursos', icon: BookOpen, match: '/recursos', items: RESOURCE_LINKS },
  { label: 'Contacto', to: ROUTES.CONTACT, icon: Mail, match: '/contacto' },
  { label: 'Asesor', to: ROUTES.ADVISOR, icon: Calculator, match: '/asesor-cloud' },
];

function indexForPath(pathname: string): number {
  const i = TABS.findIndex((t) => pathname.startsWith(t.match));
  return i === -1 ? 0 : i;
}

export default function MobileTabBar({ visible = true }: { visible?: boolean }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(() => indexForPath(pathname));
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({ width: 0, x: 0 });

  const btnRefs = useRef<(HTMLElement | null)[]>([]);

  // Al cambiar de ruta: actualiza el tab activo y cierra cualquier submenú.
  useEffect(() => {
    setActive(indexForPath(pathname));
    setOpenIdx(null);
  }, [pathname]);

  const highlight = openIdx ?? active;

  // Mueve el indicador hacia el tab resaltado (offsetLeft → se desplaza junto al scroll).
  useLayoutEffect(() => {
    const update = () => {
      const el = btnRefs.current[highlight];
      if (el) setIndicator({ width: el.offsetWidth, x: el.offsetLeft });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [highlight]);

  useEffect(() => {
    btnRefs.current[highlight]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [highlight]);

  const go = (to: string) => {
    navigate(to);
    setOpenIdx(null);
  };

  const tabClass = (isActive: boolean) =>
    [
      'relative z-10 flex w-[4.5rem] shrink-0 flex-col items-center gap-1 rounded-full px-2 py-1.5 transition-colors',
      isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary',
    ].join(' ');

  return (
    <>
      {/* Backdrop para cerrar el submenú al tocar fuera */}
      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
          />
        )}
      </AnimatePresence>

      <div
        className={[
          'fixed inset-x-0 bottom-4 z-40 flex flex-col items-center gap-2 px-3 transition-all duration-300 lg:hidden',
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0',
        ].join(' ')}
      >
        {/* Submenú que se despliega hacia arriba */}
        <AnimatePresence>
          {openIdx !== null && TABS[openIdx].items && (
            <motion.div
              key={openIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="max-h-[55vh] w-full max-w-sm overflow-y-auto rounded-2xl border border-border-subtle bg-sidebar-bg p-2 shadow-xl"
            >
              <p className="px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                {TABS[openIdx].label}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {TABS[openIdx].items!.map((it) => (
                  <button
                    key={it.to + it.label}
                    onClick={() => go(it.to)}
                    className="rounded-lg px-3 py-2.5 text-left text-sm text-text-primary transition-colors hover:bg-hover-bg active:bg-accent/10"
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pill de tabs */}
        <div className="relative flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-border-subtle bg-sidebar-bg px-1.5 py-1.5 shadow-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Indicador deslizante */}
          <motion.div
            className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-accent/10"
            animate={{ width: indicator.width, x: indicator.x }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />

          {TABS.map((tab, index) => {
            const isActive = index === highlight;
            const TabIcon = tab.icon;
            const setRef = (el: HTMLElement | null) => (btnRefs.current[index] = el);

            if (tab.items) {
              const open = openIdx === index;
              return (
                <button
                  key={tab.label}
                  ref={setRef}
                  onClick={() => setOpenIdx(open ? null : index)}
                  className={tabClass(isActive)}
                >
                  <span className="relative">
                    <TabIcon size={20} className="shrink-0" />
                    <ChevronUp
                      size={11}
                      className={`absolute -right-2 -top-1.5 transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </span>
                  <span className="text-[0.66rem] font-medium leading-none">{tab.label}</span>
                </button>
              );
            }

            return (
              <NavLink
                key={tab.label}
                to={tab.to!}
                ref={setRef}
                onClick={() => {
                  setActive(index);
                  setOpenIdx(null);
                }}
                className={tabClass(isActive)}
              >
                <TabIcon size={20} className="shrink-0" />
                <span className="text-[0.66rem] font-medium leading-none">{tab.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

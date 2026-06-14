import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

type Tab = { label: string; to: string; icon: LucideIcon; match: string };

// Navegación principal en móvil: pill flotante con indicador deslizante.
// `match` = prefijo de ruta para marcar el tab activo según la URL.
const TABS: Tab[] = [
  { label: 'Inicio', to: ROUTES.HOME, icon: Home, match: '/' },
  { label: 'Servicios', to: ROUTES.COMPUTE, icon: Cloud, match: '/services' },
  { label: 'Industrias', to: ROUTES.GOBIERNO, icon: Factory, match: '/industries' },
  { label: 'Marketplace', to: ROUTES.MARKETPLACE, icon: Store, match: '/marketplace' },
  { label: 'Partners', to: ROUTES.PARTNERS, icon: Handshake, match: '/partners' },
  { label: 'Trust', to: ROUTES.TRUST_CENTER, icon: ShieldCheck, match: '/trust-center' },
  { label: 'Precios', to: ROUTES.PRICING, icon: Tag, match: '/precios' },
  { label: 'Recursos', to: ROUTES.DOCS, icon: BookOpen, match: '/recursos' },
  { label: 'Contacto', to: ROUTES.CONTACT, icon: Mail, match: '/contacto' },
];

function indexForPath(pathname: string): number {
  if (pathname === '/') return 0;
  const i = TABS.findIndex((t) => t.match !== '/' && pathname.startsWith(t.match));
  return i === -1 ? 0 : i;
}

export default function MobileTabBar({ visible = true }: { visible?: boolean }) {
  const { pathname } = useLocation();
  const [active, setActive] = useState(() => indexForPath(pathname));
  const [indicator, setIndicator] = useState({ width: 0, x: 0 });

  const btnRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => setActive(indexForPath(pathname)), [pathname]);

  // Mueve el indicador hacia el tab activo (offsetLeft → se desplaza junto al scroll).
  useLayoutEffect(() => {
    const update = () => {
      const el = btnRefs.current[active];
      if (el) setIndicator({ width: el.offsetWidth, x: el.offsetLeft });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [active]);

  // Centra el tab activo dentro del scroll horizontal.
  useEffect(() => {
    btnRefs.current[active]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  return (
    <div
      className={[
        'fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 transition-all duration-300 lg:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0',
      ].join(' ')}
    >
      <div className="relative flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-border-subtle bg-sidebar-bg px-1.5 py-1.5 shadow-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Indicador deslizante */}
        <motion.div
          className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-accent/10"
          animate={{ width: indicator.width, x: indicator.x }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />

        {TABS.map((tab, index) => {
          const isActive = index === active;
          const TabIcon = tab.icon;
          return (
            <NavLink
              key={tab.label}
              to={tab.to}
              ref={(el) => (btnRefs.current[index] = el)}
              onClick={() => setActive(index)}
              className={[
                'relative z-10 flex w-[4.5rem] shrink-0 flex-col items-center gap-1 rounded-full px-2 py-1.5 transition-colors',
                isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary',
              ].join(' ')}
            >
              <TabIcon size={20} className="shrink-0" />
              <span className="text-[0.66rem] font-medium leading-none">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

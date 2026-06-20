import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import logoFlai from '@/assets/images/logos/logo-FLAI.png';

type NavLeaf = { label: string; to: string; badge?: string };
type NavNode =
  | { type: 'item'; label: string; to: string; icon: IconName }
  | { type: 'group'; key: string; label: string; icon: IconName; items: NavLeaf[] };

const NAV: NavNode[] = [
  { type: 'item', label: 'Inicio', to: ROUTES.DASHBOARD, icon: 'home' },
  {
    type: 'group',
    key: 'servicios',
    label: 'Servicios Cloud',
    icon: 'server',
    items: [
      { label: 'Cómputo', to: ROUTES.COMPUTE },
      { label: 'Nube Privada', to: ROUTES.PRIVATE_CLOUD },
      { label: 'On-Prem Cloud', to: ROUTES.ON_PREM },
      { label: 'Kubernetes', to: ROUTES.KUBERNETES },
      { label: 'Almacenamiento', to: ROUTES.STORAGE },
      { label: 'Bases de Datos', to: ROUTES.DATABASES },
      { label: 'Red & Conectividad', to: ROUTES.NETWORKING },
      { label: 'Seguridad & Trust', to: ROUTES.SECURITY },
      { label: 'Backup & DRP', to: ROUTES.BACKUP_DRP },
      { label: 'AI Cloud', to: ROUTES.AI_CLOUD, badge: 'Nuevo' },
    ],
  },
  {
    type: 'group',
    key: 'industrias',
    label: 'Industrias',
    icon: 'industries',
    items: [
      { label: 'Gobierno', to: ROUTES.GOBIERNO },
      { label: 'Banca & Finanzas', to: ROUTES.BANCA },
      { label: 'Salud', to: ROUTES.SALUD },
      { label: 'Manufactura', to: ROUTES.MANUFACTURA },
      { label: 'Retail', to: ROUTES.RETAIL },
      { label: 'Educación', to: ROUTES.EDUCACION },
    ],
  },
  { type: 'item', label: 'Marketplace', to: ROUTES.MARKETPLACE, icon: 'marketplace' },
  { type: 'item', label: 'Partners', to: ROUTES.PARTNERS, icon: 'partners' },
  { type: 'item', label: 'Trust Center', to: ROUTES.TRUST_CENTER, icon: 'trust' },
  { type: 'item', label: 'Precios', to: ROUTES.PRICING, icon: 'pricing' },
  {
    type: 'group',
    key: 'recursos',
    label: 'Recursos',
    icon: 'resources',
    items: [
      { label: 'Documentación', to: ROUTES.DOCS },
      { label: 'White Papers', to: ROUTES.WHITEPAPERS },
      { label: 'Blog', to: ROUTES.BLOG },
    ],
  },
  { type: 'item', label: 'Contacto', to: ROUTES.CONTACT, icon: 'mail' },
];

const itemClass = (collapsed: boolean) => (active: boolean) =>
  [
    'group flex items-center h-10 rounded-md text-sm border-l-[3px] transition-all duration-200',
    collapsed ? 'justify-center px-0' : 'gap-3 px-3',
    active
      ? 'bg-white/[0.12] border-accent text-white shadow-[0_0_14px_rgba(255,26,26,0.35)]'
      : 'border-transparent text-white/65 hover:bg-white/10 hover:text-white hover:translate-x-0.5',
  ].join(' ');

const leafClass = (active: boolean) =>
  [
    'flex items-center justify-between h-9 pl-[2.6rem] pr-3 text-[0.82rem] border-l-[3px] transition-all duration-200',
    active
      ? 'bg-white/[0.12] border-accent text-white shadow-[0_0_14px_rgba(255,26,26,0.35)]'
      : 'border-transparent text-white/60 hover:bg-white/10 hover:text-white hover:translate-x-0.5',
  ].join(' ');

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({ servicios: true });

  const toggleGroup = (key: string) => {
    if (collapsed) {
      onToggle(); // expandir el rail y abrir el grupo
      setOpen((o) => ({ ...o, [key]: true }));
      return;
    }
    setOpen((o) => ({ ...o, [key]: !o[key] }));
  };

  return (
    <aside
      style={{ background: 'var(--sidebar-gradient)' }}
      className={[
        'hidden h-screen flex-col border-r border-white/10',
        'lg:flex lg:static lg:shrink-0 lg:transition-[width]',
        collapsed ? 'lg:w-16' : 'lg:w-60',
      ].join(' ')}
    >
      {/* Logo centrado + toggle de colapso */}
      <div className="relative flex h-16 items-center justify-center border-b border-white/10 px-2">
        {!collapsed && (
          <NavLink to={ROUTES.HOME} title="Ir a la nube FLAI">
            <img src={logoFlai} alt="FLAI" className="logo-glow h-8 w-auto" />
          </NavLink>
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          className="absolute right-2 hidden h-9 w-9 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:flex"
        >
          <Icon name="panel" />
        </button>
      </div>

      {/* Navegación con scroll independiente */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {NAV.map((node) =>
          node.type === 'item' ? (
            <NavLink
              key={node.label}
              to={node.to}
              end={node.to === ROUTES.HOME}
              title={collapsed ? node.label : undefined}
              className={({ isActive }) => itemClass(collapsed)(isActive)}
            >
              <Icon name={node.icon} />
              {!collapsed && <span className="truncate">{node.label}</span>}
            </NavLink>
          ) : (
            <div key={node.key} className="mt-1">
              <button
                onClick={() => toggleGroup(node.key)}
                title={collapsed ? node.label : undefined}
                className={[
                  'flex h-10 w-full items-center rounded-md text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/55 transition-colors hover:text-white',
                  collapsed ? 'justify-center px-0' : 'gap-3 px-3',
                ].join(' ')}
              >
                <Icon name={node.icon} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{node.label}</span>
                    <Chevron open={!!open[node.key]} />
                  </>
                )}
              </button>

              {!collapsed && open[node.key] && (
                <div className="mt-0.5">
                  {node.items.map((leaf) => (
                    <NavLink
                      key={leaf.label}
                      to={leaf.to}
                      className={({ isActive }) => leafClass(isActive)}
                    >
                      <span className="truncate">{leaf.label}</span>
                      {leaf.badge && (
                        <span className="ml-2 rounded bg-accent/15 px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-accent">
                          {leaf.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ),
        )}
      </nav>

      {/* Asesor Cloud, separado abajo */}
      <div className="border-t border-white/10 px-2 py-3">
        <NavLink
          to={ROUTES.ADVISOR}
          title={collapsed ? 'Asesor Cloud' : undefined}
          className={({ isActive }) => itemClass(collapsed)(isActive)}
        >
          <Icon name="advisor" />
          {!collapsed && <span className="truncate">Asesor Cloud</span>}
        </NavLink>
      </div>
    </aside>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export type IconName =
  | 'home'
  | 'server'
  | 'industries'
  | 'marketplace'
  | 'partners'
  | 'trust'
  | 'pricing'
  | 'resources'
  | 'mail'
  | 'advisor'
  | 'panel';

const ICONS: Record<IconName, JSX.Element> = {
  home: (
    <>
      <path d="M3 10.5 12 4l9 6.5" />
      <path d="M5 9.5V20h14V9.5" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  industries: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  marketplace: (
    <>
      <path d="M4 9 5 4h14l1 5" />
      <path d="M5 9v11h14V9" />
      <path d="M9.5 20v-6h5v6" />
    </>
  ),
  partners: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 5.5a3 3 0 0 1 0 6" />
    </>
  ),
  trust: (
    <>
      <path d="M12 3 19 6v6c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  pricing: (
    <>
      <path d="M3 12V4h8l9 9-8 8-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1" />
    </>
  ),
  resources: (
    <>
      <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z" />
      <path d="M5 16.5h13" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  advisor: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v3M8 18h4" />
    </>
  ),
  panel: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16" />
    </>
  ),
};

export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {ICONS[name]}
    </svg>
  );
}

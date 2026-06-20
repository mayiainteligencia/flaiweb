import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Calendar, Search as SearchIcon, ChevronLeft, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { CONTACT } from '@/data/contact';
import logoFlai from '@/assets/images/logos/logo-FLAI.png';
import SearchBox from './SearchBox';

// Fecha de hoy, formato corto "18 jun 2026".
const TODAY = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
  .format(new Date())
  .replace('.', '');

function Action({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      title={label}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="inline-flex h-9 items-center gap-2 rounded-full border border-border-subtle px-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
    >
      <Icon size={16} />
      <span className="hidden lg:inline">{label}</span>
    </a>
  );
}

export default function Header({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="relative flex h-16 shrink-0 items-center gap-3 border-b border-border-subtle bg-header-bg px-4">
      {/* Logo de FLAI: siempre visible en la barra superior */}
      <NavLink to={ROUTES.HOME} title="Ir a la nube FLAI" className="shrink-0">
        <img src={logoFlai} alt="FLAI" className="h-8 w-auto" />
      </NavLink>

      {/* Colapsar/expandir el sidebar (desktop) */}
      <button
        onClick={onToggle}
        aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_12px_rgba(255,42,42,0.45)] transition-transform hover:scale-105 lg:flex"
      >
        <ChevronLeft size={16} className={collapsed ? 'rotate-180' : ''} />
      </button>

      {/* Barra del asistente (desktop, centrada) */}
      <div className="mx-auto hidden w-full max-w-2xl lg:block">
        <SearchBox />
      </div>

      {/* Empuja los controles a la derecha en móvil */}
      <div className="flex-1 lg:hidden" />

      {/* Lupa: abre el buscador en móvil */}
      <button
        onClick={() => setSearchOpen(true)}
        aria-label="Buscar"
        className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-hover-bg hover:text-text-primary lg:hidden"
      >
        <SearchIcon size={18} />
      </button>

      {/* Acciones rápidas (labels solo en desktop) */}
      <nav className="flex shrink-0 items-center gap-2">
        <Action href={CONTACT.whatsapp} icon={MessageCircle} label="WhatsApp" external />
        <Action href={CONTACT.email} icon={Mail} label="Email" />
        <Action href={CONTACT.phone} icon={Phone} label="Llamar" />
        <span className="hidden items-center gap-2 rounded-full bg-[var(--color-graphite)] px-3.5 py-2 text-xs font-medium text-white xl:inline-flex">
          <Calendar size={14} className="text-[var(--color-silver)]" />
          {TODAY}
        </span>
      </nav>

      {/* Buscador móvil: cubre el header al abrir la lupa */}
      {searchOpen && (
        <div className="absolute inset-0 z-20 flex items-center gap-2 bg-header-bg px-4 lg:hidden">
          <div className="flex-1">
            <SearchBox autoFocus onNavigate={() => setSearchOpen(false)} />
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            aria-label="Cerrar búsqueda"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-hover-bg hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </header>
  );
}

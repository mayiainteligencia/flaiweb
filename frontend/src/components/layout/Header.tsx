import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import logoFlai from '@/assets/images/logos/logo-FLAI.png';
import SearchBox from './SearchBox';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function Header({ collapsed }: { collapsed: boolean }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="relative flex h-16 shrink-0 items-center gap-3 border-b border-border-subtle bg-header-bg px-4">
      {/* Logo: siempre en móvil; en desktop solo cuando el sidebar está colapsado */}
      <NavLink
        to={ROUTES.HOME}
        title="Ir a la nube FLAI"
        className={['shrink-0 transition-opacity hover:opacity-80', collapsed ? 'block' : 'block lg:hidden'].join(' ')}
      >
        <img src={logoFlai} alt="FLAI" className="h-7 w-auto" />
      </NavLink>

      {/* Buscador en desktop (centrado) */}
      <div className="mx-auto hidden w-full max-w-md lg:block">
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
        <SearchIcon />
      </button>

      <button className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        Cotiza ahora
      </button>

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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
}

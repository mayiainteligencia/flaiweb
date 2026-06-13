export default function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border-subtle bg-header-bg px-4">
      {/* Hamburguesa: solo móvil/tablet */}
      <button
        onClick={onMenu}
        aria-label="Abrir menú"
        className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-hover-bg hover:text-text-primary lg:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="relative mx-auto hidden w-full max-w-md sm:block">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
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
        <input
          type="search"
          placeholder="Buscar servicios, industrias, docs…"
          className="h-9 w-full rounded-md border border-border-subtle bg-[var(--surface-input)] pl-9 pr-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none"
        />
      </div>

      {/* Empuja el CTA a la derecha cuando el buscador está oculto */}
      <div className="flex-1 sm:hidden" />

      <button className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        Cotiza ahora
      </button>
    </header>
  );
}

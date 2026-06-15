import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft } from 'lucide-react';
import { searchSite } from '@/data/searchIndex';

const inputClass =
  'h-9 w-full rounded-md border border-border-subtle bg-[var(--surface-input)] pl-9 pr-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none';

export default function SearchBox({
  autoFocus = false,
  onNavigate,
}: {
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchSite(query), [query]);

  useEffect(() => setActive(0), [query]);

  // Cierra al hacer clic fuera.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (to: string) => {
    navigate(to);
    setQuery('');
    setOpen(false);
    onNavigate?.();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active].to);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const showPanel = open && query.trim().length > 0;

  return (
    <div ref={rootRef} className="relative w-full">
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
      <input
        type="search"
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Buscar servicios, industrias, docs…"
        className={inputClass}
      />

      {showPanel && (
        <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-lg border border-border-subtle bg-white shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-text-secondary">Sin resultados para “{query}”.</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((r, i) => (
                <li key={`${r.group}-${r.to}-${r.title}`}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.to)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left transition-colors ${
                      i === active ? 'bg-accent/10' : 'hover:bg-hover-bg'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-text-primary">{r.title}</span>
                      <span className="block truncate text-xs text-text-secondary">{r.group}</span>
                    </span>
                    {i === active && <CornerDownLeft size={14} className="shrink-0 text-accent" />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

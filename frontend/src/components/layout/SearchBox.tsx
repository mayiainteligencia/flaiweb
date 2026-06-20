import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Bot, CornerDownLeft, ArrowRight } from 'lucide-react';
import { searchSite } from '@/data/searchIndex';
import { ROUTES } from '@/constants/routes';

type Mode = 'search' | 'ia';

// Prompts de arranque del asistente (todos abren el Asesor Cloud, el recomendador IA real).
const IA_PROMPTS = [
  '¿Qué servicio de nube necesito?',
  'Comparar nube privada vs on-prem',
  'Quiero cotizar para mi empresa',
];

const baseInput =
  'h-11 w-full rounded-full bg-[var(--color-graphite)] pl-11 pr-[5.5rem] text-sm text-white placeholder:text-white/45 transition-colors focus:outline-none border';

export default function SearchBox({
  autoFocus = false,
  onNavigate,
}: {
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const [mode, setMode] = useState<Mode>('search');
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

  const close = () => {
    setQuery('');
    setOpen(false);
    onNavigate?.();
  };

  const go = (to: string) => {
    navigate(to);
    close();
  };

  // Modo IA: cualquier consulta/sugerencia abre el Asesor Cloud.
  const askIa = () => go(ROUTES.ADVISOR);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return setOpen(false);
    if (mode === 'ia') {
      if (e.key === 'Enter') {
        e.preventDefault();
        askIa();
      }
      return;
    }
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
    }
  };

  const isIa = mode === 'ia';
  const showSearchPanel = !isIa && open && query.trim().length > 0;
  const showIaPanel = isIa && open;

  return (
    <div ref={rootRef} className="relative w-full">
      {isIa ? (
        <Sparkles size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-accent" />
      ) : (
        <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-silver)]" />
      )}

      <input
        type="search"
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={isIa ? 'Pregúntale algo al asistente de FLAi…' : 'Buscar servicios, industrias, docs…'}
        className={`${baseInput} ${isIa ? 'border-accent' : 'border-transparent focus:border-accent'}`}
      />

      {/* Botón IA: alterna entre buscador normal y asistente */}
      <button
        type="button"
        onClick={() => {
          setMode((m) => (m === 'ia' ? 'search' : 'ia'));
          setOpen(true);
        }}
        aria-pressed={isIa}
        title={isIa ? 'Volver al buscador' : 'Preguntar al asistente IA'}
        className={`absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors ${
          isIa ? 'bg-accent text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
        }`}
      >
        <Bot size={14} />
        IA
      </button>

      {/* Panel buscador normal */}
      {showSearchPanel && (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-lg border border-border-subtle bg-white shadow-xl">
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

      {/* Panel asistente IA: distinto al buscador */}
      {showIaPanel && (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-lg border border-accent/30 bg-white shadow-xl">
          <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
            <Sparkles size={16} className="text-accent" />
            <span className="text-sm font-semibold text-text-primary">Asistente FLAi</span>
          </div>
          <p className="px-4 pt-3 text-xs text-text-secondary">
            Cuéntame qué necesitas y te recomiendo la nube ideal.
          </p>
          <ul className="p-2">
            {IA_PROMPTS.map((p) => (
              <li key={p}>
                <button
                  onClick={askIa}
                  className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm text-text-primary transition-colors hover:bg-accent/10"
                >
                  {p}
                  <ArrowRight size={14} className="shrink-0 text-accent" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

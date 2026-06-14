import { NavLink } from 'react-router-dom';
import { ArrowLeft, Hammer } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export default function SectionPlaceholder() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Hammer size={24} />
      </span>
      <h1 className="mt-5 text-2xl font-semibold text-text-primary">Sección en construcción</h1>
      <p className="mt-2 text-text-secondary">
        Estamos preparando este contenido. Mientras tanto, explora los servicios cloud de FLAI.
      </p>
      <NavLink
        to={ROUTES.HOME}
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover-bg"
      >
        <ArrowLeft size={16} /> Volver al inicio
      </NavLink>
    </div>
  );
}

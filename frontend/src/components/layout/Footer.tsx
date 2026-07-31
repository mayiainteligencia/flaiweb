import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

// Footer site-wide. Conecta las marcas hermanas FLAI ↔ MAYIA.
export default function Footer() {
  return (
    <footer className="mt-12 space-y-2 border-t border-border-subtle px-4 py-6 text-center text-sm text-text-secondary">
      <p>
        FLAI, la nube soberana mexicana.{' '}
        <a
          href="https://mayia.mx"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          MAYIA
        </a>
        , la fábrica de inteligencia artificial de México.
      </p>
      <p className="text-xs">
        <Link to={ROUTES.PRIVACY} className="hover:text-accent hover:underline">
          Aviso de privacidad
        </Link>
      </p>
    </footer>
  );
}

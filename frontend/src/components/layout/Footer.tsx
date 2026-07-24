// Footer site-wide. Conecta las marcas hermanas FLAI ↔ MAYIA.
export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border-subtle px-4 py-6 text-center text-sm text-text-secondary">
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
    </footer>
  );
}

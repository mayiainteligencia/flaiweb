import { motion } from 'framer-motion';

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

// Encabezado común de las páginas del dashboard (eyebrow + título + bajada).
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.header {...reveal} className="max-w-3xl">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent">{eyebrow}</span>
      <h1 className="mt-2 text-2xl font-semibold text-text-primary sm:text-3xl">{title}</h1>
      <p className="mt-3 text-text-secondary">{subtitle}</p>
    </motion.header>
  );
}

export { reveal };

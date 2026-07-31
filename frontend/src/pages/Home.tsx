import Hero from '@/components/sections/Hero';
import Dashboard from '@/components/sections/Dashboard';

// El banner de migración se monta una sola vez, en DashboardLayout (site-wide).
// Aquí NO se incluye para evitar duplicarlo en "/".
export default function Home() {
  return (
    <main>
      <Hero />
      <Dashboard />
    </main>
  );
}

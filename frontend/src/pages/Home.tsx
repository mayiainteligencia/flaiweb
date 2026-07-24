import Hero from '@/components/sections/Hero';
import Dashboard from '@/components/sections/Dashboard';
import MigrationBanner from '@/components/layout/MigrationBanner';

export default function Home() {
  return (
    <main>
      <MigrationBanner />
      <Hero />
      <Dashboard />
    </main>
  );
}

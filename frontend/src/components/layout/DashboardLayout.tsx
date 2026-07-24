import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileTabBar from './MobileTabBar';
import MigrationBanner from './MigrationBanner';
import Footer from './Footer';

export default function DashboardLayout({ children }: { children?: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  // La barra inferior solo aparece cuando el dashboard entra en vista (tras pasar la nube).
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex h-screen flex-col overflow-hidden bg-content-bg font-display text-text-primary"
    >
      {/* Banner de migración: mobile → slim bar arriba · desktop → floating card */}
      <MigrationBanner />

      {/* Header full-width: abarca todo el ancho, incluido el logo de FLAI */}
      <Header collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: solo desktop. En móvil la navegación vive en la barra inferior. */}
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        {/* pb extra en móvil para no quedar tapado por la barra inferior */}
        <main className="no-scrollbar flex-1 overflow-y-auto p-4 pb-28 sm:p-6 lg:p-8 lg:pb-8">
          {children}
          <Footer />
        </main>
      </div>

      <MobileTabBar visible={inView} />
    </div>
  );
}

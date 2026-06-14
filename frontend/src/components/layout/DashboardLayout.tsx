import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileTabBar from './MobileTabBar';

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
      className="flex h-screen overflow-hidden bg-content-bg font-display text-text-primary"
    >
      {/* Sidebar: solo desktop. En móvil la navegación vive en la barra inferior. */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header collapsed={collapsed} />
        {/* pb extra en móvil para no quedar tapado por la barra inferior */}
        <main className="flex-1 overflow-y-auto p-4 pb-28 sm:p-6 lg:p-8 lg:pb-8">{children}</main>
      </div>

      <MobileTabBar visible={inView} />
    </div>
  );
}

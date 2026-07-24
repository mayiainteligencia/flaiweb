import { Outlet } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import { JarvisProvider } from '@/components/ai/Jarvis';
import RouteSeo from '@/seo/RouteSeo';
import Home from '@/pages/Home';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SectionPlaceholder from '@/pages/SectionPlaceholder';
import Compute from '@/pages/services/Compute';
import PrivateCloud from '@/pages/services/PrivateCloud';
import OnPremCloud from '@/pages/services/OnPremCloud';
import Kubernetes from '@/pages/services/Kubernetes';
import Storage from '@/pages/services/Storage';
import Databases from '@/pages/services/Databases';
import Networking from '@/pages/services/Networking';
import Security from '@/pages/services/Security';
import BackupDRP from '@/pages/services/BackupDRP';
import AICloud from '@/pages/services/AICloud';
import Videovigilancia from '@/pages/services/Videovigilancia';
import Industries from '@/pages/Industries';
import Marketplace from '@/pages/Marketplace';
import TrustCenter from '@/pages/TrustCenter';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Recursos from '@/pages/Recursos';
import Overview from '@/components/dashboard/Overview';
import Advisor from '@/pages/Advisor';

// Provider de MAYIA + SEO por ruta. Envuelve toda la app (dentro del router).
function RootLayout() {
  return (
    <JarvisProvider>
      <RouteSeo />
      <Outlet />
    </JarvisProvider>
  );
}

// Shell del dashboard (sidebar/header) para todo menos el Home.
function DashboardShell() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

// Rutas como data (vite-react-ssg las enumera para prerenderizar).
// Los splats (*, industries/*) se excluyen del prerender automáticamente.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <DashboardShell />,
        children: [
          { path: 'inicio', element: <Overview /> },
          { path: 'asesor-cloud', element: <Advisor /> },

          { path: 'services/compute', element: <Compute /> },
          { path: 'services/private-cloud', element: <PrivateCloud /> },
          { path: 'services/on-prem-cloud', element: <OnPremCloud /> },
          { path: 'services/kubernetes', element: <Kubernetes /> },
          { path: 'services/storage', element: <Storage /> },
          { path: 'services/databases', element: <Databases /> },
          { path: 'services/networking', element: <Networking /> },
          { path: 'services/security', element: <Security /> },
          { path: 'services/backup-drp', element: <BackupDRP /> },
          { path: 'services/ai-cloud', element: <AICloud /> },
          { path: 'services/videovigilancia', element: <Videovigilancia /> },

          // Industrias: catálogo único. Los 6 sectores se prerenderizan (canónico
          // a /industries en el SEO) para que resuelvan en carga directa. El splat
          // queda para cualquier otra ruta cliente.
          { path: 'industries', element: <Industries /> },
          { path: 'industries/gobierno', element: <Industries /> },
          { path: 'industries/banca-finanzas', element: <Industries /> },
          { path: 'industries/salud', element: <Industries /> },
          { path: 'industries/manufactura', element: <Industries /> },
          { path: 'industries/retail', element: <Industries /> },
          { path: 'industries/educacion', element: <Industries /> },
          { path: 'industries/*', element: <Industries /> },

          // Partners: placeholder (sección aún no construida) — se prerenderiza para evitar 404.
          { path: 'partners', element: <SectionPlaceholder /> },

          { path: 'marketplace', element: <Marketplace /> },
          { path: 'trust-center', element: <TrustCenter /> },
          { path: 'precios', element: <Pricing /> },
          { path: 'contacto', element: <Contact /> },

          // Recursos: 3 rutas, mismo componente (canónico a documentación en el SEO).
          { path: 'recursos/documentacion', element: <Recursos /> },
          { path: 'recursos/white-papers', element: <Recursos /> },
          { path: 'recursos/blog', element: <Recursos /> },

          // 404 real (se prerenderiza; el hosting debe servirlo con status 404).
          { path: '404', element: <SectionPlaceholder /> },
          { path: '*', element: <SectionPlaceholder /> },
        ],
      },
    ],
  },
];

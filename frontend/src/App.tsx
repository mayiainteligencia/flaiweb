import { Routes, Route, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
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

export default function App() {
  return (
    <Routes>
      {/* Inicio: Hero (nube) + dashboard con overview */}
      <Route path={ROUTES.HOME} element={<Home />} />

      {/* Resto de páginas dentro del shell del dashboard (sin Hero) */}
      <Route
        element={
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        }
      >
        <Route path={ROUTES.COMPUTE} element={<Compute />} />
        <Route path={ROUTES.PRIVATE_CLOUD} element={<PrivateCloud />} />
        <Route path={ROUTES.ON_PREM} element={<OnPremCloud />} />
        <Route path={ROUTES.KUBERNETES} element={<Kubernetes />} />
        <Route path={ROUTES.STORAGE} element={<Storage />} />
        <Route path={ROUTES.DATABASES} element={<Databases />} />
        <Route path={ROUTES.NETWORKING} element={<Networking />} />
        <Route path={ROUTES.SECURITY} element={<Security />} />
        <Route path={ROUTES.BACKUP_DRP} element={<BackupDRP />} />
        <Route path={ROUTES.AI_CLOUD} element={<AICloud />} />

        {/* Secciones aún no construidas */}
        <Route path="*" element={<SectionPlaceholder />} />
      </Route>
    </Routes>
  );
}

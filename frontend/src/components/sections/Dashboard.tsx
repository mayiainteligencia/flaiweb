import DashboardLayout from '@/components/layout/DashboardLayout';
import Overview from '@/components/dashboard/Overview';

/**
 * Aparece tras "entrar" a la nube en el Hero. Monta el shell del dashboard
 * con el contenido de Inicio (overview de la plataforma).
 */
export default function Dashboard() {
  return (
    <section className="dashboard">
      <DashboardLayout>
        <Overview />
      </DashboardLayout>
    </section>
  );
}

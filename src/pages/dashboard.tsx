import PrivateRoute from '@/components/PrivateRoute';
import DashboardPage from '@/templates/dashboard';

export default function DashBoard() {
  return (
    <PrivateRoute>
      <DashboardPage />
    </PrivateRoute>
  );
}

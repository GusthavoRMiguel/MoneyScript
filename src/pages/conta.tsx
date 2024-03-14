import PrivateRoute from '@/components/PrivateRoute';
import AccountPage from '@/templates/account';

export default function Conta() {
  return (
    <PrivateRoute>
      <AccountPage />
    </PrivateRoute>
  );
}

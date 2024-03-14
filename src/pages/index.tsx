import PublicRoute from '@/components/PublicRoute';
import LoginPage from '@/templates/(auth)/login';

export default function Login() {
  return (
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  );
}

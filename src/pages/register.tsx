import PublicRoute from '@/components/PublicRoute';
import RegisterPage from '@/templates/(auth)/register';

export default function Register() {
  return (
    <PublicRoute>
      <RegisterPage />
    </PublicRoute>
  );
}

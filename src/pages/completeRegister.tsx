import PublicRoute from '@/components/PublicRoute';
import CompleteRegisterPage from '@/templates/(auth)/completeRegister';

export default function CompleteRegister() {
  return (
    <PublicRoute>
      <CompleteRegisterPage />
    </PublicRoute>
  );
}

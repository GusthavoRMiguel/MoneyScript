// components/PrivateRoute.tsx
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/Auth';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/'); // Redireciona para a página de login se não estiver autenticado
    }
  }, [user, loading, router]);

  return <>{user && !loading ? children : null}</>; // Renderiza os filhos se estiver autenticado e não estiver carregando
};

export default PrivateRoute;

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/Auth';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard'); // Redireciona para a página de dashboard se estiver autenticado
    }
  }, [user, loading, router]);

  return <>{!user && !loading ? children : null}</>; // Renderiza os filhos se não estiver autenticado e não estiver carregando
};

export default PublicRoute;

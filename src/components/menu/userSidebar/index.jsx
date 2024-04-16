import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/Auth'; // Importe seu hook useAuth ou contexto de autenticação

import { Overlay, SidebarContainer, CloseButton, Links } from './styles';
import { AiOutlineClose } from 'react-icons/ai';

const UserSidebar = ({ open, onClose }) => {
  const { user, signout } = useAuth(); // Utilize o contexto de autenticação

  const handleLogout = async () => {
    try {
      await signout(); // Chame a função de logout do seu contexto de autenticação
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <>
      {open && <Overlay onClick={onClose} />}
      <SidebarContainer open={open}>
        <CloseButton onClick={onClose}>
          <AiOutlineClose />
        </CloseButton>
        <Links>
          {user ? (
            <>
              <Link href="/conta">Conta</Link>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <>
              <Link href="/">Entrar</Link>
              <Link href="/register">Cadastrar-se</Link>
            </>
          )}
        </Links>
      </SidebarContainer>
    </>
  );
};

export default UserSidebar;

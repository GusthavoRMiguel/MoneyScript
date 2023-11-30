'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import * as S from './styles';

import UserSidebar from './userSidebar';
import Sidebar from './sidebar';

import { BiMenu, BiUser } from 'react-icons/bi';

const Menu: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userSidebarOpen, setUserSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const toggleUserSidebar = () => {
    setUserSidebarOpen(!userSidebarOpen);
  };

  return (
    <S.Container>
      <S.Content>
        <S.BoxLogo>
          <Link href="/">
            <img src="/assets/logo.png" alt="logo" />
          </Link>
        </S.BoxLogo>

        <S.BoxIcon>
          <button onClick={toggleUserSidebar}>
            <BiUser size={20} />
          </button>
        </S.BoxIcon>

        <S.BoxIcon>
          <button onClick={toggleSidebar}>
            <BiMenu size={20} />
          </button>
        </S.BoxIcon>
      </S.Content>

      {userSidebarOpen ? (
        <UserSidebar open={userSidebarOpen} onClose={toggleUserSidebar} />
      ) : (
        ''
      )}
      {sidebarOpen ? (
        <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      ) : (
        ''
      )}
    </S.Container>
  );
};

export default Menu;

'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import * as S from './styles';

import Sidebar from './sidebar';

import { BiMenu } from 'react-icons/bi';

const Menu: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          <button onClick={toggleSidebar}>
            <BiMenu size={20} />
          </button>
        </S.BoxIcon>
      </S.Content>

      {sidebarOpen ? (
        <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      ) : (
        ''
      )}
    </S.Container>
  );
};

export default Menu;

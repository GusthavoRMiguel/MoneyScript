'use client';
import React from 'react';
import Link from 'next/link';

import { Overlay, SidebarContainer, CloseButton, Links } from './styles';
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineComment,
  AiOutlineClose
} from 'react-icons/ai';

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {open && <Overlay onClick={onClose} />}
      <SidebarContainer open={open}>
        <CloseButton onClick={onClose}>
          <AiOutlineClose />
        </CloseButton>
        <Links>
          <Link href={'/'}>
            <AiOutlineHome />
            Home
          </Link>
          <Link href={'/about'}>
            <AiOutlineInfoCircle />
            Sobre nós
          </Link>
          <Link href={'contact'}>
            <AiOutlineComment /> Contato
          </Link>
        </Links>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;

import React from 'react';
import * as S from './style';

import Menu from '@/components/menu';

const ContactPage: React.FC = () => {
  return (
    <S.Container>
      <Menu />

      <S.Content>
        <h1>Contatos</h1>
      </S.Content>
    </S.Container>
  );
};

export default ContactPage;

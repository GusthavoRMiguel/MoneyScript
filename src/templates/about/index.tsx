import React from 'react';
import * as S from './style';

import Menu from '@/components/menu';

const AboutPage: React.FC = () => {
  return (
    <S.Container>
      <Menu />

      <S.Content>
        <h1>sobre nós</h1>
      </S.Content>
    </S.Container>
  );
};

export default AboutPage;

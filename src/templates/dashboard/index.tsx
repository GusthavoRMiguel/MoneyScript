import React, { useState } from 'react';
import { Menu as SemanticMenu, Icon } from 'semantic-ui-react';
import Menu from '@/components/menu';

import {
  Container,
  Content,
  ContentContainer,
  SidebarContainer
} from './styles';
import DashAnual from './components/dashAnual';
import DashMensal from './components/dashMensal';

const Dashboard: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState<
    'DashAnual' | 'DashMensal'
  >('DashAnual');

  const handleSidebarHide = () => setVisible(false);
  const handleSidebarShow = () => setVisible(true);

  const handleMenuItemClick = (option: 'DashAnual' | 'DashMensal') => {
    setSelectedOption(option);
    handleSidebarHide();
  };

  return (
    <Container>
      <Menu />
      <Content>
        <SidebarContainer
          as={SemanticMenu}
          animation="overlay"
          icon="labeled"
          onHide={handleSidebarHide}
          onShow={handleSidebarShow}
          vertical
          visible={visible}
          width="thin"
        >
          <SemanticMenu.Item
            as="a"
            onClick={() => handleMenuItemClick('DashAnual')}
          >
            <Icon name="calendar alternate outline" />
            DashAnual
          </SemanticMenu.Item>
          <SemanticMenu.Item
            as="a"
            onClick={() => handleMenuItemClick('DashMensal')}
          >
            <Icon name="calendar outline" />
            DashMensal
          </SemanticMenu.Item>
        </SidebarContainer>
        <ContentContainer>
          {selectedOption === 'DashAnual' && <DashAnual />}
          {selectedOption === 'DashMensal' && <DashMensal />}
        </ContentContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;

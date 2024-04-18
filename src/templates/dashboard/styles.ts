import styled from 'styled-components';
import { Sidebar } from 'semantic-ui-react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarContainer = styled(Sidebar)`
  &&& {
    background-color: #f3f4f6;
    width: 250px;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

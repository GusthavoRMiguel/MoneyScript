import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
  height: auto;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  gap: 10px;
`;
export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
  align-items: center;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

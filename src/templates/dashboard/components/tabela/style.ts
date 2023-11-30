import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
  width: 50%;
  height: 50vh;
  border: solid 1px ${theme.colors.blackQuantum};
  @media (max-width: 640px) {
    width: 100%;
    height: auto;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Filter = styled.div`
  width: 100%;
`;

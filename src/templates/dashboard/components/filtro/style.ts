import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
  width: 100%;

  background-color: white;
  border: solid 1px ${theme.colors.blackQuantum};
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: solid 1px ${theme.colors.blackQuantum};
  gap: 10px;

  form {
    width: 100%;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;

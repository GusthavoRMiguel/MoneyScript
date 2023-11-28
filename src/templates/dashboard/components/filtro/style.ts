import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
  width: 50%;
  height: 10vh;
  background-color: white;
  border: solid 1px ${theme.colors.blackQuantum};
`;

export const Icone = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
  justify-content: center;

  button {
    font-size: 2rem;
    background-color: transparent;
    border: none;
    gap: 10px;
    display: flex;
    align-items: center;
  }
`;

export const Content = styled.div`
  display: flex;
  position: absolute;
  z-index: ${theme.layers.base};
  width: 50%;
  left: 0.1px;
  background-color: white;
  border: solid 1px ${theme.colors.blackQuantum};
  padding: 1rem;

  form {
    width: 100%;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;

import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
  width: 50%;
  height: 10vh;
  background-color: white;
  border: solid 1px ${theme.colors.blackQuantum};
  @media (max-width: 640px) {
    width: 100%;
    height: auto;
  }
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

  @media (max-width: 640px) {
    button {
      font-size: 1.5rem;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  position: absolute;
  z-index: ${theme.layers.base};
  width: 50%;
  right: 0.1px;
  background-color: white;
  border: solid 1px ${theme.colors.blackQuantum};
  padding: 1rem;

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

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8em;
  margin-top: 0.2em;
`;

export const InputBox = styled.div`
  width: 100%;
`;

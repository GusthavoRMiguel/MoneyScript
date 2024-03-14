import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
  width: 100%;
  background-color: white;
  border: solid 1px ${theme.colors.blackQuantum};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 1rem;
  justify-content: center;
  align-items: center;
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

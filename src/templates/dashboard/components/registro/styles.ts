import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
  padding: 1rem;
  background-color: white;
  border: solid 1px ${theme.colors.blackQuantum};
  width: fit-content;
  border-radius: 10px;
`;

export const OpenButton = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  font-size: 30px;
  gap: 10px;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
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

import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import theme from '@/styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: 50vw;
  height: 50vh;
  border: solid 1px ${theme.colors.blackQuantum};

  @media (max-width: 640px) {
    width: 100%;
    height: auto;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TooltipContainer = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 1rem;
  }

  h1 span {
    font-weight: 100;
    margin-left: 4px;
  }
  h2 {
    font-size: 0.9rem;
  }

  div {
    margin-bottom: 2px;
    margin-top: 2px;
  }
  div.entrada {
    background-color: #2eed2eb3;
    color: white;
    padding: 0.5rem;
  }
  div.saida {
    background-color: #db2828cc;
    color: white;
    padding: 0.5rem;
  }
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  font-size: 1rem;
`;

export const LoadingIcon = styled(FaSpinner)`
  font-size: 32px;
  color: #333;
  animation: ${spin} 1s linear infinite;
`;

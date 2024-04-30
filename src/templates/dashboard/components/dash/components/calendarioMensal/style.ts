import styled, { keyframes } from 'styled-components';

import { FaSpinner } from 'react-icons/fa';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const CalendaryContainer = styled.div`
  width: 50%;
  height: 55vh;
  padding: 1rem;
  border: solid 1px;
  display: flex;
  flex-direction: column;
  &.loading {
    display: flex;
    place-content: center;
  }
  @media (max-width: 640px) {
    width: 100%;
    height: auto;
  }
`;

export const CalendaryHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: auto;
  div {
    text-align: center;
  }

  @media (max-width: 640px) {
    margin-bottom: 10px;

    div {
      font-size: 7px;
    }
  }
`;

export const CalendaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: auto;
`;

export const CalendaryDay = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;

  span {
    font-size: 16px;
  }

  &.grey-balance {
    background-color: #cccccc; /* Cinza para saldo neutro */
  }

  &.positive-balance {
    background-color: #a6f3a6; /* verde */
  }

  &.negative-balance {
    background-color: #ff9999; /* vermelho */
  }

  &.selected {
    border: 2px solid #333;
  }

  &.current-day {
    border-bottom: solid 2px;
    filter: brightness(115%);
  }
`;

export const DetailCard = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  text-transform: capitalize;

  &.entrada {
    background-color: #a6f3a6;
  }

  &.saida {
    background-color: #ff9999;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  gap: 10px;
  padding: 1rem;
  border: solid 1px;

  h1 {
    font-size: 1.5rem;
  }

  span {
    font-size: 1.5rem;
  }
`;
export const LoadingIcon = styled(FaSpinner)`
  font-size: 32px;
  color: #333;
  animation: ${spin} 1s linear infinite;
  align-self: center;
`;
export const ErrorMessage = styled.div`
  padding: 1rem;
  font-size: 1rem;
  width: 100%;
  text-align: center;
  height: 100%;
  align-content: center;
`;

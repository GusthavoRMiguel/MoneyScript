import styled from 'styled-components';
import theme from '@/styles/theme';

export const CalendarContainer = styled.div`
  width: 50vw;
  height: 50vh;
  padding: 1rem;
  border: solid 1px;

  @media (max-width: 640px) {
    width: 100%;
    height: auto;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const CalendarDay = styled.div`
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

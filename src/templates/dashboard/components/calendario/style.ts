import styled from 'styled-components';
import theme from '@/styles/theme';

export const CalendarContainer = styled.div`
  width: 50vw;
  padding: 1rem;
  border: solid 1px;
  margin-right: 1rem;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CalendarButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
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

  &.entrada {
    background-color: #a6f3a6;
  }

  &.saida {
    background-color: #ff9999;
  }
`;

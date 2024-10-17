import styled, { keyframes } from 'styled-components';
import theme from '@/styles/theme';
import { Confirm } from 'semantic-ui-react';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  border: solid 1px ${theme.colors.blackQuantum};

  &.loading {
    overflow-y: hidden;
    text-align: center;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: ${theme.colors.gray_100};
    border: solid 1px ${theme.colors.blackQuantum};
  }
  tbody {
    max-height: 350px;
    overflow-y: auto;
    border: solid 1px ${theme.colors.gray_300};
  }

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;

    tbody {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      gap: 5px;
    }
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &.entrada {
    font-weight: 700;
    box-shadow: inset 0 0 8px 0 ${theme.colors.green_50};
  }

  &.saida {
    font-weight: 700;
    box-shadow: inset 0 0 8px 0 ${theme.colors.red_50};
  }

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Define 2 colunas de largura igual */
    grid-template-rows: repeat(3, auto); /* Define 3 linhas automáticas */

    /* Primeira coluna (itens 1, 2 e 3) */
    & > :nth-child(1) {
      grid-column: 1; /* Coloca na primeira coluna */
      grid-row: 1; /* Primeira linha */
    }

    & > :nth-child(2) {
      grid-column: 1; /* Coloca na primeira coluna */
      grid-row: 2; /* Segunda linha */
    }

    & > :nth-child(5) {
      grid-column: 1; /* Coloca na primeira coluna */
      grid-row: 3; /* Terceira linha */
    }

    /* Segunda coluna (itens 4, 5 e 6) */
    & > :nth-child(4) {
      grid-column: 2; /* Coloca na segunda coluna */
      grid-row: 1; /* Primeira linha */
    }

    & > :nth-child(3) {
      grid-column: 2; /* Coloca na segunda coluna */
      grid-row: 2; /* Segunda linha */
    }

    & > :nth-child(6) {
      grid-column: 2; /* Coloca na segunda coluna */
      grid-row: 3; /* Terceira linha */
    }
  }
`;

export const TableHeader = styled.th`
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid ${theme.colors.blackQuantum};
  border-right: 1px solid ${theme.colors.blackQuantum};
  white-space: nowrap;

  > button {
    background-color: transparent;
    border: none;
    display: flex;
    gap: 10px;
    margin: auto;
  }
  @media (max-width: 640px) {
    &.hiddenMobile {
      display: none;
    }
    font-size: 7px;
    padding: 6px 2px;
    button {
      font-size: 7px;
      gap: 5px;
    }
  }
`;

export const TableData = styled.td`
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid ${theme.colors.gray_100};
  white-space: nowrap;

  > button {
    margin-inline: auto;
    background-color: transparent;
    border: none;
  }

  &.noData {
    text-align: center;
    font-size: 1.5rem;
    padding: 5rem;
  }

  @media (max-width: 640px) {
    font-size: 6px;
    padding: 6px 2px;

    &.noData {
      padding: 2rem;
    }
  }
`;

export const CustomConfirm = styled(Confirm)`
  background-color: ${theme.colors.overlay} !important;

  button.custom-confirm-button {
    background-color: ${theme.colors.red_300} !important;
  }
  button.custom-confirm-button:hover {
    background-color: ${theme.colors.red_400} !important;
  }
`;

export const LoadingIcon = styled(FaSpinner)`
  font-size: 32px;
  color: #333;
  animation: ${spin} 1s linear infinite;
`;

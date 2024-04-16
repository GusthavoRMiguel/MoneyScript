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

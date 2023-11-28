import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 30vh;
  border: solid;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &.entrada {
    background-color: #2eed2eb3;
    color: white;
  }

  &.saida {
    background-color: #db2828cc;
    color: white;
  }
`;

export const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const TableData = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

import React from 'react';
import {
  CalendarContainer,
  CalendarMonth,
  CalendarGrid,
  DetailCard
} from './styles';
import { Modal, Button, Dimmer, Loader } from 'semantic-ui-react';
import ITransaction from '@/interfaces/ITransaction';
import { formatDate } from '@/utils/dateFormatter';

interface Props {
  movimentacoes: ITransaction[];
  loading: boolean;
  currentYear: number;
}

const CalendarioAnual: React.FC<Props> = ({
  movimentacoes,
  loading,
  currentYear
}) => {
  const [selectedMonth, setSelectedMonth] = React.useState<number | null>(null);
  const currentMonthIndex = new Date().getMonth();

  const calculateBalanceForMonth = (monthIndex: number): number => {
    const firstDayOfMonth = new Date(currentYear, monthIndex, 1)
      .toISOString()
      .slice(0, 10);
    const lastDayOfMonth = new Date(currentYear, monthIndex + 1, 0)
      .toISOString()
      .slice(0, 10);

    const transactionsForMonth = movimentacoes.filter((movimentacao) => {
      const transactionDate = new Date(movimentacao.data)
        .toISOString()
        .slice(0, 10);
      return (
        transactionDate >= firstDayOfMonth && transactionDate <= lastDayOfMonth
      );
    });

    let balance = 0;
    transactionsForMonth.forEach((transaction) => {
      balance += transaction.valor || 0;
    });

    return balance;
  };

  const getTransactionsForMonth = (
    transactions: ITransaction[],
    monthIndex: number,
    year: number
  ): ITransaction[] => {
    const firstDayOfMonth = new Date(year, monthIndex, 1)
      .toISOString()
      .slice(0, 10);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0)
      .toISOString()
      .slice(0, 10);

    return transactions.filter((movimentacao) => {
      const transactionDate = new Date(movimentacao.data)
        .toISOString()
        .slice(0, 10);
      return (
        transactionDate >= firstDayOfMonth && transactionDate <= lastDayOfMonth
      );
    });
  };

  const renderMonth = (monthIndex: number) => {
    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];

    const balanceForMonth = calculateBalanceForMonth(monthIndex);
    let monthClassName = '';

    if (balanceForMonth > 0) {
      monthClassName = 'positive-balance';
    } else if (balanceForMonth < 0) {
      monthClassName = 'negative-balance';
    } else {
      monthClassName = 'grey-balance';
    }

    if (monthIndex === currentMonthIndex) {
      monthClassName += 'current-month';
    }

    return (
      <CalendarMonth
        key={monthIndex}
        className={`${monthClassName} ${
          monthIndex === selectedMonth ? 'selected' : ''
        }`}
        onClick={() => setSelectedMonth(monthIndex)}
      >
        <span>{monthNames[monthIndex]}</span>
      </CalendarMonth>
    );
  };

  return (
    <CalendarContainer>
      {loading ? (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : (
        <CalendarGrid>
          {Array.from({ length: 12 }, (_, i) => i).map((monthIndex) =>
            renderMonth(monthIndex)
          )}
        </CalendarGrid>
      )}

      {selectedMonth !== null && (
        <Modal
          open={selectedMonth !== null}
          onClose={() => setSelectedMonth(null)}
        >
          <Modal.Header>Detalhes do Mês</Modal.Header>
          <Modal.Content>
            <p>Detalhamento das movimentações:</p>
            <ul>
              {getTransactionsForMonth(
                movimentacoes,
                selectedMonth,
                currentYear
              ).map((transaction, index) => (
                <DetailCard
                  key={index}
                  className={
                    transaction.tipo === 'entrada' ? 'entrada' : 'saida'
                  }
                >
                  <p>Titulo: {transaction.titulo}</p>
                  <p>Descrição: {transaction.descricao}</p>
                  <p>Tipo: {transaction.tipo}</p>
                  <p>Data: {formatDate(transaction.data)}</p>
                  <p>Valor: R$ {transaction.valor?.toLocaleString('pt-br')}</p>
                </DetailCard>
              ))}
            </ul>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setSelectedMonth(null)}>Fechar</Button>
          </Modal.Actions>
        </Modal>
      )}
    </CalendarContainer>
  );
};

export default CalendarioAnual;

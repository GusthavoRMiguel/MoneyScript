import React, { useEffect, useState } from 'react';
import {
  CalendaryContainer,
  CalendaryMonth,
  CalendaryGrid,
  DetailCard,
  Total,
  LoadingIcon,
  ErrorMessage
} from './styles';
import { Modal, Button } from 'semantic-ui-react';
import ITransaction from '@/interfaces/ITransaction';
import { formatDate } from '@/utils/dateFormatter';

interface Props {
  transactions: ITransaction[];
  loading: boolean;
  currentYear: number;
}

const CalendarioAnual: React.FC<Props> = ({
  transactions,
  loading,
  currentYear
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const currentMonthIndex = new Date().getMonth();
  const currentYearNow = new Date().getFullYear();
  const [totalForSelectedMonth, setTotalForSelectedMonth] = useState<number>(0);

  const calculateBalanceForMonth = (monthIndex: number): number => {
    const firstDayOfMonth = new Date(currentYear, monthIndex, 1)
      .toISOString()
      .slice(0, 10);
    const lastDayOfMonth = new Date(currentYear, monthIndex + 1, 0)
      .toISOString()
      .slice(0, 10);

    const transactionsForMonth = transactions.filter((movimentacao) => {
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

    if (monthIndex === currentMonthIndex && currentYear === currentYearNow) {
      monthClassName += ' current-month';
    }

    return (
      <CalendaryMonth
        key={monthIndex}
        className={`${monthClassName} ${
          monthIndex === selectedMonth ? 'selected' : ''
        }`}
        onClick={() => setSelectedMonth(monthIndex)}
      >
        <span>{monthNames[monthIndex]}</span>
      </CalendaryMonth>
    );
  };

  useEffect(() => {
    if (selectedMonth !== null) {
      const total = calculateBalanceForMonth(selectedMonth);
      setTotalForSelectedMonth(total);
    }
  }, [selectedMonth, currentYear, transactions]);

  return (
    <CalendaryContainer className={loading ? 'loading' : ''}>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          {transactions.length === 0 ? (
            <ErrorMessage>Sem dados disponíveis</ErrorMessage>
          ) : (
            <CalendaryGrid>
              {Array.from({ length: 12 }, (_, i) => i).map((monthIndex) =>
                renderMonth(monthIndex)
              )}
            </CalendaryGrid>
          )}
        </>
      )}

      {selectedMonth !== null && (
        <Modal
          open={selectedMonth !== null}
          onClose={() => setSelectedMonth(null)}
        >
          <Modal.Header>Detalhes do Mês</Modal.Header>
          <Modal.Content scrolling>
            <p>Detalhamento das movimentações:</p>
            <ul>
              {getTransactionsForMonth(
                transactions,
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
          <Modal.Description>
            <Total>
              <h1>Total:</h1>
              <span>R$ {totalForSelectedMonth.toLocaleString('pt-br')}</span>
            </Total>
          </Modal.Description>
          <Modal.Actions>
            <Button onClick={() => setSelectedMonth(null)}>Fechar</Button>
          </Modal.Actions>
        </Modal>
      )}
    </CalendaryContainer>
  );
};

export default CalendarioAnual;

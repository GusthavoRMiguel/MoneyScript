import React, { useState, useEffect } from 'react';
import {
  CalendaryContainer,
  CalendaryHeader,
  CalendaryGrid,
  CalendaryDay,
  DetailCard,
  Total,
  LoadingIcon,
  ErrorMessage
} from './style';
import { Button, Modal } from 'semantic-ui-react';
import ITransaction from '@/interfaces/ITransaction';

interface Props {
  movimentacoes: ITransaction[];
  loading: boolean;
  currentDate: Date;
}

const CalendarioMensal: React.FC<Props> = ({
  movimentacoes,
  loading,
  currentDate
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [totalForSelectedDay, setTotalForSelectedDay] = useState<number>(0);

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  const calculateBalanceForDay = (day: string): number => {
    const transactionsForDay = movimentacoes.filter((movimentacao) => {
      return movimentacao.data === day;
    });

    let balance = 0;
    transactionsForDay.forEach((transaction) => {
      balance += transaction.valor || 0;
    });

    return balance;
  };

  const renderDaysOfMonth = (): JSX.Element[] => {
    const days = [];
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const today = new Date();

    for (let i = 1; i <= firstDayOfMonth; i++) {
      days.push(<CalendaryDay key={`empty-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

      const balanceForDay = calculateBalanceForDay(day);

      let dayClassName = '';
      if (balanceForDay > 0) {
        dayClassName = 'positive-balance';
      } else if (balanceForDay < 0) {
        dayClassName = 'negative-balance';
      } else {
        dayClassName = 'grey-balance';
      }

      const currentDateFormatted = `${today.getFullYear()}-${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

      if (day === currentDateFormatted) {
        dayClassName += ' current-day';
      }

      days.push(
        <CalendaryDay
          key={day}
          className={`${dayClassName} ${selectedDay === day ? 'selected' : ''}`}
          onClick={() => handleDayClick(day)}
        >
          <span>{i}</span>
        </CalendaryDay>
      );
    }

    return days;
  };

  const getTransactionsForSelectedDay = (): ITransaction[] => {
    if (selectedDay === null) return [];
    return movimentacoes.filter((movimentacao) => {
      return movimentacao.data === selectedDay;
    });
  };

  useEffect(() => {
    if (selectedDay !== null) {
      const total = calculateBalanceForDay(selectedDay);
      setTotalForSelectedDay(total);
    }
  }, [selectedDay, currentDate, movimentacoes]);

  return (
    <CalendaryContainer className={loading ? 'loading' : ''}>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          {movimentacoes.length === 0 ? (
            <ErrorMessage>Sem dados disponíveis</ErrorMessage>
          ) : (
            <>
              <CalendaryHeader>
                <div>Domingo</div>
                <div>Segunda</div>
                <div>Terça</div>
                <div>Quarta</div>
                <div>Quinta</div>
                <div>Sexta</div>
                <div>Sábado</div>
              </CalendaryHeader>
              <CalendaryGrid>{renderDaysOfMonth()}</CalendaryGrid>
            </>
          )}
        </>
      )}
      {selectedDay !== null && (
        <Modal open={selectedDay !== null} onClose={() => setSelectedDay(null)}>
          <Modal.Header>Detalhes do Dia </Modal.Header>
          <Modal.Content scrolling>
            {getTransactionsForSelectedDay().length !== 0 ? (
              <>
                <p>Detalhamento das movimentações :</p>
                <ul>
                  {getTransactionsForSelectedDay().map((transaction, index) => (
                    <DetailCard
                      key={index}
                      className={
                        transaction.tipo === 'entrada' ? 'entrada' : 'saida'
                      }
                    >
                      <p>Titulo: {transaction.titulo}</p>
                      <p>Descrição: {transaction.descricao}</p>
                      <p>Tipo: {transaction.tipo}</p>
                      <p>
                        Valor: R$ {transaction.valor?.toLocaleString('pt-br')}
                      </p>
                    </DetailCard>
                  ))}
                </ul>
              </>
            ) : (
              <p>Nenhuma transação.</p>
            )}
          </Modal.Content>

          <Modal.Description>
            <Total>
              <h1>Total:</h1>
              <span>R$ {totalForSelectedDay.toLocaleString('pt-br')}</span>
            </Total>
          </Modal.Description>
          <Modal.Actions>
            <Button onClick={() => setSelectedDay(null)}>Fechar</Button>
          </Modal.Actions>
        </Modal>
      )}
    </CalendaryContainer>
  );
};

export default CalendarioMensal;

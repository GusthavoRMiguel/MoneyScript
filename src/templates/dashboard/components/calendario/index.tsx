import React, { useState, useEffect } from 'react';
import {
  CalendarContainer,
  CalendarDay,
  CalendarGrid,
  DetailCard
} from './style';
import { Button, Modal } from 'semantic-ui-react';
import ITransaction from '@/interfaces/ITransaction';

interface Props {
  movimentacoes: ITransaction[];
  loading: boolean;
  currentDate: Date;
}

const Calendario: React.FC<Props> = ({
  movimentacoes,
  loading,
  currentDate
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

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

    for (let i = 1; i <= firstDayOfMonth; i++) {
      days.push(<CalendarDay key={`empty-${i}`} />);
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

      const dateObj = new Date(day);
      const dayOfWeek = dateObj.getDay();

      days.push(
        <CalendarDay
          key={day}
          className={`${dayClassName} ${selectedDay === day ? 'selected' : ''}`}
          onClick={() => handleDayClick(day)}
        >
          <span>{i}</span>
        </CalendarDay>
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

  return (
    <CalendarContainer>
      <CalendarGrid>
        <div>Domingo</div>
        <div>Segunda</div>
        <div>Terça</div>
        <div>Quarta</div>
        <div>Quinta</div>
        <div>Sexta</div>
        <div>Sábado</div>
        {loading ? <div>Carregando...</div> : renderDaysOfMonth()}
      </CalendarGrid>
      {selectedDay !== null && (
        <Modal open={selectedDay !== null} onClose={() => setSelectedDay(null)}>
          <Modal.Header>Detalhes do Dia </Modal.Header>
          <Modal.Content>
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
                      <p>Titulo:{transaction.titulo}</p>
                      <p>Descrição: {transaction.descricao}</p>
                      <p>Tipo: {transaction.tipo}</p>
                      <p>Valor: {transaction.valor}</p>
                    </DetailCard>
                  ))}
                </ul>
              </>
            ) : (
              <p>Nenhuma transação.</p>
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setSelectedDay(null)}>Fechar</Button>
          </Modal.Actions>
        </Modal>
      )}
    </CalendarContainer>
  );
};

export default Calendario;

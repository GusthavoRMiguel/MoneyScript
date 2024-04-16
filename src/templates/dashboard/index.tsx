import React, { useState, useEffect, useMemo } from 'react';
import * as S from './styles';
import { useDB } from '@/hooks/Database';
import ITransactionFilter from '@/interfaces/ITransactionFilter';
import ITransaction from '@/interfaces/ITransaction';
import Menu from '@/components/menu';
import Calendario from './components/calendario';
import Grafico from './components/grafico';
import Extrato from './components/extrato';
import AddMovimentacao from './components/registro';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const DashboardPage: React.FC = () => {
  const { getTransactionsByFilter, addTransaction, getBalanceForMonth } =
    useDB();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [movimentacoes, setMovimentacoes] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataUpdated, setDataUpdated] = useState<boolean>(false);
  const [saldo, setSaldo] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>(
    currentDate.toISOString().slice(0, 7)
  );

  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(true);

  const toggleView = () => {
    setIsBalanceHidden((prevValue) => !prevValue);
  };

  const formatBalanceToPassword = (balance: number): string => {
    return '*'.repeat(String(balance).length);
  };

  const getLastDayOfMonth = (year: number, month: number): number => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  };

  const memoizedTransactions = useMemo(() => {
    const getTransactionsByCurrentMonth = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;

      const filterOptions: ITransactionFilter = {
        dataInicial: `${year}-${formattedMonth}-01`,
        dataFinal: `${year}-${formattedMonth}-${getLastDayOfMonth(
          year,
          month - 1
        )}`
      };

      return await getTransactionsByFilter(filterOptions);
    };

    return getTransactionsByCurrentMonth();
  }, [currentDate, getTransactionsByFilter, dataUpdated]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await memoizedTransactions;
      setMovimentacoes(transactions);
    };

    fetchTransactions();
  }, [memoizedTransactions]);

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1
      );
      const formattedDate = `${prevMonth.getFullYear()}-${String(
        prevMonth.getMonth() + 1
      ).padStart(2, '0')}`;

      setSelectedDate(formattedDate); // Atualiza o valor do input
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1
      );
      const formattedDate = `${nextMonth.getFullYear()}-${String(
        nextMonth.getMonth() + 1
      ).padStart(2, '0')}`;

      setSelectedDate(formattedDate);
      return nextMonth;
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month] = e.target.value.split('-').map(Number);
    setCurrentDate(new Date(year, month - 1));
    setSelectedDate(e.target.value);
  };

  const handleAddTransaction = async (movimentacao: ITransaction) => {
    setLoading(true);
    try {
      if (movimentacao.isRecorrente && movimentacao.recorrenciaMeses) {
        await addTransaction(movimentacao);

        const originalDate = new Date(movimentacao.data);
        const originalDay = originalDate.getDate();
        const originalMonth = originalDate.getMonth();
        const originalYear = originalDate.getFullYear();

        for (let i = 1; i < movimentacao.recorrenciaMeses; i++) {
          let newMonth = originalMonth + i;
          let newYear = originalYear;
          const newDay = originalDay + 1;

          if (newMonth > 11) {
            newMonth -= 12;
            newYear++;
          }

          const newDate = new Date(newYear, newMonth, newDay);

          const nextMovimentacao = {
            ...movimentacao,
            data: newDate.toISOString().slice(0, 10)
          };
          await addTransaction(nextMovimentacao);
          setDataUpdated(true);
        }
      } else {
        const { success } = await addTransaction(movimentacao);
        if (success) {
          console.log('Transação Adicionada !');
        }
      }
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    } finally {
      setLoading(false);
      setDataUpdated(true);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const balance = await getBalanceForMonth(year, month);

      setSaldo(balance);
    };

    fetchBalance();
  }, [currentDate, getBalanceForMonth, dataUpdated]);

  return (
    <S.Container>
      <Menu />
      <S.CalendarHeader>
        <S.CalendarButton onClick={handlePreviousMonth}>
          Anterior
        </S.CalendarButton>
        <input type="month" value={selectedDate} onChange={handleDateChange} />

        <S.CalendarButton onClick={handleNextMonth}>Próximo</S.CalendarButton>
      </S.CalendarHeader>
      <S.Content>
        <S.Flex>
          <S.Saldo>
            {isBalanceHidden ? (
              <>
                <h1>Saldo:</h1> <span>R$ {formatBalanceToPassword(saldo)}</span>{' '}
                <button type="button" onClick={toggleView}>
                  <BsFillEyeSlashFill />
                </button>
              </>
            ) : (
              <>
                <h1>Saldo:</h1> <span>R$ {saldo.toLocaleString('pt-Br')}</span>
                <button type="button" onClick={toggleView}>
                  <BsFillEyeFill />
                </button>
              </>
            )}
          </S.Saldo>

          <AddMovimentacao onSubmit={handleAddTransaction} />
        </S.Flex>
        <S.Flex>
          <Calendario
            currentDate={currentDate}
            movimentacoes={movimentacoes}
            loading={loading}
          />
          <Grafico movimentacoes={movimentacoes} loading={loading} />
        </S.Flex>
        <S.Flex>
          <Extrato movimentacoes={movimentacoes} loading={loading} />
        </S.Flex>
      </S.Content>
    </S.Container>
  );
};

export default DashboardPage;

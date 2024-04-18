import React, { useState, useEffect, useMemo } from 'react';
import * as S from './styles';
import { useDB } from '@/hooks/Database';
import ITransactionFilter from '@/interfaces/ITransactionFilter';
import ITransaction from '@/interfaces/ITransaction';

import CalendarioAnual from './components/calendarioAnual';
import Grafico from '../../components/grafico';
import Extrato from '../../components/extrato';
import AddMovimentacao from '../../components/registro';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import HeaderCalendario from '../headerCalendario';

const DashAnual: React.FC = () => {
  const { getTransactionsByFilter, addTransaction, getBalanceForMonth } =
    useDB();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [movimentacoes, setMovimentacoes] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataUpdated, setDataUpdated] = useState<boolean>(false);
  const [saldoAteMesAtual, setSaldoAteMesAtual] = useState<number>(0);
  const [projecaoAnual, setProjecaoAnual] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(
    currentDate.getFullYear()
  );

  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(true);
  const [isBalanceAtualHidden, setIsBalanceAtualHidden] =
    useState<boolean>(true);

  const toggleView = () => {
    setIsBalanceHidden((prevValue) => !prevValue);
  };
  const toggleAtualView = () => {
    setIsBalanceAtualHidden((prevValue) => !prevValue);
  };

  const formatBalanceToPassword = (balance: number): string => {
    return '*'.repeat(String(balance).length);
  };

  const memoizedTransactions = useMemo(() => {
    const getTransactionsByCurrentYear = async () => {
      const filterOptions: ITransactionFilter = {
        dataInicial: `${selectedYear}-01-01`,
        dataFinal: `${selectedYear}-12-31`
      };

      return await getTransactionsByFilter(filterOptions);
    };

    return getTransactionsByCurrentYear();
  }, [selectedYear, getTransactionsByFilter, dataUpdated]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await memoizedTransactions;
      setMovimentacoes(transactions);
    };

    fetchTransactions();
  }, [memoizedTransactions]);

  const calculateSaldoAteMesAtual = async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const balance = await getBalanceForMonth(year, month);
    setSaldoAteMesAtual(balance);
  };

  const calculateProjecaoAnual = async () => {
    const year = currentDate.getFullYear();
    const projecaoCalculada = await getBalanceForMonth(year, 12);
    setProjecaoAnual(projecaoCalculada);
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
    calculateSaldoAteMesAtual();
    calculateProjecaoAnual();
  }, [movimentacoes]);

  const handlePreviousYear = () => {
    setSelectedYear((prevYear) => {
      setCurrentDate(new Date(prevYear - 1, currentDate.getMonth()));
      return prevYear - 1;
    });
  };

  const handleNextYear = () => {
    setSelectedYear((prevYear) => {
      setCurrentDate(new Date(prevYear + 1, currentDate.getMonth()));
      return prevYear + 1;
    });
  };

  return (
    <S.Container>
      <HeaderCalendario
        handlePrevious={handlePreviousYear}
        handleNext={handleNextYear}
        year
        selected={selectedYear}
        handleChange={(e) => setSelectedYear(Number(e.target.value))}
      />

      <S.Content>
        <S.Flex>
          <S.Saldo>
            {isBalanceAtualHidden ? (
              <>
                <h1>Saldo até o mês atual:</h1>{' '}
                <span>R$ {formatBalanceToPassword(saldoAteMesAtual)}</span>
                <button type="button" onClick={toggleAtualView}>
                  <BsFillEyeSlashFill />
                </button>
              </>
            ) : (
              <>
                <h1>Saldo até o mês atual:</h1>{' '}
                <span>R$ {saldoAteMesAtual.toLocaleString('pt-Br')}</span>
                <button type="button" onClick={toggleAtualView}>
                  <BsFillEyeFill />
                </button>
              </>
            )}
          </S.Saldo>
          <S.Saldo>
            {isBalanceHidden ? (
              <>
                <h1>Projeção anual:</h1>{' '}
                <span>R$ {formatBalanceToPassword(projecaoAnual)}</span>
                <button type="button" onClick={toggleView}>
                  <BsFillEyeSlashFill />
                </button>
              </>
            ) : (
              <>
                <h1>Projeção anual:</h1>{' '}
                <span>R$ {projecaoAnual.toLocaleString('pt-Br')}</span>
                <button type="button" onClick={toggleView}>
                  <BsFillEyeFill />
                </button>
              </>
            )}
          </S.Saldo>
          <AddMovimentacao onSubmit={handleAddTransaction} />
        </S.Flex>
        <S.Flex>
          <CalendarioAnual
            movimentacoes={movimentacoes}
            loading={loading}
            currentYear={currentDate.getFullYear()}
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

export default DashAnual;

import { useState, useEffect, useMemo } from 'react';
import { useDB } from '@/hooks/Database';
import ITransactionFilter from '@/interfaces/ITransactionFilter';
import ITransaction from '@/interfaces/ITransaction';

const useService = (dashAnual: boolean) => {
  const { getTransactionsByFilter, addTransaction, getBalanceForMonth } =
    useDB();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataUpdated, setDataUpdated] = useState<boolean>(false);
  const [saldoGeral, setSaldoGeral] = useState<number>(0);
  const [saldoAtual, setSaldoAtual] = useState<number>(0);
  const [projecaoAnual, setProjecaoAnual] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>(
    currentDate.toISOString().slice(0, 7)
  );
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

  const getLastDayOfMonth = (year: number, month: number): number => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  };

  const fetchData = async () => {
    if (dashAnual) {
      const filterOptions: ITransactionFilter = {
        dataInicial: `${selectedYear}-01-01`,
        dataFinal: `${selectedYear}-12-31`
      };
      return await getTransactionsByFilter(filterOptions);
    } else {
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
    }
  };

  const memoizedTransactions = useMemo(() => {
    return fetchData();
  }, [
    dashAnual,
    selectedYear,
    currentDate,
    getTransactionsByFilter,
    dataUpdated
  ]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await memoizedTransactions;
      setTransactions(transactions);
    };

    fetchTransactions();
  }, [memoizedTransactions]);

  const handlePrevious = () => {
    if (dashAnual) {
      setSelectedYear((prevYear) => {
        setCurrentDate(new Date(prevYear - 1, currentDate.getMonth()));
        return prevYear - 1;
      });
    } else {
      setCurrentDate((prevDate) => {
        const prevMonth = new Date(
          prevDate.getFullYear(),
          prevDate.getMonth() - 1
        );
        const formattedDate = `${prevMonth.getFullYear()}-${String(
          prevMonth.getMonth() + 1
        ).padStart(2, '0')}`;

        setSelectedDate(formattedDate);
        return prevMonth;
      });
    }
  };

  const handleNext = () => {
    if (dashAnual) {
      setSelectedYear((prevYear) => {
        setCurrentDate(new Date(prevYear + 1, currentDate.getMonth()));
        return prevYear + 1;
      });
    } else {
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
    }
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const [year, month] = e.target.value.split('-').map(Number);
    setCurrentDate(new Date(year, month - 1));
    setSelectedDate(e.target.value);
  };

  const handleYearChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSelectedYear(Number(e.target.value));
  };

  const handleAddTransaction = async (transaction: ITransaction) => {
    setLoading(true);
    try {
      await addTransaction(transaction);
      setDataUpdated(true);
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSaldoGeral = async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const balance = await getBalanceForMonth(year, month);
    setSaldoGeral(balance);
  };

  const calculateProjecaoAnual = async () => {
    const year = currentDate.getFullYear();
    const projecaoCalculada = await getBalanceForMonth(year, 12);
    setProjecaoAnual(projecaoCalculada);
  };

  const calculateSaldoAtual = async () => {
    let saldoAtualCalculado = 0;

    transactions.forEach((transaction) => {
      saldoAtualCalculado += transaction?.valor || 0;
    });

    setSaldoAtual(saldoAtualCalculado);
  };

  useEffect(() => {
    calculateSaldoAtual();
    calculateSaldoGeral();
    calculateProjecaoAnual();
  }, [transactions, currentDate, selectedYear]);

  return {
    dashAnual,
    selectedYear,
    currentDate,
    selectedDate,
    transactions,
    saldoAtual,
    saldoGeral,
    projecaoAnual,
    loading,
    isBalanceHidden,
    isBalanceAtualHidden,
    handlePrevious,
    handleNext,
    handleDateChange,
    handleYearChange,
    handleAddTransaction,
    toggleView,
    toggleAtualView,
    formatBalanceToPassword
  };
};

export default useService;

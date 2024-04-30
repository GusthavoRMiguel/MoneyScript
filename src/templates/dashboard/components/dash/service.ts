import { useState, useEffect, useMemo } from 'react';
import { useDB } from '@/hooks/Database';

import ITransaction from '@/interfaces/ITransaction';

const useService = (dashAnual: boolean) => {
  const { getTransactionsForYear, addTransaction } = useDB();
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
  const [isProjectedBalanceHidden, setIsProjectedBalanceHidden] =
    useState<boolean>(true);

  const toggleView = () => {
    setIsBalanceHidden((prevValue) => !prevValue);
  };
  const toggleProjectedView = () => {
    setIsProjectedBalanceHidden((prevValue) => !prevValue);
  };

  const toggleAtualView = () => {
    setIsBalanceAtualHidden((prevValue) => !prevValue);
  };

  const formatBalanceToPassword = (balance: number): string => {
    return '*'.repeat(String(balance).length);
  };

  const fetchData = async () => {
    if (dashAnual) {
      return await getTransactionsForYear(selectedYear);
    } else {
      return await getTransactionsForYear(currentDate.getFullYear());
    }
  };

  const memoizedTransactions = useMemo(() => {
    return fetchData();
  }, [selectedYear, currentDate, getTransactionsForYear, dataUpdated]);

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
    const totalSum = transactions.reduce((total, transaction) => {
      return total + (transaction.valor || 0);
    }, 0);
    setSaldoGeral(totalSum);
  };

  const calculateProjecaoAnual = () => {
    const totalSum = transactions.reduce((total, transaction) => {
      return total + (transaction.valor || 0);
    }, 0);
    setProjecaoAnual(totalSum);
  };

  const calculateSaldoAtual = () => {
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const saldoAtualCalculado = transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.data);
      const transactionMonth = transactionDate.getMonth() + 1;
      const transactionYear = transactionDate.getFullYear();

      if (
        transactionYear === currentYear &&
        transactionMonth === currentMonth
      ) {
        return (total += transaction.valor || 0);
      } else {
        return total;
      }
    }, 0);

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
    isProjectedBalanceHidden,
    handlePrevious,
    handleNext,
    handleDateChange,
    handleYearChange,
    handleAddTransaction,
    toggleView,
    toggleProjectedView,
    toggleAtualView,
    formatBalanceToPassword
  };
};

export default useService;

import { useState, useEffect, useMemo } from 'react';
import { useDB } from '@/hooks/Database';

import ITransaction from '@/interfaces/ITransaction';

const useService = (dashAnual: boolean) => {
  const { getTransactionsForYear, addTransaction } = useDB();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataUpdated, setDataUpdated] = useState<boolean>(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    currentDate.toISOString().slice(0, 7)
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    currentDate.getFullYear()
  );

  const [saldoGeral, setSaldoGeral] = useState<number>(0);
  const [saldoAtual, setSaldoAtual] = useState<number>(0);
  const [projecaoAnual, setProjecaoAnual] = useState<number>(0);

  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(true);
  const [isBalanceAtualHidden, setIsBalanceAtualHidden] =
    useState<boolean>(true);
  const [isProjectedBalanceHidden, setIsProjectedBalanceHidden] =
    useState<boolean>(true);

  const formatBalanceToPassword = (balance: number): string => {
    return '*'.repeat(String(balance).length);
  };

  const toggleView = () => {
    setIsBalanceHidden((prevValue) => !prevValue);
  };
  const toggleProjectedView = () => {
    setIsProjectedBalanceHidden((prevValue) => !prevValue);
  };
  const toggleAtualView = () => {
    setIsBalanceAtualHidden((prevValue) => !prevValue);
  };

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
        setSelectedYear(Number(prevMonth.getFullYear()));
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
        setSelectedYear(Number(nextMonth.getFullYear()));
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
    setSelectedYear(Number(new Date(year)));
  };

  const handleYearChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSelectedYear(Number(e.target.value));
  };

  const handleDataUpdate = () => {
    setDataUpdated(true);
  };

  const handleAddTransaction = async (transaction: ITransaction) => {
    setLoading(true);
    try {
      if (transaction.isRecorrente) {
        const numberOfTransactions = transaction.recorrenciaMeses || 0;
        const baseDate = new Date(transaction.data);
        const transactionsToAdd = [];

        for (let i = 0; i < numberOfTransactions; i++) {
          const newTransaction = { ...transaction };

          const newDate = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + i,
            baseDate.getDate() + 1
          );
          newTransaction.data = newDate.toISOString().substring(0, 10);
          transactionsToAdd.push(newTransaction);
        }

        await Promise.all(
          transactionsToAdd.map(async (newTransaction) => {
            await addTransaction(newTransaction);
          })
        );
      } else {
        await addTransaction(transaction);
      }

      setDataUpdated(true);
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    } finally {
      setDataUpdated(true);
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
    const fetchTransactions = async () => {
      setLoading(true);
      let storedData = localStorage.getItem('transactionsData');
      let existingData: {
        transactions: ITransaction[];
        expirationDate: string;
      } | null = null;

      if (storedData) {
        existingData = JSON.parse(storedData);
      }

      try {
        let fetchedTransactions: ITransaction[] = [];

        if (
          !existingData ||
          isDataExpired(existingData.expirationDate) ||
          dataUpdated ||
          !existingData.transactions.some((transaction) => {
            const transactionYear = new Date(transaction.data).getFullYear();
            return transactionYear === selectedYear;
          })
        ) {
          fetchedTransactions = await getTransactionsForYear(selectedYear);

          const mergedTransactions = [
            ...(existingData?.transactions || []),
            ...fetchedTransactions.filter(
              (newTransaction) =>
                !existingData?.transactions.some(
                  (existingTransaction) =>
                    existingTransaction.id === newTransaction.id
                )
            )
          ];

          mergedTransactions.sort((a, b) => (a.id > b.id ? 1 : -1));

          const expirationDate = getExpirationDate();
          const newData = { transactions: mergedTransactions, expirationDate };
          setTransactions(mergedTransactions);
          localStorage.setItem('transactionsData', JSON.stringify(newData));
        } else {
          setTransactions(existingData.transactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }

      setLoading(false);
    };

    const isDataExpired = (expirationDate: string): boolean => {
      const now = new Date();
      const expired = new Date(expirationDate) <= now;
      return expired;
    };

    const getExpirationDate = (): string => {
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return expirationDate.toISOString();
    };

    fetchTransactions();
  }, [selectedYear, dataUpdated]);

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
    handleDataUpdate,
    toggleView,
    toggleProjectedView,
    toggleAtualView,
    formatBalanceToPassword
  };
};

export default useService;

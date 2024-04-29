import { useState, useEffect } from 'react';
import ITransaction from '@/interfaces/ITransaction';
import { useDB } from '@/hooks/Database';

interface ServiceProps {
  transactions: ITransaction[];
  loading: boolean;
}

const useService = ({ transactions, loading }: ServiceProps) => {
  const { removeTransaction, getTransactionsByFilter } = useDB();

  const [sortedTransactions, setSortedTransactions] = useState<ITransaction[]>(
    []
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'valor' | 'data'>('data');

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [transactionToRemove, setTransactionToRemove] = useState<string>('');

  const [openEditConfirmation, setOpenEditConfirmation] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<string>('');

  useEffect(() => {
    sortTransactions(sortBy);
  }, [transactions, sortBy, sortDirection]);

  const sortTransactions = (sortField: 'valor' | 'data') => {
    const sortedList: ITransaction[] = [...transactions];

    if (sortField === 'valor') {
      sortedList.sort((a, b) => {
        const valorA = a.valor || 0;
        const valorB = b.valor || 0;

        if (sortField === sortBy) {
          return sortDirection === 'asc' ? valorA - valorB : valorB - valorA;
        }
        return valorA - valorB;
      });
    } else if (sortField === 'data') {
      sortedList.sort((a, b) => {
        const dateA = new Date(a.data).getTime();
        const dateB = new Date(b.data).getTime();

        if (sortField === sortBy) {
          return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return dateA - dateB;
      });
    }

    setSortedTransactions(sortedList);
  };

  const toggleSortDirection = () => {
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);
  };

  const handleSort = (field: 'valor' | 'data') => {
    if (field === sortBy) {
      toggleSortDirection();
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleRemove = (id: string) => {
    setOpenConfirmation(true);
    setTransactionToRemove(id);
  };

  const handleEdit = (id: string) => {
    setOpenEditConfirmation(true);
    setTransactionToEdit(id);
  };

  const handleConfirmRemove = async () => {
    try {
      await removeTransaction(transactionToRemove);
      const updatedTransactions = await getTransactionsByFilter({
        dataInicial: '',
        dataFinal: ''
      });
      setSortedTransactions(updatedTransactions);
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error removing transaction:', error);
    }
  };

  const handleConfirmEdit = async () => {
    try {
      await removeTransaction(transactionToRemove);
      const updatedTransactions = await getTransactionsByFilter({
        dataInicial: '',
        dataFinal: ''
      });
      setSortedTransactions(updatedTransactions);
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error removing transaction:', error);
    }
  };

  const handleCancelRemove = () => {
    setOpenConfirmation(false);
    setTransactionToRemove('');
  };
  const handleCancelEdit = () => {
    setOpenEditConfirmation(false);
    setTransactionToEdit('');
  };

  return {
    openConfirmation,
    openEditConfirmation,
    transactionToEdit,
    sortedTransactions,
    loading,
    sortDirection,
    handleSort,
    handleRemove,
    handleEdit,
    handleConfirmRemove,
    handleConfirmEdit,
    handleCancelRemove,
    handleCancelEdit
  };
};

export default useService;

import { useState, useEffect } from 'react';
import ITransaction from '@/interfaces/ITransaction';
import { useDB } from '@/hooks/Database';

interface ServiceProps {
  transactions: ITransaction[];
  loading: boolean;
  dataUpdate: () => void;
}

const useService = ({ transactions, loading, dataUpdate }: ServiceProps) => {
  const { removeTransaction, updateTransaction } = useDB();

  const [sortedTransactions, setSortedTransactions] = useState<ITransaction[]>(
    []
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'valor' | 'data'>('data');

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [transactionToRemove, setTransactionToRemove] = useState<string>('');

  const [openEditConfirmation, setOpenEditConfirmation] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<string>('');
  const [newValue, setNewValue] = useState<number>(0);
  const [newDescription, setNewDescription] = useState<string>('');

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
    setNewValue(100);
    setNewDescription('teste edit');
  };

  const handleConfirmRemove = async () => {
    try {
      // Remove a transação do banco de dados
      await removeTransaction(transactionToRemove);

      // Atualiza o estado local dos dados
      dataUpdate();

      // Remove a transação do localStorage
      const storedData = localStorage.getItem('transactionsData');
      if (storedData) {
        const existingData = JSON.parse(storedData);
        const updatedTransactions = existingData.transactions.filter(
          (transaction: { id: string }) =>
            transaction.id !== transactionToRemove
        );
        localStorage.setItem(
          'transactionsData',
          JSON.stringify({
            ...existingData,
            transactions: updatedTransactions
          })
        );
      }

      // Fecha o modal de confirmação
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error removing transaction:', error);
    }
  };

  const handleConfirmEdit = async () => {
    try {
      await updateTransaction(transactionToEdit, newDescription, newValue);
      dataUpdate();
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error updating transaction:', error);
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

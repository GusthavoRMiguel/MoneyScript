import React from 'react';
import ITransaction from '@/interfaces/ITransaction';
import View from './view';
import useService from './service';

interface StatementProps {
  transactions: ITransaction[];
  loading: boolean;
}

const Statement: React.FC<StatementProps> = ({ transactions, loading }) => {
  const {
    sortedTransactions,
    sortDirection,
    handleSort,
    handleRemove,
    handleEdit,
    openConfirmation,
    openEditConfirmation,
    handleCancelEdit,
    handleConfirmEdit,
    handleCancelRemove,
    handleConfirmRemove
  } = useService({ transactions, loading });

  return (
    <View
      sortedTransactions={sortedTransactions}
      sortDirection={sortDirection}
      handleSort={handleSort}
      handleRemove={handleRemove}
      handleEdit={handleEdit}
      openConfirmation={openConfirmation}
      openEditConfirmation={openEditConfirmation}
      handleCancelEdit={handleCancelEdit}
      handleConfirmEdit={handleConfirmEdit}
      handleCancelRemove={handleCancelRemove}
      handleConfirmRemove={handleConfirmRemove}
      loading={loading}
    />
  );
};

export default Statement;

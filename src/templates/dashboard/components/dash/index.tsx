import React from 'react';
import ITransaction from '@/interfaces/ITransaction';
import View from './view';
import useService from './service';

interface DashProps {
  dashAnual: boolean;
}

const Dash: React.FC<DashProps> = ({ dashAnual }) => {
  const {
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
    formatBalanceToPassword,
    selectedYear
  } = useService(dashAnual);

  return (
    <View
      dashAnual={dashAnual}
      currentDate={currentDate}
      selectedDate={selectedDate}
      selectedYear={selectedYear}
      transactions={transactions}
      saldoAtual={saldoAtual}
      saldoGeral={saldoGeral}
      projecaoAnual={projecaoAnual}
      loading={loading}
      isBalanceHidden={isBalanceHidden}
      isBalanceAtualHidden={isBalanceAtualHidden}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      handleDateChange={handleDateChange}
      handleYearChange={handleYearChange}
      handleAddTransaction={handleAddTransaction}
      toggleView={toggleView}
      toggleAtualView={toggleAtualView}
      formatBalanceToPassword={formatBalanceToPassword}
    />
  );
};

export default Dash;

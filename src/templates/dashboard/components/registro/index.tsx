import React from 'react';
import ITransaction from '@/interfaces/ITransaction';
import View from './view';
import useService from './service';

interface RegisterProps {
  onSubmit: (transaction: ITransaction) => void;
}

const RegisterTransaction: React.FC<RegisterProps> = ({ onSubmit }) => {
  const {
    typeOptions,
    subtypeOptions,
    recurrenceOptions,
    errors,
    modalOpen,
    handleSubmit,
    handleModalOpen,
    handleModalClose,
    handleCheckboxChange,
    handleInputChange
  } = useService({ onSubmit });

  return (
    <View
      typeOptions={typeOptions}
      subtypeOptions={subtypeOptions}
      recurrenceOptions={recurrenceOptions}
      errors={errors}
      modalOpen={modalOpen}
      handleSubmit={handleSubmit}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      handleCheckboxChange={handleCheckboxChange}
      handleInputChange={handleInputChange}
    />
  );
};

export default RegisterTransaction;

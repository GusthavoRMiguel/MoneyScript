import React, { useState } from 'react';

import ITransaction from '@/interfaces/ITransaction';
import { CheckboxProps } from 'semantic-ui-react';

import * as Yup from 'yup';

interface ServiceProps {
  onSubmit: (transaction: ITransaction) => void;
}

const useService = ({ onSubmit }: ServiceProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<ITransaction>({
    id: '',
    data: '',
    tipo: '0',
    titulo: '0',
    descricao: '',
    valor: undefined,
    isRecorrente: false,
    recorrenciaMeses: 0
  });
  const [errors, setErrors] = useState<Partial<ITransaction>>({});

  const recurrenceOptions = [
    { key: '0', text: 'Selecione', value: 0 },
    { key: '3meses', text: '3 meses', value: 3 },
    { key: '6meses', text: '6 meses', value: 6 },
    { key: '12meses', text: '12 meses', value: 12 }
  ];

  const typeOptions = [
    { key: '0', text: 'Selecione um tipo', value: '0' },
    { key: 'entrada', text: 'Entrada', value: 'entrada' },
    { key: 'saida', text: 'Saída', value: 'saida' }
  ];

  const subtypeOptions =
    transaction.tipo === 'entrada'
      ? [
          { key: '0', text: 'Selecione um subtipo', value: '0' },
          { key: 'bonus', text: 'Bônus', value: 'bonus' },
          { key: 'comissao', text: 'Comissão', value: 'comissao' },
          { key: 'emprestimo', text: 'Empréstimo', value: 'emprestimo' },
          { key: 'investimento', text: 'Investimento', value: 'investimento' },
          { key: 'outros', text: 'Outros', value: 'outros' },
          { key: 'reembolso', text: 'Reembolso', value: 'reembolso' },
          { key: 'salario', text: 'Salário', value: 'salario' },
          { key: 'venda', text: 'Venda', value: 'venda' }
        ]
      : [
          { key: '0', text: 'Selecione um subtipo', value: '0' },
          { key: 'alimentacao', text: 'Alimentação', value: 'alimentacao' },
          { key: 'aluguel', text: 'Aluguel', value: 'aluguel' },
          { key: 'assinaturas', text: 'Assinaturas', value: 'assinaturas' },
          {
            key: 'cartaoCredito',
            text: 'Cartão de Crédito',
            value: 'cartao de credito'
          },
          { key: 'contaAgua', text: 'Conta de água', value: 'conta de agua' },
          {
            key: 'contaEnergia',
            text: 'Conta de energia',
            value: 'conta de energia'
          },
          { key: 'contaGas', text: 'Conta de gás', value: 'conta de gas' },
          {
            key: 'contaInternet',
            text: 'Conta de internet',
            value: 'conta de internet'
          },
          {
            key: 'contaTelefone',
            text: 'Conta de telefone',
            value: 'conta de telefone'
          },
          {
            key: 'despesasMedicas',
            text: 'Despesas Médicas',
            value: 'despesas medicas'
          },
          { key: 'educacao', text: 'Educação', value: 'educacao' },
          { key: 'emprestimo', text: 'Empréstimo', value: 'emprestimo' },
          {
            key: 'entretenimento',
            text: 'Entretenimento',
            value: 'entretenimento'
          },
          { key: 'mercado', text: 'Mercado', value: 'mercado' },
          { key: 'outros', text: 'Outros', value: 'outros' },
          { key: 'transporte', text: 'Transporte', value: 'transporte' }
        ];

  const validationSchema = Yup.object().shape({
    data: Yup.date().required('A data é obrigatória'),
    tipo: Yup.string().required('O tipo é obrigatório'),
    titulo: Yup.string().required('O subtipo é obrigatório'),
    valor: Yup.number().required('O valor é obrigatório'),
    descricao: Yup.string().when('titulo', ([titulo], schema) => {
      return titulo === 'outros'
        ? schema.required(
            'A descrição é obrigatória quando o subtipo é "outros"'
          )
        : schema;
    }),
    recorrenciaMeses: Yup.number().when(
      'isRecorrente',
      (isRecorrente, schema) => {
        return isRecorrente
          ? schema
              .required('A recorrência é obrigatória')
              .oneOf([0, 3, 6, 12], 'Opção inválida')
          : schema;
      }
    )
  });

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setTransaction((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'isRecorrente' && !value) {
      setTransaction((prevState) => ({
        ...prevState,
        recorrenciaMeses: 3
      }));
    }
  };

  const handleCheckboxChange = (
    e: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    const { name, checked } = data;

    if (typeof name !== 'string') {
      return;
    }

    setTransaction((prevState) => {
      const updatedState = { ...prevState, [name]: checked };

      if (name === 'isRecorrente' && !checked) {
        updatedState.recorrenciaMeses = 3;
      }

      return updatedState;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedTransaction = { ...transaction };

      updatedTransaction.valor = Number(updatedTransaction.valor);

      if (isNaN(updatedTransaction.valor)) {
        throw new Error('Value must be numeric');
      }

      if (updatedTransaction.tipo === 'saida') {
        updatedTransaction.valor = -(
          Math.abs(Number(updatedTransaction.valor)) || 0
        );
      }

      await validationSchema.validate(updatedTransaction, {
        abortEarly: false
      });
      onSubmit(updatedTransaction);
      setTransaction({
        id: '',
        data: '',
        tipo: '0',
        titulo: '0',
        descricao: '',
        valor: undefined,
        isRecorrente: false,
        recorrenciaMeses: 0
      });
      handleModalClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let validationErrors: Partial<ITransaction> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            const path = err.path as keyof ITransaction;
            validationErrors = {
              ...validationErrors,
              [path]: err.message
            };
          }
        });

        setErrors(validationErrors);
      } else {
        console.error('Error submitting:', error);
      }
    }
  };

  return {
    transaction,
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
  };
};

export default useService;

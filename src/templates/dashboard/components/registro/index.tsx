import React, { useState } from 'react';
import * as S from './styles';
import ITransaction from '@/interfaces/ITransaction';
import {
  Dropdown,
  Form,
  Button,
  Modal,
  Checkbox,
  CheckboxProps
} from 'semantic-ui-react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import * as Yup from 'yup';

interface AddRecordProps {
  onSubmit: (movimentacao: ITransaction) => void;
}

const AddMovimentacao: React.FC<AddRecordProps> = ({ onSubmit }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [movimentacao, setMovimentacao] = useState<ITransaction>({
    id: '',
    data: '',
    tipo: '',
    titulo: '',
    descricao: '',
    valor: undefined,
    isRecorrente: false,
    recorrenciaMeses: 3
  });
  const [errors, setErrors] = useState<Partial<ITransaction>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMovimentacao((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'isRecorrente' && !value) {
      setMovimentacao((prevState) => ({
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

    setMovimentacao((prevState) => {
      const updatedState = { ...prevState, [name]: checked };

      if (name === 'isRecorrente' && !checked) {
        updatedState.recorrenciaMeses = 3;
      }

      return updatedState;
    });
  };

  const recorrenciaOptions = [
    { key: '3meses', text: '3 meses', value: 3 },
    { key: '6meses', text: '6 meses', value: 6 },
    { key: '12meses', text: '12 meses', value: 12 }
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
              .oneOf([3, 6, 12], 'Opção inválida')
          : schema;
      }
    )
  });

  const tipoOptions = [
    { key: 'entrada', text: 'Entrada', value: 'entrada' },
    { key: 'saida', text: 'Saída', value: 'saida' }
  ];

  const subtipoOptions =
    movimentacao.tipo === 'entrada'
      ? [
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

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const movimentacaoAtualizada = { ...movimentacao };

      movimentacaoAtualizada.valor = Number(movimentacaoAtualizada.valor);

      if (isNaN(movimentacaoAtualizada.valor)) {
        throw new Error('O valor deve ser numérico');
      }

      if (movimentacaoAtualizada.tipo === 'saida') {
        movimentacaoAtualizada.valor = -(
          Math.abs(Number(movimentacaoAtualizada.valor)) || 0
        );
      }

      await validationSchema.validate(movimentacaoAtualizada, {
        abortEarly: false
      });
      onSubmit(movimentacaoAtualizada);
      setMovimentacao({
        id: '',
        data: '',
        tipo: '',
        titulo: '',
        descricao: '',
        valor: undefined,
        isRecorrente: false,
        recorrenciaMeses: 3
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
        console.error('Erro ao submeter:', error);
      }
    }
  };

  return (
    <S.Container>
      <S.OpenButton onClick={handleModalOpen}>
        Adicionar Movimentação <IoMdAddCircleOutline />
      </S.OpenButton>

      <Modal onClose={handleModalClose} open={modalOpen}>
        <Modal.Header>
          <h1>Adicionar Transação</h1>
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field error={!!errors.data}>
              <label>Data:</label>
              <input
                type="date"
                name="data"
                value={movimentacao.data}
                onChange={handleInputChange}
              />
              {errors.data && <S.ErrorMessage>{errors.data}</S.ErrorMessage>}
            </Form.Field>

            <Form.Field error={!!errors.tipo}>
              <label>Tipo:</label>
              <Dropdown
                selection
                name="tipo"
                options={tipoOptions}
                value={movimentacao.tipo}
                onChange={(e, { value }) =>
                  handleInputChange({
                    target: { name: 'tipo', value }
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
              {errors.tipo && <S.ErrorMessage>{errors.tipo}</S.ErrorMessage>}
            </Form.Field>

            <Form.Field error={!!errors.titulo}>
              <label>Subtipo:</label>
              <Dropdown
                selection
                name="titulo"
                options={subtipoOptions}
                value={movimentacao.titulo}
                onChange={(e, { value }) =>
                  handleInputChange({
                    target: { name: 'titulo', value }
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
              {errors.titulo && (
                <S.ErrorMessage>{errors.titulo}</S.ErrorMessage>
              )}
            </Form.Field>

            <Form.Field error={!!errors.descricao}>
              <label>Descrição:</label>
              <input
                type="text"
                name="descricao"
                value={movimentacao.descricao}
                onChange={handleInputChange}
              />
              {errors.descricao && (
                <S.ErrorMessage>{errors.descricao}</S.ErrorMessage>
              )}
            </Form.Field>

            <Form.Field error={!!errors.valor}>
              <label>Valor:</label>
              <input
                type="number"
                name="valor"
                value={movimentacao.valor}
                onChange={handleInputChange}
              />
              {errors.valor && <S.ErrorMessage>{errors.valor}</S.ErrorMessage>}
            </Form.Field>

            <Form.Field>
              <Checkbox
                label="Recorrente"
                name="isRecorrente"
                checked={movimentacao.isRecorrente}
                onChange={handleCheckboxChange}
              />
              {movimentacao.isRecorrente && (
                <Dropdown
                  selection
                  name="recorrenciaMeses"
                  options={recorrenciaOptions}
                  value={movimentacao.recorrenciaMeses}
                  onChange={(e, { value }) => {
                    handleInputChange({
                      target: {
                        name: 'recorrenciaMeses',
                        value,
                        type: 'number'
                      }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                />
              )}
            </Form.Field>

            <S.Flex>
              <Button type="submit">Adicionar Movimentação</Button>
            </S.Flex>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleModalClose}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal>
    </S.Container>
  );
};

export default AddMovimentacao;

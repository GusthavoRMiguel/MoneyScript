import React, { useState } from 'react';
import * as S from './styles';
import ITransaction from '@/interfaces/ITransaction';
import { Dropdown, Form, Button } from 'semantic-ui-react';
import { BsCashCoin } from 'react-icons/bs';
import * as Yup from 'yup';

interface AddRecordProps {
  onSubmit: (movimentacao: ITransaction) => void;
}

const AddMovimentacao: React.FC<AddRecordProps> = ({ onSubmit }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [movimentacao, setMovimentacao] = useState<ITransaction>({
    data: '',
    tipo: 'entrada',
    titulo: 'salario',
    descricao: '',
    valor: 0
  });
  const [errors, setErrors] = useState<Partial<ITransaction>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMovimentacao({ ...movimentacao, [name]: value });
  };

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
    })
  });

  const tipoOptions = [
    { key: 'entrada', text: 'Entrada', value: 'entrada' },
    { key: 'saida', text: 'Saída', value: 'saida' }
  ];

  const subtipoOptions =
    movimentacao.tipo === 'entrada'
      ? [
          { key: 'salario', text: 'Salário', value: 'salario' },
          { key: 'bonus', text: 'Bônus', value: 'bonus' },
          { key: 'outros', text: 'Outros', value: 'outros' }
        ]
      : [
          { key: 'aluguel', text: 'Aluguel', value: 'aluguel' },
          {
            key: 'contaEnergia',
            text: 'Conta de energia',
            value: 'conta de energia'
          },
          { key: 'outros', text: 'Outros', value: 'outros' }
        ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(movimentacao, { abortEarly: false });
      onSubmit(movimentacao);
      setMovimentacao({
        data: '',
        tipo: 'entrada',
        titulo: 'salario',
        descricao: '',
        valor: 0
      });
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
      {!showPopup ? (
        <S.Icone>
          <button onClick={() => setShowPopup(true)}>
            Adicionar Movimentação <BsCashCoin />
          </button>
        </S.Icone>
      ) : (
        <S.Content>
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

            <S.Flex>
              <Button type="submit">Adicionar Movimentação</Button>
              <Button type="button" onClick={() => setShowPopup(false)}>
                Fechar
              </Button>
            </S.Flex>
          </Form>
        </S.Content>
      )}
    </S.Container>
  );
};

export default AddMovimentacao;

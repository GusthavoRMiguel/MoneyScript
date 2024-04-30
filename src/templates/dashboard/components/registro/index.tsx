import React from 'react';
import { Dropdown, Form, Button, Modal, Checkbox } from 'semantic-ui-react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import ITransaction from '@/interfaces/ITransaction';
import useService from './service';

import * as S from './styles';

interface RegisterProps {
  onSubmit: (transaction: ITransaction) => void;
}

const RegisterTransaction: React.FC<RegisterProps> = ({ onSubmit }) => {
  const {
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
  } = useService({ onSubmit });

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
                value={transaction.data}
                onChange={handleInputChange}
              />
              {errors.data && <S.ErrorMessage>{errors.data}</S.ErrorMessage>}
            </Form.Field>

            <Form.Field error={!!errors.tipo}>
              <label>Tipo:</label>
              <Dropdown
                selection
                name="tipo"
                options={typeOptions}
                value={transaction.tipo}
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
                options={subtypeOptions}
                value={transaction.titulo}
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
                value={transaction.descricao}
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
                value={transaction.valor}
                onChange={handleInputChange}
              />
              {errors.valor && <S.ErrorMessage>{errors.valor}</S.ErrorMessage>}
            </Form.Field>

            <Form.Field>
              <Checkbox
                label="Recorrente"
                name="isRecorrente"
                checked={transaction.isRecorrente}
                onChange={handleCheckboxChange}
              />
              {transaction.isRecorrente && (
                <Dropdown
                  selection
                  name="recorrenciaMeses"
                  options={recurrenceOptions}
                  value={transaction.recorrenciaMeses}
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

export default RegisterTransaction;

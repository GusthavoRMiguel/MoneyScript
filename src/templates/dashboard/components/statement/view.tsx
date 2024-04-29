import React from 'react';
import * as S from './style';
import ITransaction from '@/interfaces/ITransaction';

import {
  FaRegTrashAlt,
  FaSortAmountDownAlt,
  FaSortAmountDown,
  FaRegEdit
} from 'react-icons/fa';

interface ViewProps {
  loading: boolean;
  sortedTransactions: ITransaction[];
  sortDirection: 'asc' | 'desc';
  handleSort: (field: 'valor' | 'data') => void;
  handleRemove: (id: string) => void;
  handleEdit: (id: string) => void;
  openConfirmation: boolean;
  openEditConfirmation: boolean;
  handleCancelEdit: () => void;
  handleConfirmEdit: () => void;
  handleCancelRemove: () => void;
  handleConfirmRemove: () => void;
}

const View: React.FC<ViewProps> = ({
  loading,
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
}) => {
  return (
    <S.Container>
      <S.Table>
        <thead>
          <S.TableRow>
            <S.TableHeader>
              <button onClick={() => handleSort('data')}>
                Data
                {sortDirection === 'asc' ? (
                  <FaSortAmountDownAlt />
                ) : (
                  <FaSortAmountDown />
                )}
              </button>
            </S.TableHeader>
            <S.TableHeader>Tipo</S.TableHeader>
            <S.TableHeader>Titulo</S.TableHeader>
            <S.TableHeader>Descrição</S.TableHeader>
            <S.TableHeader>
              <button onClick={() => handleSort('valor')}>
                Valor
                {sortDirection === 'asc' ? (
                  <FaSortAmountDownAlt />
                ) : (
                  <FaSortAmountDown />
                )}
              </button>
            </S.TableHeader>
            <S.TableHeader>Editar</S.TableHeader>
            <S.TableHeader>Remover</S.TableHeader>
          </S.TableRow>
        </thead>
        <tbody>
          {loading ? (
            <S.LoadingIcon />
          ) : (
            <>
              {sortedTransactions.length === 0 ? (
                <S.TableRow>
                  <S.TableData
                    colSpan={5}
                    style={{
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      padding: '5rem'
                    }}
                  >
                    Sem dados disponíveis
                  </S.TableData>
                </S.TableRow>
              ) : (
                sortedTransactions.map((transaction, index) => (
                  <S.TableRow
                    key={index}
                    className={
                      transaction.tipo === 'entrada' ? 'entrada' : 'saida'
                    }
                  >
                    <S.TableData>{transaction.data}</S.TableData>
                    <S.TableData>{transaction.tipo}</S.TableData>
                    <S.TableData>{transaction.titulo}</S.TableData>
                    <S.TableData>{transaction.descricao}</S.TableData>
                    <S.TableData>
                      R$ {transaction.valor?.toLocaleString('pt-br')}
                    </S.TableData>
                    <S.TableData>
                      <button onClick={() => handleEdit(transaction.id)}>
                        <FaRegEdit />
                      </button>
                      <S.CustomConfirm
                        header="Confirmar edição"
                        content="Tem certeza de que deseja editar esta transação?"
                        cancelButton="Cancelar"
                        confirmButton={{
                          content: 'Confirmar',
                          className: 'custom-confirm-button'
                        }}
                        open={openEditConfirmation}
                        onCancel={handleCancelEdit}
                        onConfirm={handleConfirmEdit}
                      />
                    </S.TableData>
                    <S.TableData>
                      <button onClick={() => handleRemove(transaction.id)}>
                        <FaRegTrashAlt />
                      </button>
                      <S.CustomConfirm
                        header="Confirmar exclusão"
                        content="Tem certeza de que deseja excluir esta transação?"
                        cancelButton="Cancelar"
                        confirmButton={{
                          content: 'Confirmar',
                          className: 'custom-confirm-button'
                        }}
                        open={openConfirmation}
                        onCancel={handleCancelRemove}
                        onConfirm={handleConfirmRemove}
                      />
                    </S.TableData>
                  </S.TableRow>
                ))
              )}
            </>
          )}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default View;

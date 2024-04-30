import React from 'react';
import {
  FaRegTrashAlt,
  FaSortAmountDownAlt,
  FaSortAmountDown,
  FaRegEdit
} from 'react-icons/fa';
import * as S from './style';
import ITransaction from '@/interfaces/ITransaction';
import useService from './service';
import { formatDate } from '@/utils/dateFormatter';

interface StatementProps {
  transactions: ITransaction[];
  loading: boolean;
  dataUpdate: () => void;
}

const Statement: React.FC<StatementProps> = ({
  transactions,
  loading,
  dataUpdate
}) => {
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
  } = useService({ transactions, loading, dataUpdate });

  return (
    <S.Container className={loading ? 'loading' : ''}>
      {loading ? (
        <S.LoadingIcon />
      ) : (
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
            {sortedTransactions.length === 0 ? (
              <S.TableRow>
                <S.TableData colSpan={7} className="noData">
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
                  <S.TableData>{formatDate(transaction.data)}</S.TableData>
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
          </tbody>
        </S.Table>
      )}
    </S.Container>
  );
};

export default Statement;

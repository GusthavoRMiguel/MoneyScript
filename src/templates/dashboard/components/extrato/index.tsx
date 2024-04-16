import React, { useState, useEffect } from 'react';
import * as S from './style';
import ITransaction from '@/interfaces/ITransaction';

import { useDB } from '@/hooks/Database';
import {
  FaRegTrashAlt,
  FaSortAmountDownAlt,
  FaSortAmountDown
} from 'react-icons/fa';

interface ExtratoProps {
  movimentacoes: ITransaction[];
  loading: boolean;
}

const Extrato: React.FC<ExtratoProps> = ({ movimentacoes, loading }) => {
  const { removeTransaction, getTransactionsByFilter } = useDB();

  const [sortedMovimentacoes, setSortedMovimentacoes] = useState<
    ITransaction[]
  >([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'valor' | 'data'>('data');

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [transactionToRemove, setTransactionToRemove] = useState<string>('');

  useEffect(() => {
    sortMovimentacoes(sortBy);
  }, [movimentacoes, sortBy, sortDirection]);

  const sortMovimentacoes = (sortField: 'valor' | 'data') => {
    const sortedList: ITransaction[] = [...movimentacoes];

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

    setSortedMovimentacoes(sortedList);
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

  const handleConfirmRemove = async () => {
    try {
      await removeTransaction(transactionToRemove);
      const updatedTransactions = await getTransactionsByFilter({
        dataInicial: '',
        dataFinal: ''
      });
      setSortedMovimentacoes(updatedTransactions);
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error removing transaction:', error);
    }
  };

  const handleCancelRemove = () => {
    setOpenConfirmation(false);
    setTransactionToRemove('');
  };
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
            <S.TableHeader>Remover</S.TableHeader>
          </S.TableRow>
        </thead>
        <tbody>
          {loading ? (
            <S.LoadingIcon />
          ) : (
            <>
              {sortedMovimentacoes.length === 0 ? (
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
                sortedMovimentacoes.map((movimentacao, index) => (
                  <S.TableRow
                    key={index}
                    className={
                      movimentacao.tipo === 'entrada' ? 'entrada' : 'saida'
                    }
                  >
                    <S.TableData>{movimentacao.data}</S.TableData>
                    <S.TableData>{movimentacao.tipo}</S.TableData>
                    <S.TableData>{movimentacao.titulo}</S.TableData>
                    <S.TableData>{movimentacao.descricao}</S.TableData>
                    <S.TableData>
                      R$ {movimentacao.valor?.toLocaleString('pt-br')}
                    </S.TableData>
                    <S.TableData>
                      <button onClick={() => handleRemove(movimentacao.id)}>
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

export default Extrato;

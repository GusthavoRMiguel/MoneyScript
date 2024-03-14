'use client';
import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { useDB } from '@/hooks/Database';
import ITransactionFilter from '@/interfaces/ITransactionFilter';
import ITransaction from '@/interfaces/ITransaction';

import Menu from '@/components/menu';
import Filtro from './components/filtro';
import Calendario from './components/calendario';
import Grafico from './components/grafico';
import Extrato from './components/extrato';
import AddMovimentacao from './components/registro';

const DashboardPage: React.FC = () => {
  const { getTransactionsByFilter, addTransaction } = useDB();
  const [movimentacoes, setMovimentacoes] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<ITransactionFilter>({
    dataInicial: '',
    dataFinal: '',
    tipo: '',
    titulo: ''
  });

  const handleApplyFilter = async (filtros: ITransactionFilter) => {
    setLoading(true);
    try {
      const transactions = await getTransactionsByFilter(filtros);
      setMovimentacoes(transactions);
      setFilterOptions(filtros);
      console.log('handleChamado', filtros);
    } catch (error) {
      console.error('Erro ao filtrar movimentações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (movimentacao: ITransaction) => {
    setLoading(true);
    try {
      const { success } = await addTransaction(movimentacao);
      if (success) {
        await handleApplyFilter(filterOptions);
      }
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getDefaultTransactions = async () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;

      const defaultFilterOptions: ITransactionFilter = {
        dataInicial: `${year}-${formattedMonth}-01`,
        dataFinal: `${year}-${formattedMonth}-31`
      };

      await handleApplyFilter(defaultFilterOptions);
    };

    getDefaultTransactions();
  }, [getTransactionsByFilter]);

  return (
    <S.Container>
      <Menu />

      <S.Content>
        <S.SideBar>
          <Filtro onApplyFilter={handleApplyFilter} />
          <AddMovimentacao onSubmit={handleAddTransaction} />
        </S.SideBar>
        <S.Flex>
          <Calendario movimentacoes={movimentacoes} loading={loading} />
          <Grafico movimentacoes={movimentacoes} loading={loading} />{' '}
          <Extrato movimentacoes={movimentacoes} loading={loading} />
        </S.Flex>
      </S.Content>
    </S.Container>
  );
};

export default DashboardPage;

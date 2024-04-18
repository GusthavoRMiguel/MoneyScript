import React from 'react';
import {
  BarChart,
  Tooltip,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import * as S from './style';
import ITransaction from '@/interfaces/ITransaction';
import { formatDate } from '@/utils/dateFormatter';

interface GraphProps {
  movimentacoes: ITransaction[];
  loading: boolean;
}

const Grafico: React.FC<GraphProps> = ({ movimentacoes, loading }) => {
  const renderTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const details = payload[0].payload as { data: string; valor: number };

      const transactionsOnDate = movimentacoes.filter(
        (movimentacao) => movimentacao.data === details.data
      );

      const totalValue = transactionsOnDate.reduce(
        (total, movimentacao) => total + Number(movimentacao.valor),
        0
      );

      return (
        <S.TooltipContainer>
          <h1>
            Data:<span>{formatDate(details.data)}</span>
          </h1>
          {transactionsOnDate.map((movimentacao, index) => (
            <div
              key={index}
              className={
                movimentacao.valor !== undefined && movimentacao.valor < 0
                  ? 'saida'
                  : 'entrada'
              }
            >
              <p>Valor: R$ {movimentacao.valor?.toLocaleString('pt-br')}</p>
              <p>Tipo: {movimentacao.tipo}</p>
              <p>Título: {movimentacao.titulo}</p>
              {movimentacao.descricao !== '' && (
                <p>Descrição: {movimentacao.descricao}</p>
              )}
            </div>
          ))}
          <h2>Total: R$ {totalValue.toLocaleString('pt-br')}</h2>
        </S.TooltipContainer>
      );
    }
    return null;
  };

  const groupDataByDate = movimentacoes.reduce((acc: any, movimentacao) => {
    const { data, valor } = movimentacao;
    const existingItemIndex = acc.findIndex((item: any) => item.data === data);

    if (existingItemIndex !== -1) {
      acc[existingItemIndex].valor += Number(valor);
    } else {
      acc.push({
        data,
        valor: Number(valor)
      });
    }

    return acc;
  }, []);

  // Ordena os dados pela data
  const sortedData = groupDataByDate.sort((a: any, b: any) => {
    const dateA = new Date(a.data);
    const dateB = new Date(b.data);
    return dateA.getTime() - dateB.getTime();
  });

  const coloredData = sortedData.map((item: any) => {
    return {
      ...item,
      fill: item.valor > 0 ? '#2eed2eb3' : '#db2828cc'
    };
  });

  return (
    <S.Container>
      <S.Content>
        {loading ? (
          <S.LoadingIcon />
        ) : coloredData.length === 0 ? (
          <S.ErrorMessage>Sem dados disponíveis</S.ErrorMessage>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              style={{ zIndex: 1 }}
              data={coloredData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="data"
                tickFormatter={(tickItem) => formatDate(tickItem)}
              />
              <YAxis tickCount={10} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={renderTooltip} />
              <Bar dataKey="valor" barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Grafico;

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
        (total, movimentacao) =>
          movimentacao.tipo === 'saida'
            ? total - Number(movimentacao.valor)
            : total + Number(movimentacao.valor),
        0
      );
      return (
        <S.TooltipContainer>
          <h1>
            Data:<span>{details.data}</span>
          </h1>
          {transactionsOnDate.map((movimentacao, index) => (
            <div
              key={index}
              className={movimentacao.tipo === 'entrada' ? 'entrada' : 'saida'}
            >
              <p>Valor: R$ {movimentacao.valor}</p>
              <p>Tipo: {movimentacao.tipo}</p>
              <p>Título: {movimentacao.titulo}</p>

              {movimentacao.descricao !== '' && (
                <p>Descrição: {movimentacao.descricao}</p>
              )}
            </div>
          ))}
          <h2>Total: R$ {totalValue}</h2>
        </S.TooltipContainer>
      );
    }
    return null;
  };

  const groupDataByDate = movimentacoes.reduce((acc: any, movimentacao) => {
    const { data, valor } = movimentacao;
    const existingItem = acc.find((item: any) => item.data === data);

    if (existingItem) {
      existingItem.valor += Number(valor);
      existingItem.tipo.push(movimentacao.tipo); // Adiciona o tipo à lista
    } else {
      acc.push({ data, valor: Number(valor), tipo: [movimentacao.tipo] });
    }

    return acc;
  }, []);

  const calculateFillColor = (movimentacoes: ITransaction[]): string => {
    const totalValue = movimentacoes.reduce(
      (total, movimentacao) =>
        movimentacao.tipo === 'saida'
          ? total - Number(movimentacao.valor)
          : total + Number(movimentacao.valor),
      0
    );

    return totalValue >= 0 ? '#2eed2eb3' : '#db2828cc';
  };

  const fillColor = calculateFillColor(movimentacoes);
  return (
    <S.Container>
      <S.Content>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={groupDataByDate}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="data" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={renderTooltip} />
            <Bar dataKey="valor" stroke="#8884d8" fill={fillColor} />
          </BarChart>
        </ResponsiveContainer>
      </S.Content>
    </S.Container>
  );
};

export default Grafico;

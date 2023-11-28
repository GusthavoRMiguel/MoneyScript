import React from 'react';
import * as S from './style';
import ITransaction from '@/interfaces/ITransaction';

interface ExtratoProps {
  movimentacoes: ITransaction[];
  loading: boolean;
}

const Extrato: React.FC<ExtratoProps> = ({ movimentacoes, loading }) => {
  return (
    <S.Container>
      <S.Table>
        <thead>
          <S.TableRow>
            <S.TableHeader>Tipo</S.TableHeader>
            <S.TableHeader>Nome</S.TableHeader>
            <S.TableHeader>Descrição</S.TableHeader>
            <S.TableHeader>Valor</S.TableHeader>
            <S.TableHeader>Data</S.TableHeader>
          </S.TableRow>
        </thead>
        <tbody>
          {movimentacoes.length === 0 ? (
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
            movimentacoes.map((movimentacao, index) => (
              <S.TableRow
                key={index}
                className={
                  movimentacao.tipo === 'entrada' ? 'entrada' : 'saida'
                }
              >
                <S.TableData>{movimentacao.tipo}</S.TableData>
                <S.TableData>{movimentacao.titulo}</S.TableData>
                <S.TableData>{movimentacao.descricao}</S.TableData>
                <S.TableData>R$ {movimentacao.valor}</S.TableData>
                <S.TableData>{movimentacao.data}</S.TableData>
              </S.TableRow>
            ))
          )}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default Extrato;

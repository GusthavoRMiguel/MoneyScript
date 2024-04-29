import React from 'react';
import * as S from './styles';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import CalendaryHeader from '../headerCalendario';
import RegisterTransaction from '../registro';
import CalendarioAnual from './components/calendarioAnual';
import CalendarioMensal from './components/calendarioMensal';
import Grafico from '../../components/grafico';
import Statement from '../statement';
import ITransaction from '@/interfaces/ITransaction';

interface ViewProps {
  dashAnual: boolean;
  currentDate: Date;
  selectedDate: string;
  selectedYear: number;
  transactions: ITransaction[];
  saldoAtual: number;
  saldoGeral: number;
  projecaoAnual: number;
  loading: boolean;
  isBalanceHidden: boolean;
  isBalanceAtualHidden: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  handleDateChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleYearChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleAddTransaction: (transaction: ITransaction) => void;
  toggleView: () => void;
  toggleAtualView: () => void;
  formatBalanceToPassword: (balance: number) => string;
}

const View: React.FC<ViewProps> = ({
  dashAnual,
  currentDate,
  selectedDate,
  selectedYear,
  transactions,
  saldoAtual,
  saldoGeral,
  projecaoAnual,
  loading,
  isBalanceHidden,
  isBalanceAtualHidden,
  handlePrevious,
  handleNext,
  handleDateChange,
  handleYearChange,
  handleAddTransaction,
  toggleView,
  toggleAtualView,
  formatBalanceToPassword
}) => {
  return (
    <S.Container>
      <CalendaryHeader
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        year={dashAnual}
        selected={dashAnual ? selectedYear : selectedDate}
        handleChange={dashAnual ? handleYearChange : handleDateChange}
      />

      <S.Content>
        <S.Flex>
          {dashAnual ? (
            <>
              {isBalanceAtualHidden ? (
                <S.Saldo>
                  <h1>Saldo mês atual:</h1>
                  <span>R$ {formatBalanceToPassword(saldoGeral)}</span>
                  <button type="button" onClick={toggleAtualView}>
                    <BsFillEyeSlashFill />
                  </button>
                </S.Saldo>
              ) : (
                <S.Saldo>
                  <h1>Saldo mês atual:</h1>
                  <span>R$ {saldoGeral.toLocaleString('pt-Br')}</span>
                  <button type="button" onClick={toggleAtualView}>
                    <BsFillEyeFill />
                  </button>
                </S.Saldo>
              )}
              {isBalanceHidden ? (
                <S.Saldo>
                  <h1>Projeção anual:</h1>
                  <span>R$ {formatBalanceToPassword(projecaoAnual)}</span>
                  <button type="button" onClick={toggleView}>
                    <BsFillEyeSlashFill />
                  </button>
                </S.Saldo>
              ) : (
                <S.Saldo>
                  <h1>Projeção anual:</h1>
                  <span>R$ {projecaoAnual.toLocaleString('pt-Br')}</span>
                  <button type="button" onClick={toggleView}>
                    <BsFillEyeFill />
                  </button>
                </S.Saldo>
              )}
            </>
          ) : (
            <>
              {isBalanceAtualHidden ? (
                <S.Saldo>
                  <h1>Saldo deste mês:</h1>
                  <span>R$ {formatBalanceToPassword(saldoAtual)}</span>
                  <button type="button" onClick={toggleAtualView}>
                    <BsFillEyeSlashFill />
                  </button>
                </S.Saldo>
              ) : (
                <S.Saldo>
                  <h1>Saldo deste mês:</h1>
                  <span>R$ {saldoAtual.toLocaleString('pt-Br')}</span>
                  <button type="button" onClick={toggleAtualView}>
                    <BsFillEyeFill />
                  </button>
                </S.Saldo>
              )}
              {isBalanceHidden ? (
                <S.Saldo>
                  <h1>Saldo geral:</h1>
                  <span>R$ {formatBalanceToPassword(saldoGeral)}</span>
                  <button type="button" onClick={toggleView}>
                    <BsFillEyeSlashFill />
                  </button>
                </S.Saldo>
              ) : (
                <S.Saldo>
                  <h1>Saldo geral:</h1>
                  <span>R$ {saldoGeral.toLocaleString('pt-Br')}</span>
                  <button type="button" onClick={toggleView}>
                    <BsFillEyeFill />
                  </button>
                </S.Saldo>
              )}
            </>
          )}
          <RegisterTransaction onSubmit={handleAddTransaction} />
        </S.Flex>
        <S.Flex>
          {dashAnual ? (
            <CalendarioAnual
              transactions={transactions}
              loading={loading}
              currentYear={currentDate.getFullYear()}
            />
          ) : (
            <CalendarioMensal
              currentDate={currentDate}
              loading={loading}
              movimentacoes={transactions}
            />
          )}
          <Grafico transactions={transactions} loading={loading} />
        </S.Flex>
        <S.Flex>
          <Statement transactions={transactions} loading={loading} />
        </S.Flex>
      </S.Content>
    </S.Container>
  );
};

export default View;

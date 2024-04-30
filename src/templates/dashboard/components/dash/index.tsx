import React from 'react';
import * as S from './styles';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import CalendaryHeader from '../headerCalendario';
import RegisterTransaction from '../registro';
import CalendarioAnual from './components/calendarioAnual';
import CalendarioMensal from './components/calendarioMensal';
import Grafico from '../../components/grafico';
import Statement from '../statement';
import useService from './service';

interface DashProps {
  dashAnual: boolean;
}

const Dash: React.FC<DashProps> = ({ dashAnual }) => {
  const {
    currentDate,
    selectedDate,
    transactions,
    saldoAtual,
    saldoGeral,
    projecaoAnual,
    loading,
    isBalanceHidden,
    isBalanceAtualHidden,
    isProjectedBalanceHidden,
    handlePrevious,
    handleNext,
    handleDateChange,
    handleYearChange,
    handleAddTransaction,
    toggleView,
    toggleAtualView,
    toggleProjectedView,
    formatBalanceToPassword,
    handleDataUpdate,
    selectedYear
  } = useService(dashAnual);

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
          {isBalanceAtualHidden ? (
            <S.Saldo>
              <h1>Saldo atual:</h1>
              <span>R$ {formatBalanceToPassword(saldoAtual)}</span>
              <button type="button" onClick={toggleAtualView}>
                <BsFillEyeSlashFill />
              </button>
            </S.Saldo>
          ) : (
            <S.Saldo>
              <h1>Saldo atual:</h1>
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

          {isProjectedBalanceHidden ? (
            <S.Saldo>
              <h1>Projeção anual:</h1>
              <span>R$ {formatBalanceToPassword(projecaoAnual)}</span>
              <button type="button" onClick={toggleProjectedView}>
                <BsFillEyeSlashFill />
              </button>
            </S.Saldo>
          ) : (
            <S.Saldo>
              <h1>Projeção anual:</h1>
              <span>R$ {projecaoAnual.toLocaleString('pt-Br')}</span>
              <button type="button" onClick={toggleProjectedView}>
                <BsFillEyeFill />
              </button>
            </S.Saldo>
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
          <Statement
            transactions={transactions}
            loading={loading}
            dataUpdate={handleDataUpdate}
          />
        </S.Flex>
      </S.Content>
    </S.Container>
  );
};

export default Dash;

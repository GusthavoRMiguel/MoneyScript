import React, { useState } from 'react';
import * as S from './style';
import ITransaction from '@/interfaces/ITransaction';

interface TableProps {
  movimentacoes: ITransaction[];
  loading: boolean;
}

const Tabela: React.FC<TableProps> = ({ movimentacoes, loading }) => {
  const [selectedDay, setSelectedDay] = useState<string>('');

  const renderDays = () => {
    // Lógica para renderizar os dias do calendário
    // Vamos simular com um array para representar os dias
    const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);

    return daysArray.map((day) => (
      <div
        key={day}
        onClick={() => handleDayClick(day)}
        style={{
          cursor: 'pointer',
          border: '1px solid #ccc',
          margin: '2px',
          padding: '5px'
        }}
      >
        {day}
      </div>
    ));
  };

  const calculateBlockBalance = () => {
    // Lógica para calcular o saldo dos blocos do calendário
    // Aqui, simularemos um saldo aleatório para demonstração
    return Math.random() > 0.5 ? 'positivo' : 'negativo';
  };

  const handleDayClick = (day: number) => {
    // Lógica para abrir o popup com detalhes da movimentação do dia
    setSelectedDay(`Detalhes do dia ${day}`);
  };

  return (
    <S.Container>
      <div>
        {/* Botões para navegação por dias, semanas, meses ou anos */}
        <div>
          <button>Dias</button>
          <button>Semanas</button>
          <button>Meses</button>
          <button>Anos</button>
        </div>

        {/* Blocos do calendário */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '5px',
            marginTop: '20px'
          }}
        >
          {renderDays()}
        </div>

        {/* Popup com detalhes do dia */}
        {selectedDay && (
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginTop: '20px'
            }}
          >
            {selectedDay}
          </div>
        )}
      </div>
    </S.Container>
  );
};

export default Tabela;

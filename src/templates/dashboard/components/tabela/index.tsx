import React, { useState } from 'react';
import * as S from './style';
import ITransaction from '@/interfaces/ITransaction';
import { IoIosCloseCircle } from 'react-icons/io';

interface TableProps {
  movimentacoes: ITransaction[];
  loading: boolean;
}

const Tabela: React.FC<TableProps> = ({ movimentacoes, loading }) => {
  const [selectedDay, setSelectedDay] = useState<string>('');

  const renderDays = () => {
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
    return Math.random() > 0.5 ? 'positivo' : 'negativo';
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(`Detalhes do dia ${day}`);
  };

  return (
    <S.Container>
      <div>
        <div>
          <button>Mês Atual</button>
        </div>

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

        {selectedDay && (
          <S.PopupOverlay onClick={() => setSelectedDay('')}>
            <S.Popup>
              <button onClick={() => setSelectedDay('')}>
                <IoIosCloseCircle size={20} />
              </button>
              <div> {selectedDay}</div>
            </S.Popup>
          </S.PopupOverlay>
        )}
      </div>
    </S.Container>
  );
};

export default Tabela;

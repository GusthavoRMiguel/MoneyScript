import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Button,
  SelectContainer,
  IconContainer,
  Dropdown,
  SelectedValue
} from './styles';
import { FaRegCalendarAlt } from 'react-icons/fa';

interface HeaderCalendarioProps {
  handlePrevious: () => void;
  handleNext: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  selected: string | number;
  type?: string;
  year?: boolean;
}

const HeaderCalendario: React.FC<HeaderCalendarioProps> = ({
  handlePrevious,
  handleNext,
  handleChange,
  selected,
  type = 'text',
  year
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleYearSelection = (year: number) => {
    handleChange({ target: { value: year } } as any);
    setDropdownVisible(false);
  };

  const renderInput = () => {
    if (type === 'date') {
      return <input type={type} value={selected} onChange={handleChange} />;
    }

    if (year) {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 10;
      const endYear = currentYear + 10;
      const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
      );

      return (
        <SelectContainer onClick={toggleDropdown}>
          {' '}
          <SelectedValue>{selected}</SelectedValue>
          <IconContainer>
            <FaRegCalendarAlt />
          </IconContainer>
          {dropdownVisible && (
            <Dropdown ref={dropdownRef}>
              {years.map((year) => (
                <div key={year} onClick={() => handleYearSelection(year)}>
                  {year}
                </div>
              ))}
            </Dropdown>
          )}
        </SelectContainer>
      );
    }

    return <input type={type} value={selected} onChange={handleChange} />;
  };

  return (
    <Container>
      <Button onClick={handlePrevious}>Anterior</Button>
      {renderInput()}
      <Button onClick={handleNext}>Próximo</Button>
    </Container>
  );
};

export default HeaderCalendario;

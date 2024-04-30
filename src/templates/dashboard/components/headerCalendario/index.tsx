import React from 'react';
import {
  Container,
  Button,
  IconContainer,
  Dropdown,
  SelectedValue,
  SelectContainer
} from './styles';
import { FaRegCalendarAlt } from 'react-icons/fa';
import useService from './service';

interface CalendaryProps {
  handlePrevious: () => void;
  handleNext: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  selected: string | number;
  year?: boolean;
}

const CalendaryHeader: React.FC<CalendaryProps> = ({
  handlePrevious,
  handleNext,
  handleChange,
  selected,
  year
}) => {
  const {
    dropdownVisible,
    dropdownRef,
    years,
    toggleDropdown,
    handleYearSelection
  } = useService({
    handlePrevious,
    handleNext,
    handleChange,
    selected,
    year
  });
  return (
    <Container>
      <Button onClick={handlePrevious}>Anterior</Button>
      {year ? (
        <SelectContainer onClick={toggleDropdown}>
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
      ) : (
        <input type="month" value={selected} onChange={handleChange} />
      )}
      <Button onClick={handleNext}>Próximo</Button>
    </Container>
  );
};

export default CalendaryHeader;

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

interface ViewProps {
  selected: string | number;
  year?: boolean;
  dropdownVisible: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  years: number[];
  toggleDropdown: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleYearSelection: (year: number) => void;
}

const View: React.FC<ViewProps> = ({
  selected,

  year,
  dropdownVisible,
  dropdownRef,
  years,
  toggleDropdown,
  handlePrevious,
  handleNext,
  handleChange,
  handleYearSelection
}) => {
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

export default View;

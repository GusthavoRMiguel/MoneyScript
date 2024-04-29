import React from 'react';

import View from './view';
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
    <View
      selected={selected}
      year={year}
      dropdownVisible={dropdownVisible}
      dropdownRef={dropdownRef}
      years={years}
      toggleDropdown={toggleDropdown}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      handleChange={handleChange}
      handleYearSelection={handleYearSelection}
    />
  );
};

export default CalendaryHeader;

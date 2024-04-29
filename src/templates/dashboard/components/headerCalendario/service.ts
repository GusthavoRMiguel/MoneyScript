import React, { useState, useRef, useEffect } from 'react';

interface ServiceProps {
  handlePrevious: () => void;
  handleNext: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  selected: string | number;
  year?: boolean;
}

const useService = ({
  handlePrevious,
  handleNext,
  handleChange,
  selected,
  year
}: ServiceProps) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [years, setYears] = useState<number[]>([]);

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

  const handleYearSelection = (selectedYear: number) => {
    handleChange({ target: { value: selectedYear } } as any);
    setDropdownVisible(false);
  };

  useEffect(() => {
    if (year) {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 10;
      const endYear = currentYear + 10;
      const yearsArray = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
      );
      setYears(yearsArray);
    }
  }, [year]);

  return {
    selected,
    year,
    dropdownVisible,
    dropdownRef,
    years,
    toggleDropdown,
    handleYearSelection,
    handlePrevious,
    handleNext,
    handleChange
  };
};

export default useService;

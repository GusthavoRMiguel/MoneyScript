import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${theme.colors.whiteGhost};

  input {
    text-transform: capitalize;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    border: solid 1px;
    border-radius: 10px;
    padding: 5px;
    cursor: pointer;
    background-color: ${theme.colors.whiteSnow};
  }

  @media (max-width: 640px) {
    input {
      font-size: 16px;
      max-width: 155px;
      text-align: start;
    }
  }
`;

export const SelectContainer = styled.div`
  position: relative;
  text-transform: capitalize;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: solid 1px;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  background-color: ${theme.colors.whiteSnow};
  width: 250px;

  @media (max-width: 640px) {
    width: 130px;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const SelectedValue = styled.div`
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #aaa;
  }

  svg {
    margin-left: 8px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  div {
    padding: 7px 7px;
    border: solid 1px;
    cursor: pointer;
    border-radius: 7px;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  @media (max-width: 640px) {
    font-size: 10px;
  }
`;

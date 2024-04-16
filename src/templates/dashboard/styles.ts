import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
  height: auto;
`;

export const CalendarHeader = styled.div`
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
    border: none;
    cursor: pointer;
    background-color: ${theme.colors.whiteSnow};
  }

  @media (max-width: 640px) {
    input {
      font-size: 16px;
    }
  }
`;

export const CalendarButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  @media (max-width: 640px) {
    font-size: 10px;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  gap: 10px;
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  align-items: center;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const Saldo = styled.div`
  display: flex;
  gap: 10px;
  margin-right: auto;
  align-items: baseline;

  span {
    font-size: 2rem;
  }

  button {
    background-color: transparent;
    border: none;

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

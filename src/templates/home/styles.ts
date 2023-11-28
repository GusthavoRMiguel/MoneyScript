import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.main`
  .colored:nth-child(1) {
    background-color: #8b8b8b;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
  }
  .colored:nth-child(2) {
    background-color: #a5a5a5;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
  }
  .colored:nth-child(3) {
    background-color: #adadad;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
  }

  .colored:nth-child(4) {
    background: linear-gradient(to bottom, #e5e5e5 0, #e5e5e5 92%, white 8%);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
  }

  @media (max-width: 620px) {
    .colored:nth-child(4) {
      background: linear-gradient(to bottom, #e5e5e5 0, #e5e5e5 85%, white 15%);
      background-size: cover;
      background-repeat: no-repeat;
      background-position-x: center;
    }
  }
`;

export const Spacer = styled.div`
  height: 8vh;
  background-color: ${theme.colors.blackQuantum};
  z-index: 2;

  @media (max-width: 620px) {
    height: 14vh;
  }
`;

import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
  position: sticky;
  width: 100vw;
  max-width: 100%;
  height: 6vh;
  z-index: ${theme.layers.menu};
  top: 0;
  background-color: ${theme.colors.gray_500};
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: center;
  background-color: transparent;
  color: ${theme.colors.white};
  height: 100%;
  width: 100vw;
  padding-inline: 1rem;
`;

export const BoxLogo = styled.div`
  margin-left: 2rem;
  margin-right: auto;
  display: flex;

  img {
    height: 5vh;
  }
`;

export const BoxIcon = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  > button {
    border: none;
    color: ${theme.colors.gray_50};
    background-color: transparent;
  }
  > button:hover {
    color: ${theme.colors.green};
  }
`;

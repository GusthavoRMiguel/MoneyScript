import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
  width: 50%;
  height: 50vh;
  border: solid 1px ${theme.colors.blackQuantum};
  @media (max-width: 640px) {
    width: 100%;
    height: auto;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PopupOverlay = styled.div`
  position: absolute;
  z-index: ${theme.layers.modal};
  background-color: ${theme.colors.overlay};
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

export const Popup = styled.div`
  position: absolute;
  z-index: ${theme.layers.alwaysOnTop};
  background-color: ${theme.colors.whiteGhost};
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  button {
    margin-left: auto;
    margin-right: 0.25%;
    margin-top: 0.25%;
    background-color: transparent;
    border: none;
  }
  div {
    display: flex;
    align-self: center;
  }
`;

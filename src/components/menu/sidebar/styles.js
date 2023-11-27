import styled from 'styled-components';
import theme from '../../../styles/theme';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-40vw')};
  height: 100%;
  width: 60vw;
  background-color: ${theme.colors.whiteSnow};
  box-shadow: ${theme.box.shadow};
  transition: right ${theme.transition.default};
  z-index: ${theme.layers.modal};
  justify-content: center;
  align-items: left;
  text-align: justify;
  display: flex;
  flex-direction: column;
  @media (min-width: 1200px) {
    width: 20vw;
  }
  @media (min-width: 1600px) {
    width: 15vw;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background-color: ${theme.colors.overlay};
  z-index: ${theme.layers.overlay};
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.blackQuantum};
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  position: absolute;
  right: 1vw;
  top: 1vh;

  &:hover {
    color: ${theme.colors.black};
  }
  > svg {
    width: 20px;
    height: 20px;
  }
  > svg:hover {
    background-color: transparent;
    border-radius: 20px;
    opacity: 0.5;
  }
`;
export const Links = styled.div`
  display: flex;
  flex-direction: column;

  > button,
  a {
    border: none;
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
    color: ${theme.colors.gray_300};
    font-weight: 600;
    text-decoration: none;
    font-size: 0.95rem;
    margin-bottom: 20px;
    transition: color 0.3s ease;
    cursor: pointer;
    padding-left: 2rem;
    padding-bottom: 3px;
    padding-top: 3px;
    background: linear-gradient(
      90deg,
      ${theme.colors.white} 0%,
      ${theme.colors.gray_50} 15%,
      ${theme.colors.gray_50} 50%,
      ${theme.colors.gray_50} 85%,
      ${theme.colors.white} 100%
    );
  }
  > button:hover,
  a:hover {
    background: linear-gradient(
      90deg,
      ${theme.colors.white} 0%,
      ${theme.colors.gray_300} 15%,
      ${theme.colors.gray_300} 50%,
      ${theme.colors.gray_300} 85%,
      ${theme.colors.white} 100%
    );

    font-weight: bolder;
    border: 20px 20px;
    color: ${theme.colors.white};
  }
`;

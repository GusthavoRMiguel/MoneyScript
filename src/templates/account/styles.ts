import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.main`
  background-color: ${theme.colors.whiteGhost};
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const SideBar = styled.div`
  width: 20%;
  border: solid 0.5px ${theme.colors.gray_100};
  height: 94vh;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;

export const SideButton = styled.button`
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

  &:hover {
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

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Heading = styled.div`
  width: 100%;
  border-bottom: solid 0.5px ${theme.colors.gray_100};
  height: 100%;
  display: flex;
  padding: 1rem;
  gap: 10px;
`;

export const Avatar = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 10px;
  border: solid 1px ${theme.colors.gray_50};

  img,
  svg {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h1 {
    margin-top: auto;
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1rem;
  }
`;

export const Link = styled.div`
  margin-left: auto;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: solid 1px ${theme.colors.gray_300};
  border-radius: 10px;
  gap: 10px;

  h1 {
    font-size: 1rem;
    align-self: center;
  }

  div {
    display: flex;
    gap: 30px;
  }

  div button {
    background-color: transparent;
    border: none;
  }

  div button svg.verify {
    color: ${theme.colors.green};
  }
`;

export const Body = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const Option = styled.div`
  display: flex;
  border: solid 1px ${theme.colors.gray_300};
  border-radius: 8px;
  width: 100%;
  padding: 0.5rem;
  gap: 10px;

  label {
    font-size: 1.5rem;
    font-weight: 700;
  }

  div {
    display: flex;
    gap: 5px;
  }

  div span {
    font-size: 1.5rem;
  }

  div button {
    background-color: transparent;
    border: none;
  }
`;

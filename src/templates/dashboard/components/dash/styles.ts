import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  min-height: 100%;
  height: auto;
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

  h1,
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

  @media (max-width: 640px) {
    h1,
    span {
      font-size: 1.5rem;
    }

    button {
      svg {
        width: 10px;
        height: 10px;
      }
    }
  }
`;

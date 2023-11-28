import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TooltipContainer = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 1rem;
  }

  h1 span {
    font-weight: 100;
    margin-left: 4px;
  }
  h2 {
    font-size: 0.9rem;
  }

  div {
    margin-bottom: 2px;
    margin-top: 2px;
  }
  div.entrada {
    background-color: #2eed2eb3;
    color: white;
    padding: 0.5rem;
  }
  div.saida {
    background-color: #db2828cc;
    color: white;
    padding: 0.5rem;
  }
`;

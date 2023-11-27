import styled from 'styled-components';

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  display: flex;
  place-content: center;
  align-items: center;

  form.flexForm {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    min-width: 430px;
    border-color: skyblue;
    background-color: white;
  }
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  border: solid 1px #ccc;
  padding: 10px;
  border-radius: 8px;
  justify-content: space-around;
`;

export const IconButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

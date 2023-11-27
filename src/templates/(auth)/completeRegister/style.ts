import styled from "styled-components";

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

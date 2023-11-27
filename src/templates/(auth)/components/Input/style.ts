import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.div`
  text-transform: capitalize;

  > span {
    color: red;
  }
`;

export const InputBox = styled.div`
  width: 100%;

  input.field {
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    border: solid 1px gray;
    outline: 0;
  }
  &input.fieldPass,
  &input.field:focus {
    border-color: blue;
  }

  input.fieldPass {
    width: 85%;
    padding: 8px;
    border-radius: 8px;
    border: solid 1px gray;
    outline: 0;
  }

  button.btn {
    background-color: transparent;
    margin-left: 10px;
  }
`;

export const ErrorBox = styled.div`
  color: red;
  margin-top: 4px;
`;

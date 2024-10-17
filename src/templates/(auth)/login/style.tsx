import styled from 'styled-components';

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  display: flex;
  place-content: center;
  align-items: center;
  overflow-y: hidden;

  form.flexForm {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    min-width: 430px;
    border: solid 1px #afafaf;
    box-shadow: 0px 0px 20px 10px #afafaf;
    background-color: white;
  }

  @media (max-width: 620px) {
    form.flexForm {
      min-width: 90%;
      margin-bottom: 5rem;
    }
  }
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  border: solid 1px #ccc;
  padding: 10px;
  border-radius: 8px;
  justify-content: space-around;
  gap: 5px;
`;

export const IconButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    font-size: 0.8rem;
  }

  @media (max-width: 620px) {
    gap: 10px;
    p {
      font-size: 0.6rem;
    }
  }
`;

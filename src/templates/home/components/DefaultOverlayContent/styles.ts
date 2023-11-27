import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const Heading = styled.div`
  margin-top: 12vh;
  width: 100%;
  text-align: center;
  padding: 1.5rem;

  > h1 {
    place-content: center;
    font-size: 3rem;
    color: white;
    font-weight: 600;
  }

  > h2 {
    font-size: 2rem;
  }
`;

export const Content = styled.div`
  display: flex;
  height: 50vh;
  margin-bottom: 10vh;
  flex-direction: column;
`;

export const Text = styled.div`
  align-self: center;
  width: 70%;
  p {
    font-size: 1rem;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.5rem;
    font-weight: bolder;
    align-self: center;
  }

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    font-size: 1rem;
    list-style-type: none;
  }
  li span {
    font-weight: bold;
  }
`;

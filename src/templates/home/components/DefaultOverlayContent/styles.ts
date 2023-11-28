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

  @media (max-width: 620px) {
    margin-top: 10vh;
    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 0.8rem;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  height: 50vh;
  margin-bottom: 10vh;
  flex-direction: column;
  @media (max-width: 620px) {
    margin-bottom: 20vh;
  }
`;

export const Text = styled.div`
  align-self: center;
  width: 70%;
  p {
    font-size: 1rem;
  }

  @media (max-width: 620px) {
    p {
      font-size: 0.9rem;
      line-height: 1.8rem;
      text-align: center;
    }
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

  @media (max-width: 620px) {
    h2 {
      font-size: 1.4rem;
    }

    ul {
      margin-top: 1rem;
      padding-inline: 1rem;
    }

    li {
      margin-top: 1rem;
      font-size: 0.8rem;
      list-style-type: none;
    }
  }
`;

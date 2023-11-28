import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const OverlaysRoot = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

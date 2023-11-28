import { createGlobalStyle, css } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local(''),
        url('/fonts/montserrat-v15-latin-300.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local(''),
        url('/fonts/montserrat-v15-latin-regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local(''),
        url('/fonts/montserrat-v15-latin-600.woff2') format('woff2');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
    ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.gray_300} !important;
   }
    ::-webkit-scrollbar-track {
    background-color: ${theme.colors.gray_50}!important;
    border-radius: 35px !important;
   }
    ::-webkit-scrollbar {
    width: 10px !important;
    border-radius: 35px !important;
    }

    @media (max-width: 600px) {
     ::-webkit-scrollbar {
       width: 1px !important;
     }

  }
  }

  ${({ theme }) => css`
    html {
      max-width: 100vw;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility !important;
    }

    body {
      font-size: ${theme.font.sizes.medium};
      background-color: ${theme.colors.gray_50};
    }

    body,
    input,
    textarea,
    button {
      font-size: 10px;
      font-family: ${theme.font.family};
    }
  `}

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, strong, p { 
    margin: 0;
    line-height: normal;
    display: flex;
    align-items: center;
  }




`;

export default GlobalStyles;

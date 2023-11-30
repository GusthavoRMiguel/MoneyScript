export default {
  grid: {
    container: '130rem',
    gutter: '3.2rem'
  },
  border: {
    radius: '0.4rem'
  },
  box: {
    shadow: '-4px 0 10px rgba(0, 0, 0, 0.2)'
  },
  font: {
    family:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xxxxsmall: '0.8rem',
      xxxsmall: '1.2rem',
      xxsmall: '1.4rem',
      xsmall: '1.6rem',
      small: '2rem',
      medium: '2.4rem',
      large: '3.2rem',
      xlarge: '4rem',
      xxlarge: '4.8rem',
      xxxlarge: '5.6rem',
      huge: '6.4rem'
    }
  },
  colors: {
    white: '#fff',
    whiteSnow: '#fffafa',
    whiteGhost: '#f8f8ff',
    gray_50: '#f0efeb',
    gray_100: '#ccc',
    gray_300: '#343a40',
    gray_500: '#393b48',
    green: '#98d31f',
    green_50: '#2eed2eb3',
    yellow_300: '#F1C40F',
    red_50: '#db2828e6',
    red_300: '#c50000eb',
    red_400: '#dd0000',
    black: '#0D0D0D',
    blackQuantum: '#111111',
    overlay: 'rgba(0, 0, 0, 0.2)'
  },
  spacings: {
    xxxsmall: '0.8rem',
    xxsmall: '1rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '4.8rem',
    xxlarge: '5.6rem'
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  },
  transition: {
    default: '0.3s ease-in-out',
    fast: '0.1s ease-in-out'
  }
} as const;

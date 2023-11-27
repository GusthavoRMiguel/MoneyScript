import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './Auth';
import { DBProvider } from './Database';

import theme from '@/styles/theme';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DBProvider>{children}</DBProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProvider;

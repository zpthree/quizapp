import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from '@components/Header';
import { GlobalStyles } from '@styles/global';
import theme from '@styles/theme';

const withLayout = Component => props => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <main>
        <Header />
        <Component {...props} />
      </main>
    </>
  </ThemeProvider>
);

export default withLayout;

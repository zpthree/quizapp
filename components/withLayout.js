import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global';
import theme from 'styles/theme';

const withLayout = Component => props => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Component {...props} />
    </>
  </ThemeProvider>
);

export default withLayout;

import React, { useContext } from 'react';
import Header from '@components/Header';
import Meta from '@components/Meta';
import { GlobalStyles } from '@styles/GlobalStyles';
import AppProvider, { AppContext } from '@components/AppContext';

const withLayout = Component => props => {
  function Layout() {
    const { isDarkMode } = useContext(AppContext);
    return (
      <>
        <GlobalStyles />
        <Meta />
        <Header isDarkMode={isDarkMode} />
        <main>
          <Component {...props} />
        </main>
      </>
    );
  }

  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
};

export default withLayout;

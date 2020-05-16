import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Meta from '@components/Meta';
import { GlobalStyles } from '@styles/GlobalStyles';
import AppProvider, { AppContext } from '@components/AppContext';

const withLayout = Component => props => {
  function Layout() {
    const { route } = useRouter();
    const { theme, primaryColor } = useContext(AppContext);
    return (
      <>
        <GlobalStyles route={route} theme={theme} primaryColor={primaryColor} />
        <Meta />
        <Header route={route} theme={theme} />
        <main>
          <Component {...props} />
        </main>
        {!route.includes('sign') && <Footer route={route} />}
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

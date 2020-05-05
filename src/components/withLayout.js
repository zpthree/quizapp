import React from 'react';
import Header from '@components/Header';
import Meta from '@components/Meta';
import { GlobalStyles } from '@styles/GlobalStyles';
import { lightMode, darkMode } from '@lib/toggleTheme';

const withLayout = Component => props => {
  const isDocument = typeof document !== `undefined`;
  let darkModeToggled;
  let isDarkMode;
  if (isDocument) {
    document.getElementById('themeToggler').addEventListener('change', e => {
      darkModeToggled = e.target.checked;
      if (darkModeToggled) {
        darkMode();
      } else {
        lightMode();
      }
    });

    isDarkMode = localStorage.getItem('theme') === 'dark';
    if (isDarkMode) {
      darkMode();
    } else {
      lightMode();
    }
  }
  return (
    <>
      <GlobalStyles />
      <Meta />
      <Header darkMode={isDarkMode} />
      <main>
        <Component {...props} />
      </main>
    </>
  );
};

export default withLayout;

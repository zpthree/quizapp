import React from 'react';
import Header from '@components/Header';
import { GlobalStyles } from '@styles/GlobalStyles';

// function primaryStyles() {
//   if (typeof document === `undefined`) return;
//   document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
//   document.documentElement.style.setProperty('--bg-alt-color', '#343434');
//   document.documentElement.style.setProperty('--border-color', '#000');
//   document.documentElement.style.setProperty('--fc-main', '#fdfdfd');
// }

// primaryStyles();

const withLayout = Component => props => (
  <>
    <GlobalStyles />
    <Header />
    <main>
      <Component {...props} />
    </main>
  </>
);

export default withLayout;

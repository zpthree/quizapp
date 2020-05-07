import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { lightMode, darkMode } from '@lib/toggleTheme';

export const AppContext = React.createContext({});

export default function AppProvider({ children }) {
  const isDocument = typeof document !== `undefined`;
  const [isDarkMode, setDarkMode] = useState(
    isDocument && localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (isDocument) {
      if (isDarkMode) {
        darkMode();
      } else {
        lightMode();
      }
    }
  }, [isDarkMode, isDocument]);

  return (
    <AppContext.Provider value={{ isDarkMode, setDarkMode }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

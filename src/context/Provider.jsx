import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';
import { get, save } from '../utils/storage';
import { Appearance } from 'react-native';

function Provider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const storedTheme = await get('Theme');
        if (storedTheme !== null) {
          setTheme(storedTheme);
        } else {
          const colorScheme = Appearance.getColorScheme();
          await save('Theme', colorScheme);
          setTheme(colorScheme);
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };

    fetchTheme();
  }, []);

  const value = {
    theme,
    setTheme: async (newTheme) => {
      try {
        await save('Theme', newTheme);
        setTheme(newTheme);
      } catch (error) {
        console.error('Error setting theme:', error);
      }
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default Provider;

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;

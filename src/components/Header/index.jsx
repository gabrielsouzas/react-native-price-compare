import React, { useContext, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useStyles from './style';
import AppContext from '../../context/AppContext';

export default function Header() {
  const { theme, setTheme } = useContext(AppContext);
  const styles = useStyles(theme);

  const handleSetTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={
          theme === 'dark'
            ? require('../../images/price_compare_logo_dark.png')
            : require('../../images/price_compare_logo_light.png')
        }
      />
      {(theme === 'dark' && (
        <Ionicons
          onPress={handleSetTheme}
          style={styles.icon}
          name="sunny"
          size={30}
          color="black"
        />
      )) || (
        <Ionicons
          onPress={handleSetTheme}
          style={styles.icon}
          name="moon"
          size={30}
          color="black"
        />
      )}
    </View>
  );
}

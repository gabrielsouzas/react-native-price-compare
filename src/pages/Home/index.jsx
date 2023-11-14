import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Appearance } from 'react-native';
import Header from '../../components/Header';
import Body from '../../components/Body';
import styles from './style';
import { get, save } from '../../utils/storage';

export default function Home() {
  const colorScheme = Appearance.getColorScheme();

  const setAppTheme = useCallback(async () => {
    const theme = await get('Theme');
    if (theme === null) {
      save('Theme', colorScheme);
      // save('IsDefault', true);
      // save('IS_FIRST', true);
    }
  }, []);

  useEffect(() => {
    setAppTheme();
  }, [setAppTheme]);

  return (
    <View style={styles.container}>
      <Header />
      <Body />
    </View>
  );
}

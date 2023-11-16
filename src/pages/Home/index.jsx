import React, { useContext } from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import Body from '../../components/Body';
import AppContext from '../../context/AppContext';
import useStyles from './style';

export default function Home() {
  const { theme } = useContext(AppContext);
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <Header />
      <Body />
    </View>
  );
}
